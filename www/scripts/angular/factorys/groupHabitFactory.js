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
        alert("LoadSpecific");
        vm.usersTodaysHabitGroups = [];
        
        var Criteria0 = monaca.cloud.Criteria('_id == ' + id);
        alert("Criteria" + Criteria0);
        return HabitGroups.findMine('_id == "' +id+ '"', {propertyNames: ["Name", "Color", "AlarmTime", "AlarmDays"]})
        .done(function(result)
        {
           alert('Total items found: ' + result.totalItems);
//           alert('The name of the first item: ' + result.items[0].Name + " time: " + result.items[0].AlarmTime +
//           " color: " + result.items[0].Color + " days: " + result.items[0].AlarmDays);
           for(var i = 0; i < result.items.length; i++)
           {
               //TODO: Check alarm day.
               
                var habitGroup = {
                    name: result.items[i].Name,
                    color: result.items[i].Color,
                    alarmTime: result.items[i].AlarmTime
                };
                alert("Inserting: " + habitGroup.name);

                vm.usersTodaysHabitGroups.push(habitGroup);
           }
           
           return vm.usersTodaysHabitGroups;
        })
        .fail(function(err)
        {
           alert("Err#" + err.code +": " + err.message);
           
           return null;
        });
    }
}