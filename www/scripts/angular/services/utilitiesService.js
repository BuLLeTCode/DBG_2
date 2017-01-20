module.service('utilitiesService', utilitiesService);
//Will contains all utilites - for example - gettingDeviceId / platform and so on
function utilitiesService() { 
    var vm = this;
    
    vm.GetDeviceId = function(){
        //Does this can contain error? 
        monaca.getDeviceId(function(id){
            alert('Device ID: ' + id);
            
            return id;
        });
    }
}