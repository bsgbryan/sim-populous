angular.module "simgame"
  .controller "MainController", ($scope) ->

    $scope.select = (type, level) ->
      $scope.type  = type
      $scope.level = level

    $scope.toggle = (x, y) ->
      $scope.grid[x][y].type  = $scope.type
      $scope.grid[x][y].level = $scope.level

    $scope.grid = [ ]

    for c in [0..50]
      $scope.grid.push [ ]
      last = $scope.grid.length - 1

      for r in [0..50]
        $scope.grid[last].push work: 0, learn: 0, fun: 0, water: 0, power: 0

    $scope.residential = [ 'empty', 'low', 'medium', 'high' ]
    $scope.commercial  = [ 'empty', 'low', 'medium', 'high' ]
    $scope.industrial  = [ 'empty', 'low', 'medium', 'high' ]
    $scope.education   = [ 'elementary', 'middle', 'high', 'college', 'university', 'research' ]
    $scope.public      = [ 'police', 'fire', 'hospital', 'park' ]

    console.log 'grid', $scope.grid
