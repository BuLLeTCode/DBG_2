ons.bootstrap().controller('LanguageController', LanguageController);
      
function LanguageController() {
    //init
    var vm = this;
    
    var possibleLangs = ["en", "lv"];
    var lang = undefined;
    
    var imagePath = "res/phoca_flags/";
    var imageFormat = ".png";
    
    vm.getActiveLanguage = function(){
        lang = Cookies.get("language");   
        alert("Active language: " + lang);
        //First time case
        if(lang === undefined){
            lang = "en";
            Cookies.set("language", "en");
        }   
    };
    
    vm.changeActiveLanguage = function(language){
        lang = language;
        Cookies.set("language", language);
    };
};