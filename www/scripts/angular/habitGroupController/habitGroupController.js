module.controller('HabitGroupController', HabitGroupController);
   
HabitGroupController.$inject = ['colorService', 'groupHabitFactory', 'pushPageDataTransferFactory', '$scope',
    'utilitiesService'];   
   
function HabitGroupController(colorService, groupHabitFactory, pushPageDataTransferFactory, $scope, utilitiesService) {
    var vm = this;
    
    //input fields
    vm.groupName = undefined;
    vm.groupColor = undefined;
    vm.alarmTime = undefined;
    vm.alarmDays = [false, false, false, false, false, false, false]; 
    vm.targetId = pushPageDataTransferFactory.LoadParams();
    vm.targetInfo = undefined;
    vm.sometext = undefined;
    
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
    
    vm.LoadHabitGroup = function(){
        var myDataPromise = groupHabitFactory.LoadSpecificHabitGroup(vm.targetId);
        
        utilitiesService.ShowLoading();
        
        myDataPromise.then(function(result) {
            vm.alarmTimeSplit = result.items[0].AlarmTime.split(":");

            vm.targetInfo = {
                id: result.items[0]._id,
                name: result.items[0].Name,
                color: result.items[0].Color,
                alarmTime: new Date("2011-04-20 " + vm.alarmTimeSplit[0] + ":" + vm.alarmTimeSplit[1] +":" + vm.alarmTimeSplit[2]),
                today: moment().format('ddd, D MMM')
            };
            
            utilitiesService.HideLoading(); 
            //Major fix - update $digest manualy, when data has been returned
            $scope.$apply();
        });
    };
}