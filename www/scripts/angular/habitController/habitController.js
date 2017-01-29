module.controller('HabitController', HabitController);
   
HabitController.$inject = ['premadeHabitFactory', '$scope', 'utilitiesService'];   
   
function HabitController(premadeHabitFactory, $scope, utilitiesService) {
    
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
                    duration: result.items[i].Duration
                };
    
                vm.premadeHabits.push(premadeHabit);
            }
            
            utilitiesService.HideLoading(); 
            $scope.$apply();
        });
    }
}