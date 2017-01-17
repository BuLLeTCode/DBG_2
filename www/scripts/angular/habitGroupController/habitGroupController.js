module.controller('HabitGroupController', HabitGroupController);
   
//HabitGroupController.$inject = [''];   
   
function HabitGroupController() {
    var vm = this;
    
    //input fields
    vm.groupName = undefined;
    vm.groupColor = undefined;
    vm.alarmTime = undefined;
    vm.alarmDays = [false, false, false, false, false, false, false]; 
    vm.test1 = undefined;
    vm.checkboxModel = {
       value1 : true,
       value2 : 'YES'
     };
    
    //functions
    vm.CreateHabitGroup = function() 
    {
        alert("Creating Habit Group!");
        alert("Values: " + vm.groupName + " " + vm.groupColor + " " + vm.alarmTime + " " + vm.alarmDays);
    }
    
    vm.DayHandler = function(index)
    {
        alert("Index: " + index);
        vm.alarmDays[index] = !vm.alarmDays[index];
    }
}