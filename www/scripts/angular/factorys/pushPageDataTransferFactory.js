module.factory('pushPageDataTransferFactory', pushPageDataTransferFactory);

//This will been used to transfer data between pages... :) 
function pushPageDataTransferFactory() { 
    var vm = this;
    
    vm.selectedItem = undefined;
    
    vm.data = [
        { 
            title: 'Item 1',
            description: 'Item 1 Description'
        },
        { 
            title: 'Item 2',
            description: 'Item 2 Description'
        },
        { 
            title: 'Item 3',
            description: 'Item 3 Description'
        }
        ]; 
    
    return {
        LoadParams : LoadParams,
        SetParams : SetParams
    };
    
    
    function LoadParams(index){
        
        return vm.selectedItem;
    }
    
    function SetParams(index){
        
        vm.selectedItem = vm.data[index];
    }
}