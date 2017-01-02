//Global variable for module is bad practices - but life is also a bad practice!
var module = ons.bootstrap('demo', ['pascalprecht.translate']);

module.config(function ($translateProvider) {
  $translateProvider.translations('gb', {
    WELCOME: 'Welcome to DBG',
    REGISTER: 'Register',
    LOGIN: 'Login',
    MAIN: 'Main'
  });
  $translateProvider.translations('lv', {
    WELCOME: 'Esi sveicināts DBG',
    REGISTER: 'Reģistrēties',
    LOGIN: 'Ielogoties',
    MAIN: 'Galvenā lapa'
  });
  //Set most friendly language for users
  $translateProvider.preferredLanguage('gb');
  //A secure strategy.
  $translateProvider.useSanitizeValueStrategy("escape");
});
