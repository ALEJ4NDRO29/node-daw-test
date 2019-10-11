function ShowAuthed(User, Login) {
  'ngInject';

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.User = User;
      scope.Login = Login;

      scope.$watch('Login.currentUser', function (val) {
        if (val) {
          if (attrs.showAuthed === 'true') {
            element.css({ display: 'inherit' })
          } else {
            element.css({ display: 'none' })
          }
        } else {
          if (attrs.showAuthed === 'true') {
            element.css({ display: 'none' })
          } else {
            element.css({ display: 'inherit' })
          }
        }
      });

      // scope.$watch('User.current', function (val) {
      //   // If user detected
      //   if (val) {
      //     if (attrs.showAuthed === 'true') {
      //       element.css({ display: 'inherit' })
      //     } else {
      //       element.css({ display: 'none' })
      //     }

      //     // no user detected
      //   } else {
      //     if (attrs.showAuthed === 'true') {
      //       element.css({ display: 'none' })
      //     } else {
      //       element.css({ display: 'inherit' })
      //     }
      //   }
      // });

    }
  };
}

export default ShowAuthed;
