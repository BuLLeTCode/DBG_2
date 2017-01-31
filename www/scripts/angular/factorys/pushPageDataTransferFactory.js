module.factory('pushPageDataTransferFactory', pushPageDataTransferFactory);

//This will been used to transfer data between pages... :) 
function pushPageDataTransferFactory() { 
    var vm = this;
    
    //
    vm.passedItems = undefined;
    vm.passedMultipleParams = [];
    
    return {
        LoadParams : LoadParams,
        SetParams : SetParams,
        LoadMultipleParams : LoadMultipleParams,
        SetMultipleParams : SetMultipleParams
    };
    
    
    function LoadParams(){
        return vm.passedItems;
    }
    
    //Can also been used to set object with many propeties
    function SetParams(params){
        vm.passedItems = params;
    }
    
    function LoadMultipleParams(){
        return vm.passedMultipleParams;
    }
    
    function SetMultipleParams(multiParams){
        vm.passedMultipleParams = multiParams;
    }
}