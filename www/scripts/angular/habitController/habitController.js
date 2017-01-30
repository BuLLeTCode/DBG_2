module.controller('HabitController', HabitController);
   
HabitController.$inject = ['premadeHabitFactory', '$scope', 'utilitiesService', 'groupHabitFactory', 
    'pushPageDataTransferFactory'];   
   
function HabitController(premadeHabitFactory, $scope, utilitiesService, groupHabitFactory, pushPageDataTransferFactory) {
    
    var vm = this;
    vm.premadeHabits = [];
    vm.habitCount = 0;
    //Maybe import moment.js to use for working with date / time
    vm.habitGroupDuration = premadeHabitFactory.GetPremadeHabitDuration();
    
    if(vm.premadeHabits !== undefined && vm.premadeHabits !== null){
        alert(typeof(vm.premadeHabits));
        vm.habitCount = vm.premadeHabits.length;
    }
    
    vm.LoadPremadeHabits = function(){
        utilitiesService.ShowLoading();
        
        var myDataPromise = premadeHabitFactory.LoadPremadeHabits();
        myDataPromise.then(function(result) {  
            for(var i = 0; i < result.items.length; i++)
            {
                var premadeHabit = {
                    id: result.items[i]._id,
                    icon: result.items[i].Icon,
                    name: result.items[i].HabitName,
                    description: result.items[i].Description,
                    duration: result.items[i].Duration,
                    habits: result.items[i].Habits,
                };
    
                vm.premadeHabits.push(premadeHabit);
            }
            
            utilitiesService.HideLoading(); 
            $scope.$apply();
        });
    }
    
    //Habit time can be in minutes and hours
    vm.getTimeFromMins = function(mins){
        if (mins >= 24 * 60 || mins < 0) {
            throw new RangeError("Valid input should be greater than or equal to 0 and less than 1440.");
        }
        var h = mins / 60 | 0,
            m = mins % 60 | 0;
            
        if(h > 0)
        {
            return h + " h " + m + " mins";   
        }
        else
        {
            return m + " mins";        
        }
    };
    
    vm.addPremadeHabitToGroup = function(group, habit){
        groupHabitFactory.AddHabitToGroup(pushPageDataTransferFactory.LoadParams(), habit);
    };
}