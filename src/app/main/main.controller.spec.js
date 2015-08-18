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

          expect(scope.grid[0][0].decay).toBe(1);
          expect(scope.grid[0][1].decay).toBe(1);
          expect(scope.grid[0][2].decay).toBe(1);

          expect(scope.grid[1][0].decay).toBe(1);
          expect(scope.grid[1][1].decay).toBe(1); // This is the tile itself
          expect(scope.grid[1][2].decay).toBe(1);

          expect(scope.grid[2][0].decay).toBe(1);
          expect(scope.grid[2][1].decay).toBe(1);
          expect(scope.grid[2][2].decay).toBe(1);
        }));
      });

      describe("when it's type/level combination has an effect value of 2", function () {
        it('creates a decay grid two elements wide', inject(function($controller, $rootScope) {
          var scope = $rootScope.$new();

          scope.type  = 'commercial'
          scope.level = 'medium'

          var vm = $controller('MainController', { $scope: scope });

          scope.toggle(2, 2);

          expect(scope.grid[0][0].decay).toBe(1);
          expect(scope.grid[0][1].decay).toBe(1);
          expect(scope.grid[0][2].decay).toBe(1);
          expect(scope.grid[0][3].decay).toBe(1);
          expect(scope.grid[0][4].decay).toBe(1);

          expect(scope.grid[1][0].decay).toBe(1);
          expect(scope.grid[1][1].decay).toBe(2);
          expect(scope.grid[1][2].decay).toBe(2);
          expect(scope.grid[1][3].decay).toBe(2);
          expect(scope.grid[1][4].decay).toBe(1);

          expect(scope.grid[2][0].decay).toBe(1);
          expect(scope.grid[2][1].decay).toBe(2);
          expect(scope.grid[2][2].decay).toBe(2); // This is the tile itself
          expect(scope.grid[2][3].decay).toBe(2);
          expect(scope.grid[2][4].decay).toBe(1);

          expect(scope.grid[3][0].decay).toBe(1);
          expect(scope.grid[3][1].decay).toBe(2);
          expect(scope.grid[3][2].decay).toBe(2);
          expect(scope.grid[3][3].decay).toBe(2);
          expect(scope.grid[3][4].decay).toBe(1);

          expect(scope.grid[4][0].decay).toBe(1);
          expect(scope.grid[4][1].decay).toBe(1);
          expect(scope.grid[4][2].decay).toBe(1);
          expect(scope.grid[4][3].decay).toBe(1);
          expect(scope.grid[4][4].decay).toBe(1);
        }));
      });

      describe("when it's type/level combination has an effect value of 3", function () {
        it('creates a decay grid three elements wide', inject(function($controller, $rootScope) {
          var scope = $rootScope.$new();

          scope.type  = 'commercial'
          scope.level = 'high'

          var vm = $controller('MainController', { $scope: scope });

          scope.toggle(3, 3);

          expect(scope.grid[0][0].decay).toBe(1);
          expect(scope.grid[0][1].decay).toBe(1);
          expect(scope.grid[0][2].decay).toBe(1);
          expect(scope.grid[0][3].decay).toBe(1);
          expect(scope.grid[0][4].decay).toBe(1);
          expect(scope.grid[0][5].decay).toBe(1);
          expect(scope.grid[0][6].decay).toBe(1);

          expect(scope.grid[1][0].decay).toBe(1);
          expect(scope.grid[1][1].decay).toBe(2);
          expect(scope.grid[1][2].decay).toBe(2);
          expect(scope.grid[1][3].decay).toBe(2);
          expect(scope.grid[1][4].decay).toBe(2);
          expect(scope.grid[1][5].decay).toBe(2);
          expect(scope.grid[1][6].decay).toBe(1);

          expect(scope.grid[2][0].decay).toBe(1);
          expect(scope.grid[2][1].decay).toBe(2);
          expect(scope.grid[2][2].decay).toBe(3);
          expect(scope.grid[2][3].decay).toBe(3);
          expect(scope.grid[2][4].decay).toBe(3);
          expect(scope.grid[2][5].decay).toBe(2);
          expect(scope.grid[2][6].decay).toBe(1);

          expect(scope.grid[3][0].decay).toBe(1);
          expect(scope.grid[3][1].decay).toBe(2);
          expect(scope.grid[3][2].decay).toBe(3);
          expect(scope.grid[3][3].decay).toBe(3); // This is the tile itself
          expect(scope.grid[3][4].decay).toBe(3);
          expect(scope.grid[3][5].decay).toBe(2);
          expect(scope.grid[3][6].decay).toBe(1);

          expect(scope.grid[4][0].decay).toBe(1);
          expect(scope.grid[4][1].decay).toBe(2);
          expect(scope.grid[4][2].decay).toBe(3);
          expect(scope.grid[4][3].decay).toBe(3);
          expect(scope.grid[4][4].decay).toBe(3);
          expect(scope.grid[4][5].decay).toBe(2);
          expect(scope.grid[4][6].decay).toBe(1);

          expect(scope.grid[5][0].decay).toBe(1);
          expect(scope.grid[5][1].decay).toBe(2);
          expect(scope.grid[5][2].decay).toBe(2);
          expect(scope.grid[5][3].decay).toBe(2);
          expect(scope.grid[5][4].decay).toBe(2);
          expect(scope.grid[5][5].decay).toBe(2);
          expect(scope.grid[5][6].decay).toBe(1);

          expect(scope.grid[0][0].decay).toBe(1);
          expect(scope.grid[0][1].decay).toBe(1);
          expect(scope.grid[0][2].decay).toBe(1);
          expect(scope.grid[0][3].decay).toBe(1);
          expect(scope.grid[0][4].decay).toBe(1);
          expect(scope.grid[0][5].decay).toBe(1);
          expect(scope.grid[0][6].decay).toBe(1);
        }));
      });

      describe('compositing tile effects', function () {
        describe("when a tile is placed whose effects overlap another, already placed tile", function () {
          it('adds the new value to the existing value', inject(function($controller, $rootScope) {
            var scope = $rootScope.$new();

            scope.type  = 'commercial'
            scope.level = 'low'

            var vm = $controller('MainController', { $scope: scope });

            scope.toggle(1, 1);
            scope.toggle(1, 2);

            // MAP OF EXPECTED RESULTS
            // -------------
            // | 1 | 1 | 1 | <- The original tile's effect
            // -------------
            // | 2 | 2 | 2 | <- Composite of original and new tiles
            // -------------
            // | 2 |*2*| 2 | <- Composite of original and new tiles (where the new tile was placed)
            // -------------
            // | 1 | 1 | 1 | <- Only new tile's effect
            // -------------

            expect(scope.grid[0][0].decay).toBe(1);
            expect(scope.grid[1][0].decay).toBe(1);
            expect(scope.grid[2][0].decay).toBe(1);

            expect(scope.grid[0][1].decay).toBe(2);
            expect(scope.grid[1][1].decay).toBe(2);
            expect(scope.grid[2][1].decay).toBe(2);

            expect(scope.grid[0][2].decay).toBe(2);
            expect(scope.grid[1][2].decay).toBe(2); // This is the tile itself
            expect(scope.grid[2][2].decay).toBe(2);

            expect(scope.grid[0][3].decay).toBe(1);
            expect(scope.grid[1][3].decay).toBe(1);
            expect(scope.grid[2][3].decay).toBe(1);
          }));
        });
      });
    });

    describe('processors', function () {
      describe('a residential processor', function () {
        describe('assigning jobs to people in the residential tile based on proximity to a commercial tile', function () {
          it('uses the decay property to determine how many of the people in the residential tile may decay at the commercial tile', inject(function($controller, $rootScope) {
            var scope = $rootScope.$new();

            scope.type  = 'commercial'
            scope.level = 'medium'

            var vm = $controller('MainController', { $scope: scope });

            scope.toggle(2, 2);

            scope.type  = 'residential'
            scope.level = 'high'

            // This means the residential tile has a decay of 1, so only 1 of the
            // 3 people in this tile can decay at the peviously placed commercial
            // tile.
            scope.toggle(0, 0);

            // It's important that we pluck the tiles from the grid like this
            // since the processor updates the passed tiles and we want to make
            // sure the changes make it back to the grid.
            var tile     = scope.grid[0][0];
            var effected = scope.grid[2][2];

            scope.processors.residential(tile, effected);

            expect(scope.grid[0][0].people).toBe(3);
            expect(scope.grid[0][0].employed).toBe(1);
            expect(scope.grid[2][2].decay).toBe(2);
            expect(scope.grid[2][2].jobs).toBe(12);
            expect(scope.grid[2][2].available).toBe(11);
          }));

          it('uses all available jobs from a commercial tile before moving on to another', inject(function($controller, $rootScope) {
            var scope = $rootScope.$new();

            scope.type  = 'commercial'
            scope.level = 'medium'

            var vm = $controller('MainController', { $scope: scope });

            // Laying the tiles out like this means that our residential tile
            // will have a decay value of 1 for each of these tiles - so one
            // person will work at each tile
            scope.toggle(1, 1);
            scope.toggle(0, 1);

            scope.type  = 'residential'
            scope.level = 'high'

            // This means the residential tile has a decay of 1, so only 1 of the
            // 3 people in this tile can decay at the peviously placed commercial
            // tile.
            scope.toggle(0, 0);

            // It's important that we pluck the tiles from the grid like this
            // since the processor updates the passed tiles and we want to make
            // sure the changes make it back to the grid.
            var tile = scope.grid[0][0];

            scope.processors.residential(tile, scope.grid[1][1]);

            expect(scope.grid[0][0].people).toBe(3);
            expect(scope.grid[0][0].employed).toBe(3);

            expect(scope.grid[1][1].decay).toBe(4);
            expect(scope.grid[1][1].jobs).toBe(12);
            expect(scope.grid[1][1].available).toBe(9);

            scope.processors.residential(tile, scope.grid[0][1]);

            expect(scope.grid[0][1].decay).toBe(4);
            expect(scope.grid[0][1].jobs).toBe(12);
            expect(scope.grid[0][1].available).toBe(12);
          }));
        });
      });
    });
  });
})();
