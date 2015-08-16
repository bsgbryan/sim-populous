(function() {
  'use strict';

  describe('MainController', function(){

    beforeEach(module('simgame'));

    describe('toggle', function () {
      describe("when it's type/level combination has an effect value of 1", function () {
        it('creates a decay grid one element wide', inject(function($controller, $rootScope) {
          var scope = $rootScope.$new();

          scope.type  = 'commercial'
          scope.level = 'low'

          var vm = $controller('MainController', { $scope: scope });

          scope.toggle(1, 1);

          expect(scope.grid[0][0].work).toBe(1);
          expect(scope.grid[0][1].work).toBe(1);
          expect(scope.grid[0][2].work).toBe(1);

          expect(scope.grid[1][0].work).toBe(1);
          expect(scope.grid[1][1].work).toBe(1); // This is the tile itself
          expect(scope.grid[1][2].work).toBe(1);

          expect(scope.grid[2][0].work).toBe(1);
          expect(scope.grid[2][1].work).toBe(1);
          expect(scope.grid[2][2].work).toBe(1);
        }));
      });

      describe("when it's type/level combination has an effect value of 2", function () {
        it('creates a decay grid two elements wide', inject(function($controller, $rootScope) {
          var scope = $rootScope.$new();

          scope.type  = 'commercial'
          scope.level = 'medium'

          var vm = $controller('MainController', { $scope: scope });

          scope.toggle(2, 2);

          expect(scope.grid[0][0].work).toBe(1);
          expect(scope.grid[0][1].work).toBe(1);
          expect(scope.grid[0][2].work).toBe(1);
          expect(scope.grid[0][3].work).toBe(1);
          expect(scope.grid[0][4].work).toBe(1);

          expect(scope.grid[1][0].work).toBe(1);
          expect(scope.grid[1][1].work).toBe(2);
          expect(scope.grid[1][2].work).toBe(2);
          expect(scope.grid[1][3].work).toBe(2);
          expect(scope.grid[1][4].work).toBe(1);

          expect(scope.grid[2][0].work).toBe(1);
          expect(scope.grid[2][1].work).toBe(2);
          expect(scope.grid[2][2].work).toBe(2); // This is the tile itself
          expect(scope.grid[2][3].work).toBe(2);
          expect(scope.grid[2][4].work).toBe(1);

          expect(scope.grid[3][0].work).toBe(1);
          expect(scope.grid[3][1].work).toBe(2);
          expect(scope.grid[3][2].work).toBe(2);
          expect(scope.grid[3][3].work).toBe(2);
          expect(scope.grid[3][4].work).toBe(1);

          expect(scope.grid[4][0].work).toBe(1);
          expect(scope.grid[4][1].work).toBe(1);
          expect(scope.grid[4][2].work).toBe(1);
          expect(scope.grid[4][3].work).toBe(1);
          expect(scope.grid[4][4].work).toBe(1);
        }));
      });

      describe("when it's type/level combination has an effect value of 3", function () {
        it('creates a decay grid three elements wide', inject(function($controller, $rootScope) {
          var scope = $rootScope.$new();

          scope.type  = 'commercial'
          scope.level = 'high'

          var vm = $controller('MainController', { $scope: scope });

          scope.toggle(3, 3);

          expect(scope.grid[0][0].work).toBe(1);
          expect(scope.grid[0][1].work).toBe(1);
          expect(scope.grid[0][2].work).toBe(1);
          expect(scope.grid[0][3].work).toBe(1);
          expect(scope.grid[0][4].work).toBe(1);
          expect(scope.grid[0][5].work).toBe(1);
          expect(scope.grid[0][6].work).toBe(1);

          expect(scope.grid[1][0].work).toBe(1);
          expect(scope.grid[1][1].work).toBe(2);
          expect(scope.grid[1][2].work).toBe(2);
          expect(scope.grid[1][3].work).toBe(2);
          expect(scope.grid[1][4].work).toBe(2);
          expect(scope.grid[1][5].work).toBe(2);
          expect(scope.grid[1][6].work).toBe(1);

          expect(scope.grid[2][0].work).toBe(1);
          expect(scope.grid[2][1].work).toBe(2);
          expect(scope.grid[2][2].work).toBe(3);
          expect(scope.grid[2][3].work).toBe(3);
          expect(scope.grid[2][4].work).toBe(3);
          expect(scope.grid[2][5].work).toBe(2);
          expect(scope.grid[2][6].work).toBe(1);

          expect(scope.grid[3][0].work).toBe(1);
          expect(scope.grid[3][1].work).toBe(2);
          expect(scope.grid[3][2].work).toBe(3);
          expect(scope.grid[3][3].work).toBe(3); // This is the tile itself
          expect(scope.grid[3][4].work).toBe(3);
          expect(scope.grid[3][5].work).toBe(2);
          expect(scope.grid[3][6].work).toBe(1);

          expect(scope.grid[4][0].work).toBe(1);
          expect(scope.grid[4][1].work).toBe(2);
          expect(scope.grid[4][2].work).toBe(3);
          expect(scope.grid[4][3].work).toBe(3);
          expect(scope.grid[4][4].work).toBe(3);
          expect(scope.grid[4][5].work).toBe(2);
          expect(scope.grid[4][6].work).toBe(1);

          expect(scope.grid[5][0].work).toBe(1);
          expect(scope.grid[5][1].work).toBe(2);
          expect(scope.grid[5][2].work).toBe(2);
          expect(scope.grid[5][3].work).toBe(2);
          expect(scope.grid[5][4].work).toBe(2);
          expect(scope.grid[5][5].work).toBe(2);
          expect(scope.grid[5][6].work).toBe(1);

          expect(scope.grid[0][0].work).toBe(1);
          expect(scope.grid[0][1].work).toBe(1);
          expect(scope.grid[0][2].work).toBe(1);
          expect(scope.grid[0][3].work).toBe(1);
          expect(scope.grid[0][4].work).toBe(1);
          expect(scope.grid[0][5].work).toBe(1);
          expect(scope.grid[0][6].work).toBe(1);
        }));
      });
    });
  });
})();
