module.service('utilitiesService', utilitiesService);
//Will contains all utilites - for example - gettingDeviceId / platform and so on
//utilitiesService.$inject = [''];

function utilitiesService() { 
    var vm = this;
    
    vm.GetDeviceId = function(){
        //Does this can contain error? 
        monaca.getDeviceId(function(id){
            alert('Device ID: ' + id);
            
            return id;
        });
    };
    
    vm.ShowLoading = function(){
        //Constant Jquery Dom or pass ar parameter? 
        $('.loading-body').waitMe({
            effect : 'roundBounce',
            text : ''
            });
    };
    
    vm.HideLoading = function(){
       //Add this to helper?
       $('.loading-body').waitMe("hide");  
    };
}