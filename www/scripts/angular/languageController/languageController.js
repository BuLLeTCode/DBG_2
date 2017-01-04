module.controller('LanguageController', LanguageController);
      
function LanguageController($translate) {
    //init
    var vm = this;
    
    vm.possibleLangs = ["gb", "lv"];
    vm.lang = undefined;
    
    vm.imagePath = "res/phoca_flags/";
    vm.imageFormat = ".png";
    
    
    vm.setDefaultLanguage = function(){
        lang = "en";
        Cookies.set("language", "en");
        $translate.use(lang);
        vm.changeLanguageProperty(lang);
    };
    
    vm.getActiveLanguage = function(){
        lang = Cookies.get("language");   
        //First time case
        if(lang === undefined){
            vm.setDefaultLanguage();
        } 
        return lang;
    };
    
    vm.changeActiveLanguage = function(language){
        alert("Language has been changed to: " + language);
        lang = language;
        Cookies.set("language", language);
        $translate.use(lang);
        vm.changeLanguageProperty(language);
    };
    
    vm.changeLanguageProperty = function(lang){
        if (monaca.cloud.User.isAuthenticated()) {
          monaca.cloud.User.saveProperty("Language", lang);
        }
    }
};