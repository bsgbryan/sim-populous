FLOORS =
  residential: 4
  commercial:  7
  industrial:  7
  education:   3

UNITS =
  residential: 2
  commercial:  4
  industrial:  3
  education:   5
  public:      5

SALLARIES =
  commercial: 1000
  industrial: 500

TAX_RATE            = 0.10
INFRASTRUCTURE_COST = 0

angular.module 'simgame'
  .controller 'MainController', ($scope, $interval) ->
    $scope.creating =
      residential: false
      commercial:  false
      industrial:  false
      education:   false
      public:      false

    $scope.employed       = commercial: 0, industrial: 0
    $scope.education      = k12: 0, college: 0, university: 0
    $scope.total_employed = 0
    $scope.citizens       = 0
    $scope.money          = 20000
    $scope.months         = 0

    $scope.cost             = 0
    $scope.multiplier       = 1
    $scope.residential_cost = 500
    $scope.commercial_cost  = 300
    $scope.industrial_cost  = 400
    $scope.education_cost   = 1000

    $scope.floors = [ [ ] ]

    add_bedroom = ->
      last = $scope.floors[0]

      if last.length < UNITS[$scope.mode]
        last.push 1
      else
        $scope.multiplier += 0.25
        $scope.floors.unshift [ 1 ]

      $scope.cost += $scope["#{$scope.mode}_cost"] * $scope.multiplier

    remove_bedroom = ->
      last = $scope.floors[0]

      $scope.cost -= $scope["#{$scope.mode}_cost"] * $scope.multiplier

      if last.length == 1
        $scope.multiplier -= 0.25
        $scope.floors.shift()
      else
        last.shift()

    $scope.edu_level = (floor) ->
      if $scope.floors.length == 1
        'K-12'
      else if $scope.floors.length == 2
        if floor == 0
          'College'
        else if floor == 1
          'K-12'
      else if $scope.floors.length == 3
        if floor == 0
          'University'
        else if floor == 1
          'College'
        else if floor == 2
          'K-12'

    $scope.student_count = (floor) ->
      if $scope.floors.length == 1
        25
      else if $scope.floors.length == 2
        if floor == 0
          10
        else if floor == 1
          25
      else if $scope.floors.length == 3
        if floor == 0
          2
        else if floor == 1
          10
        else if floor == 2
          25

    $scope.display_edu_plus = (floor, bed) ->
      if $scope.floors.length < FLOORS[$scope.mode]
        floor == 0 and
        ++bed == $scope.floors[0].length
      else
        $scope.floors[0].length < UNITS[$scope.mode] and
        ++bed == $scope.floors[0].length

    $scope.display_edu_minus = (floor, bed) ->
      if $scope.floors.length < FLOORS[$scope.mode]
        (floor == 0 and $scope.floors[0].length > 1 and bed == $scope.floors[0].length - 2) or
        (floor > 0 and bed == $scope.floors[floor].length - 1)
      else
        if $scope.floors[0].length == UNITS[$scope.mode]
          floor == 0 and bed == $scope.floors[0].length - 1
        else
          (floor == 0 and $scope.floors[0].length > 1 and bed == $scope.floors[0].length - 2) or
          (floor == 1 and bed == $scope.floors[floor].length - 1)

    $scope.display_edu_mutator = (floor, bed) ->
      if floor == 0
        if $scope.floors.length == FLOORS[$scope.mode]
          if $scope.floors[0].length == UNITS[$scope.mode]
            bed == $scope.floors[0].length - 1
          else
            bed == $scope.floors[0].length - 1 or bed == $scope.floors[0].length - 2
        else
          bed == $scope.floors[0].length - 1 or bed == $scope.floors[0].length - 2
      else
        floor == 1 and bed == $scope.floors[1].length - 1 and $scope.floors[0].length == 1

    $scope.toggle_edu_unit = (row, col) ->
      last   = $scope.floors[$scope.floors.length - 1]
      length = $scope.floors[row].length

      if row == 0
        if $scope.floors.length < FLOORS[$scope.mode]
          add_bedroom()    if col == length - 1
          remove_bedroom() if col == length - 2
        else
          if $scope.floors[0].length < UNITS[$scope.mode] and col == length - 1
            add_bedroom()
          else
            remove_bedroom()
      else if col == length - 1
        remove_bedroom()
      else if col == length - 2
        remove_bedroom()

    $scope.pub_level = (floor) ->
      if floor == 0
        'Police'
      else if floor == 1
        'Firefighters'
      else if floor == 2
        'Doctors'

    $scope.pub_icon = (floor) ->
      if floor == 0
        'taxi'
      else if floor == 1
        'fire-extinguisher'
      else if floor == 2
        'stethoscope'

    $scope.display_pub_plus = (floor, bed) ->
      $scope.floors[floor].length < UNITS[$scope.mode] and
      bed == $scope.floors[floor].length - 1

    $scope.display_pub_minus = (floor, bed) ->
      if $scope.floors[floor].length == UNITS[$scope.mode]
        bed == $scope.floors[floor].length - 1
      else
        $scope.floors[floor].length > 1 and bed == $scope.floors[floor].length - 2

    $scope.display_pub_mutator = (floor, bed) ->
      if $scope.floors[floor].length == UNITS[$scope.mode]
        bed == $scope.floors[floor].length - 1
      else
        bed == $scope.floors[floor].length - 1 or bed == $scope.floors[floor].length - 2

    $scope.toggle_pub_unit = (row, col) ->
      last   = $scope.floors[$scope.floors.length - 1]
      length = $scope.floors[row].length

      if $scope.floors[row].length < UNITS[$scope.mode]
        if col == length - 1
          $scope.floors[row].push 1
        else if col == length - 2
          $scope.floors[row].shift()
      else
        $scope.floors[row].shift()

    $scope.display_plus = (floor, bed) ->
      $scope.floors.length < FLOORS[$scope.mode] and floor == 0 and ++bed == $scope.floors[0].length

    $scope.display_minus = (floor, bed) ->
      $scope.floors.length == FLOORS[$scope.mode]          or
      (floor == 0 and bed == $scope.floors[0].length - 2)  or
      (floor > 0 and ++bed == $scope.floors[floor].length) if $scope.floors[floor]?

    $scope.display_mutator = (floor, bed) ->
      if floor == 0
        true
      else
        if $scope.floors.length < FLOORS[$scope.mode]
          ++bed == $scope.floors[floor].length and $scope.floors[--floor].length == 1
        else
          floor == FLOORS[$scope.mode]

    $scope.toggle_bedroom = (row, col) ->
      last   = $scope.floors[$scope.floors.length - 1]
      length = $scope.floors[row].length

      if row == 0
        if col == length - 1 and $scope.floors.length < FLOORS[$scope.mode]
          add_bedroom()
        else
          remove_bedroom()
      else if col == length - 1
        remove_bedroom()

    $scope.random_reverse = (array) ->
      if Math.random() > 0.5 then array.reverse() else array

    $scope.toggleCreator = (type) ->
      $scope.mode       = type
      $scope.floors     = [ [ ] ]
      $scope.multiplier = 1
      console.log 'mode', type
      for k, v of $scope.creating
        if k == type
          $scope.creating[type] = !$scope.creating[type]
        else
          $scope.creating[k] = false

      if type == 'residential'
        $scope.cost = 1000
        add_bedroom()
        add_bedroom()
      else if type == 'commercial'
        $scope.cost = 7000
        add_bedroom()
        add_bedroom()
        add_bedroom()
        add_bedroom()
      else if type == 'industrial'
        $scope.cost = 9000
        add_bedroom()
        add_bedroom()
        add_bedroom()
      else if type == 'education'
        $scope.cost = 10000
        add_bedroom()
      else if type == 'public'
        console.log 'creating public'
        $scope.cost = 10000
        $scope.floors = [ [ 1, 1 ], [ 1, 1 ], [ 1, 1 ] ]

    $scope.create_education_tile = ->
      PROPERTIES = { }

      students = 0
      decay    = 4
      courses  =
        university: available: 0, enrolled: 0
        college:    available: 0, enrolled: 0
        k12:        available: 0, enrolled: 0

      $scope.floors.forEach (f) -> students += f.length

      levels = Math.ceil students / 5

      if levels == 1
        decay += students
      else
        decay += 5

      students_at_highest_level = students % 5

      if levels == 1
        courses.k12 = available: students * 25, enrolled: 0
      else if levels == 2
        courses.k12     = available: 125, enrolled: 0
        courses.college = available: students_at_highest_level * 10, enrolled: 0
      else if levels == 3
        courses.k12        = available: 125, enrolled: 0
        courses.college    = available: 50, enrolled: 0
        courses.university = available: students_at_highest_level * 2, enrolled: 0

      PROPERTIES.students        = courses
      PROPERTIES.education_decay = decay
      PROPERTIES.type            = 'education'

      PROPERTIES

    $scope.create_industrial_tile = ->
      PROPERTIES = { }

      jobs = 0

      $scope.floors.forEach (f) -> jobs += f.length

      PROPERTIES.jobs             = jobs
      PROPERTIES.available        = PROPERTIES.jobs
      PROPERTIES.industrial_decay = Math.ceil PROPERTIES.jobs / 4
      PROPERTIES.type             = 'industrial'

      PROPERTIES

    $scope.create_commercial_tile = ->
      PROPERTIES = { }

      jobs = 0

      $scope.floors.forEach (f) -> jobs += f.length

      INFRASTRUCTURE_COST += jobs * 0.75

      PROPERTIES.jobs             = jobs
      PROPERTIES.available        = PROPERTIES.jobs
      PROPERTIES.commercial_decay = Math.ceil PROPERTIES.jobs / 4
      PROPERTIES.type             = 'commercial'

      PROPERTIES

    $scope.create_public_tile = ->
      PROPERTIES = { }

      police       = $scope.floors[0].length
      firefighters = $scope.floors[1].length
      doctors      = $scope.floors[2].length

      INFRASTRUCTURE_COST += police       * 1.75
      INFRASTRUCTURE_COST += firefighters * 1.5
      INFRASTRUCTURE_COST += doctors

      PROPERTIES.police_decay       = 5 + police
      PROPERTIES.firefighters_decay = 5 + firefighters
      PROPERTIES.doctors_decay      = 5 + doctors

      PROPERTIES.type = 'public'

      PROPERTIES

    $scope.create_residential_tile = ->
      PROPERTIES = { }
      beds = 0

      $scope.floors.forEach (f) -> beds += f.length

      beds += 1 if $scope.floors[0].length == 1

      INFRASTRUCTURE_COST += beds * 1.5

      PROPERTIES.people    = beds
      PROPERTIES.employed  = 0
      PROPERTIES.type      = 'residential'
      PROPERTIES.education =
        k12:        0
        college:    0
        university: 0

      PROPERTIES

    $scope.processors =
      education: (tile, effected) ->
        if effected.type == 'residential'
          if effected.education.k12 < effected.people
            if tile.students.k12.available > 0
              if tile.students.k12.available > effected.people
                enrolled = effected.people
              else
                enrolled = tile.students.k12.available

              tile.students.k12.available -= enrolled
              tile.students.k12.enrolled  += enrolled
              effected.education.k12      += enrolled
              $scope.education.k12        += enrolled

              console.log 'tile',     tile
              console.log 'effected', effected

      commercial: (tile, effected) ->
        if effected.type == 'residential'
          unemployed = effected.people - effected.employed

          if unemployed > 0 and tile.available > 0
            openings = if tile.available > unemployed then tile.available else unemployed
            hired    = Math.round if unemployed < openings then unemployed else openings

            effected.employed += hired
            tile.available    -= hired

            $scope.employed[tile.type] += hired

            $scope.total_employed += hired

            INFRASTRUCTURE_COST += hired * 2

      industrial: (tile, effected) ->
        unemployed = effected.people - effected.employed

        if unemployed > 0 and tile.available > 0
          openings = if tile.available > unemployed then tile.available else unemployed
          hired    = Math.round if unemployed < openings then unemployed else openings

          effected.employed += hired
          tile.available    -= hired

          $scope.employed[tile.type] += hired

          $scope.total_employed += hired

          INFRASTRUCTURE_COST += hired * 3.5

    $interval ->
      if ++$scope.months == 12
        earned  = $scope.employed.commercial * SALLARIES.commercial
        earned += $scope.employed.industrial * SALLARIES.industrial

        earned -= INFRASTRUCTURE_COST

        $scope.money += earned * TAX_RATE
        $scope.months = 0

      for row, i in $scope.grid
        for cell, j in row
          if cell.type?
            type  = cell.type
            decay = cell["#{type}_decay"]

          if decay?
            width  = [i - decay..i + decay]
            height = [j - decay..j + decay]
            wide   = $scope.random_reverse width
            high   = $scope.random_reverse height

            for w in wide
              for h in high
                needs_processing = $scope.grid[w]?[h]?.type? and
                  (cell.x? and cell.y?)                      and
                  (cell.x != w or cell.y != h)               and
                  (w >= 0 and h >= 0)                        and
                  $scope.processors[type]?
                if needs_processing
                  console.log 'cell', cell
                  console.log 'effected', $scope.grid[w][h]
                  $scope.processors[type] cell, $scope.grid[w][h]
          else if $scope.processors[type]?
            $scope.processors[type] cell
    , 5000

    $scope.toggle = (x, y) ->
      PROPERTIES = $scope["create_#{$scope.mode}_tile"]()

      for p, d of PROPERTIES
        $scope.grid[x][y][p] = d

      if PROPERTIES.people?
        $scope.citizens += PROPERTIES.people

      $scope.grid[x][y].x = x
      $scope.grid[x][y].y = y

      $scope.money -= $scope.cost

    $scope.grid = [ ]

    for c in [0..50]
      $scope.grid.push [ ]
      last = $scope.grid.length - 1

      for r in [0..50]
        $scope.grid[last].push { }
