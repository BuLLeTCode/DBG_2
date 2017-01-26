module.controller('HabitGroupController', HabitGroupController);
   
HabitGroupController.$inject = ['colorService', 'pushPageDataTransferFactory'];   
   
function HabitGroupController(colorService, pushPageDataTransferFactory) {
    var vm = this;
    
    //input fields
    vm.groupName = undefined;
    vm.groupColor = undefined;
    vm.alarmTime = undefined;
    vm.alarmDays = [false, false, false, false, false, false, false]; 
    vm.Testing = pushPageDataTransferFactory.LoadParams(0);
    
    //Collection objects - TODO: Maybe factory for this? 
    var HabitGroups = monaca.cloud.Collection("HabitGroups");
    
    //functions
    vm.CreateHabitGroup = function() 
    {
        vm.groupColor = colorService.GetSelectedGroupColor();
        
        alert("Creating Habit Group!");
        var timeOnly = vm.alarmTime.toString().split(" ");
        alert("Values: " + vm.groupName + " " + vm.groupColor + " " + timeOnly[4] + " " + vm.alarmDays);
        
        //TODO: Think about saving alarm days - maybe array with numbers will be better
        HabitGroups.insert({Name: vm.groupName, Color: vm.groupColor, AlarmTime: timeOnly[4], AlarmDays: vm.alarmDays})
        .done(function(result)
        {
           alert("Inserted!" + result);
           
           //Push to another page.
           app.navi.pushPage('habit_group_manager.html');
        })
        .fail(function(err)
        {
           alert("Err#" + err.code +": " + err.message);
        });
    }
    
    vm.ChooseGroupColor = function(color)
    {
        alert("Color:" + color);
        colorService.SetGroupColor(color);
    }
    
    vm.DayHandler = function(index)
    {
        vm.alarmDays[index] = !vm.alarmDays[index];
    }
    
    ons.createPopover('popover.html').then(function(popover) {
        vm.popover = popover;
    });
    
    vm.ShowPopover = function(e) {
        vm.popover.show(e);
    };
}