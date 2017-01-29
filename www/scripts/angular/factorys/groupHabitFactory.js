module.factory('groupHabitFactory', groupHabitFactory);

//Factory for storing PremadeHabit collection functional
function groupHabitFactory() { 
    
    //Do this is needed?
    var vm = this; 
    
    //Collection objects
    var HabitGroups = monaca.cloud.Collection("HabitGroups");
    
    return {
        LoadHabitGroups: LoadHabitGroups,
        LoadSpecificHabitGroup: LoadSpecificHabitGroup
    };

    function LoadHabitGroups(){
        vm.usersTodaysHabitGroups = [];
        
        return HabitGroups.findMine("", "", {propertyNames: ["Name", "Color", "AlarmTime", "AlarmDays"]})
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
        
        return HabitGroups.findMine('_id == "' +id+ '"', {propertyNames: ["Name", "Color", "AlarmTime", "AlarmDays"]})
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
}