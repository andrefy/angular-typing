/**
 * Angular Typing
 *
 */
(function() {
  'use strict';

  angular
    .module('angular-typing', [])
    .directive('ngTyping', NgTypingDirective);

  NgTypingDirective.$inject = ['$timeout'];
  function NgTypingDirective ($timeout) {
    return {
      restrict: 'A',
      link: link,
      replace: true,
      scope: {
        typingsettings: '=',
        ngModel: '='
      }
    };

    function link (scope, element, attrs) {
      var defaultSettings = {
        'start': function(){},
        'stop': function(){},
        'delay': 400
      };

      var settings = angular.extend(defaultSettings, scope.typingsettings);
      scope.typing = true;
      scope.timeoutCallback = null;

      element.bind('blur', onBlur);
      element.bind('keypress', startTyping);
      element.bind('keydown', startTyping);
      element.bind('keyup', stopTyping);

      function startTyping(event) {
        if (scope.typing ) {
          return event;
        }
        scope.typing  = true;
        settings.start(scope.ngModel, event, element);
      }

      function stopTyping(event, delay) {
        if (!scope.typing ) {
          return event;
        }
        $timeout.cancel(scope.timeoutCallback) ;
        delay = delay === 0 ? 0 : settings.delay;
        scope.timeoutCallback = $timeout(onStopTimeOut, delay);
      }

      function onStopTimeOut() {
        scope.typing  = false;
        settings.stop(scope.ngModel, element);
      }

      function onBlur(event) {
         stopTyping(event, 0);
      }

      function onKeyDown(event) {
        if (event.keyCode === 8 || event.keyCode === 46) {
              startTyping(event);
        }
      }

    }
  }

})();
