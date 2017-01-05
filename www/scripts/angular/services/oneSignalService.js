module.service('oneSignalService', oneSignalService);

function oneSignalService() {
    var vm = this;
    
    //TODO: think about pushToken, if it will be needed in future...
    vm.getOneSignalId = function(){
        var userId = undefined; 
        document.addEventListener('deviceready', function () {
        window.plugins.OneSignal.getIds(function(ids) {
          alert("userId = " + ids.userId + ", pushToken = " + ids.pushToken);
          
          userId = ids.userId;
          
          return userId;
        });    
        }, false);
        
    };
}