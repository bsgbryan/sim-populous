INFLUENCE =
  commercial:
    empty:  work: 0
    low:    work: 1
    medium: work: 2
    high:   work: 3
    bank:   work: 1

angular.module "simgame"
  .controller "MainController", ($scope) ->

    $scope.select = (type, level) ->
      $scope.type  = type
      $scope.level = level

    $scope.toggle = (x, y) ->
      $scope.grid[x][y].type  = $scope.type
      $scope.grid[x][y].level = $scope.level

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

            $scope.grid[w][h][k] = val

    $scope.grid = [ ]

    for c in [0..50]
      $scope.grid.push [ ]
      last = $scope.grid.length - 1

      for r in [0..50]
        $scope.grid[last].push work: 0, learn: 0, fun: 0, water: 0, power: 0, populace: 0

    $scope.residential = [ 'empty', 'low', 'medium', 'high' ]
    $scope.commercial  = [ 'empty', 'low', 'medium', 'high', 'bank' ]
    $scope.industrial  = [ 'empty', 'low', 'medium', 'high' ]
    $scope.education   = [ 'elementary', 'middle', 'high', 'college', 'university', 'research' ]
    $scope.public      = [ 'police', 'fire', 'hospital', 'park' ]
