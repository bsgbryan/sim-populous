INFLUENCE =
  commercial:
    empty:
      work: 0
    low:
      decay: 1
    medium:
      decay: 2
    high:
      decay: 3
    bank:
      decay: 1
  # residential:
  #   empty:
  #     people: 0
  #   low:
  #     people: 1
  #   medium:
  #     people: 2
  #   high:
  #     people: 3

PROPERTIES =
  commercial:
    empty:
      jobs: 0
      available: 0
    low:
      jobs: 6
      available: 6
    medium:
      jobs: 12
      available: 12
    high:
      jobs: 24
      available: 24
    bank:
      jobs: 4
      available: 4
  residential:
    empty:
      people:   0
      employed: 0
    low:
      people:   1
      employed: 0
    medium:
      people:   2
      employed: 0
    high:
      people:   3
      employed: 0

angular.module "simgame"
  .controller "MainController", ($scope, $interval) ->
    $scope.employed = 0
    $scope.citizens = 0

    $scope.random_reverse = (array) ->
      if Math.random() > 0.5 then array.reverse() else array


    $scope.processors =
      residential: (tile, effected) ->
        if effected.type == 'commercial'
          unemployed = tile.people - tile.employed
          unemployed = if tile.decay > unemployed then unemployed else tile.decay

          if unemployed > 0
            openings = if effected.available > unemployed then effected.available else unemployed
            hired    = if unemployed < openings then unemployed else openings

            tile.employed      += hired
            effected.available -= hired

            $scope.employed += hired

    $interval ->
      for row, i in $scope.grid
        for cell, j in row
          width  = [i - 3..i + 3]
          height = [j - 3..j + 3]

          for w in $scope.random_reverse width
            for h in $scope.random_reverse height
              if w >= 0 and h >= 0 and $scope.processors[cell.type]? and cell.x != w and cell.y != h and $scope.grid[w]?[h]?.type?
                $scope.processors[cell.type] cell, $scope.grid[w][h]
    , 5000

    $scope.select = (type, level) ->
      $scope.type  = type
      $scope.level = level

    $scope.toggle = (x, y) ->
      $scope.grid[x][y].type  = $scope.type
      $scope.grid[x][y].level = $scope.level

      for p, d of PROPERTIES[$scope.type][$scope.level]
        $scope.grid[x][y][p] = d

      if $scope.grid[x][y].people?
        $scope.citizens += $scope.grid[x][y].people

      $scope.grid[x][y].x = x
      $scope.grid[x][y].y = y

      if INFLUENCE[$scope.type]?
        effect = INFLUENCE[$scope.type][$scope.level]

        for k, v of effect
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
                if $scope.grid[w][h][k]?
                  $scope.grid[w][h][k] += val
                else
                  $scope.grid[w][h][k] = val

    $scope.grid = [ ]

    for c in [0..50]
      $scope.grid.push [ ]
      last = $scope.grid.length - 1

      for r in [0..50]
        $scope.grid[last].push { }

    $scope.residential = [ 'empty', 'low', 'medium', 'high' ]
    $scope.commercial  = [ 'empty', 'low', 'medium', 'high', 'bank' ]
    $scope.industrial  = [ 'empty', 'low', 'medium', 'high' ]
    $scope.education   = [ 'elementary', 'middle', 'high', 'college', 'university', 'research' ]
    $scope.public      = [ 'police', 'fire', 'hospital', 'park' ]
