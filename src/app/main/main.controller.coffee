angular.module "simgame"
  .controller "MainController", ($scope, $interval) ->
    # PROPERTIES = { }
    $scope.unit_options = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }]
    $scope.residential_creator =
      bedrooms: 1
      baths:    1
      floors:   1
      units:    1
      sq_feet:  500
    $scope.commercial_creator  =
      parking_spaces: 5
      businesses:     1
      anchors:        0

    $scope.industrial_creator  = { }
    $scope.education_creator   = { }
    $scope.public_creator      = { }

    $scope.creating =
      residential: false
      commercial:  false
      industrial:  false
      education:   false
      public:      false

    $scope.employed = 0
    $scope.citizens = 0
    $scope.money    = 0
    $scope.months   = 0

    $scope.floors = [ [ 1, 1 ] ]

    add_bedbroom = ->
      last = $scope.floors[0]

      if last.length == 1
        last.push 1
      else
        $scope.floors.unshift [ 1 ]

    remove_bedroom = ->
      last = $scope.floors[0]

      if last.length == 1
        $scope.floors.shift()
      else
        last.shift()

    $scope.display_plus = (floor, bed) ->
      $scope.floors.length < 4 and floor == 0 and ++bed == $scope.floors[0].length

    $scope.display_minus = (floor, bed) ->
      $scope.floors.length == 4                                  or
      (floor == 0 and bed == 0 and $scope.floors[0].length == 2) or
      (floor > 0 and ++bed == $scope.floors[floor].length)       if $scope.floors[floor]?

    $scope.display_mutator = (floor, bed) ->
      if floor == 0
        true
      else
        if $scope.floors.length < 4
          ++bed == $scope.floors[floor].length and $scope.floors[--floor].length == 1
        else
          floor == 4
    $scope.toggle_bedroom = (row, col) ->
      last   = $scope.floors[$scope.floors.length - 1]
      length = $scope.floors[row].length
      console.log 'oh hai'
      if row == 0
        if col == length - 1 and $scope.floors.length < 4
          add_bedbroom()
        else
          remove_bedroom()
      else if col == length - 1
        remove_bedroom()

    $scope.random_reverse = (array) ->
      if Math.random() > 0.5 then array.reverse() else array

    $scope.toggleCreator = (type) ->
      $scope.mode = type

      for k, v of $scope.creating
        if k == type
          $scope.creating[type] = !$scope.creating[type]
        else
          $scope.creating[k] = false

    $scope.createCommercialTile = ->
      PROPERTIES = $scope.commercial_creator

      PROPERTIES.jobs  = PROPERTIES.businesses * 5
      PROPERTIES.jobs += PROPERTIES.anchors    * 30

      PROPERTIES.available = PROPERTIES.jobs

      PROPERTIES.decay  = Math.ceil PROPERTIES.businesses / 10
      PROPERTIES.decay += Math.ceil PROPERTIES.anchors    / 2
      PROPERTIES.type   = 'commercial'

      console.log 'commercial', PROPERTIES

    $scope.$watchCollection 'residential_creator', (new_val) ->
      cost = 0

      cost += new_val.units    * 3
      cost += new_val.bedrooms * 2
      cost += new_val.floors   * 0.5
      cost += new_val.baths
      cost += new_val.sq_feet  * 0.75

      $scope.cost = cost

    $scope.create_residential_tile = ->
      PROPERTIES = { }
      beds = 0

      $scope.floors.forEach (f) -> beds += f.length

      beds += 1 if $scope.floors[0].length == 1

      PROPERTIES.people   = beds
      PROPERTIES.employed = 0
      PROPERTIES.type     = 'residential'

      PROPERTIES

    $scope.processors =
      residential: (tile, effected) ->
        if effected.type == 'commercial'
          unemployed = tile.people - tile.employed
          unemployed = if tile.decay > unemployed then unemployed else tile.decay

          if unemployed > 0 and effected.available > 0
            openings = if effected.available > unemployed then effected.available else unemployed
            hired    = Math.round if unemployed < openings then unemployed else openings

            tile.employed      += hired
            effected.available -= hired

            $scope.employed += hired

    $interval ->
      if ++$scope.months == 12
        $scope.money += $scope.employed * 100
        $scope.months = 0

      for row, i in $scope.grid
        for cell, j in row
          width  = [i - 3..i + 3]
          height = [j - 3..j + 3]

          if cell.type?
            for w in $scope.random_reverse width
              for h in $scope.random_reverse height
                if $scope.grid[w]?[h]?.type?
                  if cell.x != w or cell.y != h
                    if w >= 0 and h >= 0 and $scope.processors[cell.type]?
                      $scope.processors[cell.type] cell, $scope.grid[w][h]
    , 5000

    $scope.toggle = (x, y) ->
      PROPERTIES = $scope["create_#{$scope.mode}_tile"]()

      for p, d of PROPERTIES
        $scope.grid[x][y][p] = d

      if PROPERTIES.people?
        $scope.citizens += PROPERTIES.people

      $scope.grid[x][y].x = x
      $scope.grid[x][y].y = y

      if PROPERTIES.decay?
        v      = PROPERTIES.decay
        width  = [x - v..x + v]
        height = [y - v..y + v]

        for w, i in width
          a = Math.abs i - v

          for h, j in height
            b = Math.abs j - v

            if a == v or b == v
              val = 1
            else if (a == 0 == b) or (a == 1 and b == 0) or (a == 0 and b == 1)
              val = v
            else if a == 0 or b == 0
              val = if a == 0 then b else a
            else if a > b
              val = a / b
            else if a < b
              val = b / a
            else if a == b
              val = if a == 1 == b then v else a

            if $scope.grid[w]?[h]?
              if $scope.grid[w][h].decay?
                $scope.grid[w][h].decay += val
              else
                $scope.grid[w][h].decay = val

    $scope.grid = [ ]

    for c in [0..50]
      $scope.grid.push [ ]
      last = $scope.grid.length - 1

      for r in [0..50]
        $scope.grid[last].push { }
