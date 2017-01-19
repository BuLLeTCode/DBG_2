module.service('colorService', colorService);
//Setting and getting color from popover what creates new scope, when called
function colorService() {
    //TODO: maybe make it 
    var vm = this;
    vm.groupColor = undefined;
    
    vm.GetSelectedGroupColor = function(){
        return vm.groupColor;
    }
    
    vm.SetGroupColor = function(color){
        vm.groupColor = color;
    }
}