module.service('oneSignalService', oneSignalService);

function oneSignalService() {
    var vm = this;
    vm.userOneSignalId = undefined;
    
    //TODO: think about pushToken, if it will be needed in future...
    vm.getOneSignalId = function(){ 
        document.addEventListener('deviceready', function () {
        window.plugins.OneSignal.getIds(function(ids) {
//          alert("userId = " + ids.userId + ", pushToken = " + ids.pushToken);
          
          vm.userOneSignalId = ids.userId;
        });    
        }, false);
        
    };
}