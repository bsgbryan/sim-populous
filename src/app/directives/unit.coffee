angular.module 'simgame'
  .directive 'unit', ->
    require: 'ngModel'
    link: (scope, elm, attrs, ctrl) ->
      ctrl.$validators.integer = (modelValue, viewValue) ->
        console.log 'modelValue', modelValue, 'viewValue', viewValue
        if scope.residential_creator.mode == 'multi'
          if parseInt(modelValue) > 0 and parseInt(modelValue) <= 4
            return true
          else if parseInt(modelValue) < 0
            scope.residential_creator.units = 0
          else if parseInt(modelValue) >= 4
            scope.residential_creator.units = 4
        else if scope.residential_creator.mode == 'apartment'
          if parseInt(modelValue) > 0 and parseInt(modelValue) <= 200
            return true
          else if parseInt(modelValue) < 0
            scope.residential_creator.units = 0
          else if parseInt(modelValue) > 200
            scope.residential_creator.units = 200
        else if scope.residential_creator.mode == 'single'
          if parseInt(modelValue) == 1
            return true
          else
            scope.residential_creator.units = 1

        return false
