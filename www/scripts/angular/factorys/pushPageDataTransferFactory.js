module.factory('pushPageDataTransferFactory', pushPageDataTransferFactory);

//This will been used to transfer data between pages... :) 
function pushPageDataTransferFactory() { 
    var vm = this;
    
    vm.selectedItem = undefined;
    
    return {
        LoadParams : LoadParams,
        SetParams : SetParams
    };
    
    
    function LoadParams(){
        return vm.selectedItem;
    }
    
    function SetParams(id){
        vm.selectedItem = id;
    }
}