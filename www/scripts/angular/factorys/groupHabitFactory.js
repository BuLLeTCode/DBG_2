module.factory('groupHabitFactory', groupHabitFactory);

groupHabitFactory.$inject = ['utilitiesService'];   

//Factory for storing PremadeHabit collection functional
function groupHabitFactory(utilitiesService) { 
    
    //Do this is needed?
    var vm = this; 
    
    //Collection objects
    var HabitGroups = monaca.cloud.Collection("HabitGroups");
    
    return {
        LoadHabitGroups: LoadHabitGroups,
        LoadSpecificHabitGroup: LoadSpecificHabitGroup,
        AddHabitToGroup: AddHabitToGroup
    };

    function LoadHabitGroups(){
        vm.usersTodaysHabitGroups = [];
        
        return HabitGroups.findMine("", "", {propertyNames: ["Name", "Color", "AlarmTime", "AlarmDays", "Habits"]})
        .done(function(result)
        {
            //ignore
        })
        .fail(function(err)
        {
           alert("Err#" + err.code +": " + err.message);
           
           return null;
        });
    }
    
    function LoadSpecificHabitGroup(id){
        vm.usersTodaysHabitGroups = [];
        
        return HabitGroups.findMine('_id == "' +id+ '"', {propertyNames: ["Name", "Color", "AlarmTime", "AlarmDays", "Habits"]})
        .done(function(result)
        {
           //ignore
        })
        .fail(function(err)
        {
           alert("Err#" + err.code +": " + err.message);
           
           return null;
        });
    }
    
    function AddHabitToGroup(group, habit){
        utilitiesService.ShowLoading();
        
        HabitGroups.findOne('_id == "' +group+ '"', {propertyNames: ["Name", "Color", "AlarmTime", "AlarmDays", "Habits"]})
        .done(function(item)
        {  
           if(item.Habits === undefined){
               item.Habits = [];
           }
           
           item.Habits.push(habit);
           item.update()
           .done(function(result)
           {
              alert('Updating success');
              utilitiesService.HideLoading();
           })
           .fail(function(err)
           {
              alert("Err#" + err.code +": " + err.message);
              utilitiesService.HideLoading();
           });
        })
        .fail(function(err)
        {
           alert("Err#" + err.code +": " + err.message);
           utilitiesService.HideLoading();
           return null;
        });
    }
}