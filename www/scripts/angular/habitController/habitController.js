module.controller('HabitController', HabitController);
   
HabitController.$inject = ['premadeHabitFactory'];   
   
function HabitController(premadeHabitFactory) {
    
    var vm = this;
    vm.premadeHabits = premadeHabitFactory.LoadPremadeHabits();
    vm.habitCount = 0;
    //Maybe import moment.js to use for working with date / time
    vm.habitGroupDuration = premadeHabitFactory.GetPremadeHabitDuration();
    
    if(vm.premadeHabits !== undefined && vm.premadeHabits !== null){
        alert(typeof(vm.premadeHabits));
        vm.habitCount = vm.premadeHabits.length;
    }
}