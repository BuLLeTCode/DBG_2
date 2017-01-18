module.controller('HabitGroupController', HabitGroupController);
   
//HabitGroupController.$inject = [''];   
   
function HabitGroupController() {
    var vm = this;
    
    //input fields
    vm.groupName = undefined;
    vm.groupColor = undefined;
    vm.test = undefined;
    vm.alarmTime = undefined;
    vm.alarmDays = [false, false, false, false, false, false, false]; 
    
    //Collection objects
    var HabitGroups = monaca.cloud.Collection("HabitGroups");
    
    //functions
    vm.CreateHabitGroup = function() 
    {
        alert("Creating Habit Group!");
        alert("Values: " + vm.groupName + " " + vm.test + " " + vm.alarmTime + " " + vm.alarmDays);
    }
    
    vm.ChooseGroupColor = function(color)
    {
        alert("Color:" + color);
        //Should here will be RGB or HEX? For now - hex
        vm.test = 'color';
    }
    
    vm.DayHandler = function(index)
    {
        alert("Index: " + index);
        vm.alarmDays[index] = !vm.alarmDays[index];
    }
    
    ons.createPopover('popover.html').then(function(popover) {
        vm.popover = popover;
    });
    
    vm.ShowPopover = function(e) {
    vm.popover.show(e);
  };
}