module.service('habitGroupService', habitGroupService);



function habitGroupService() {
    var vm = this;
    vm.userHabitGroups = [];
    
    var HabitGroups = monaca.cloud.Collection("HabitGroups");
    
    vm.LoadHabitGroups = function(){
        HabitGroups.findMine("", "", {propertyNames: ["Name", "Color", "AlarmTime", "AlarmDays"]})
        .done(function(result)
        {
           alert('Total items found: ' + result.totalItems);
//           alert(Object.keys(result.items[0]));
//           alert('The name of the first item: ' + result.items[0].Name + " time: " + result.items[0].AlarmTime +
//           " color: " + result.items[0].Color + " days: " + result.items[0].AlarmDays);
           for(var i = 0; i < result.items.length; i++)
           {
               //TODO: Check alarm day.
               
                var habitGroup = {
                    id: result.items[i]._id,
                    name: result.items[i].Name,
                    color: result.items[i].Color,
                    alarmTime: result.items[i].AlarmTime
                };
                alert("Inserting: " + habitGroup.name);

                vm.userHabitGroups.push(habitGroup);
           }
           
           $("#fountainG").hide();
        })
        .fail(function(err) 
        {
           alert("Err#" + err.code +": " + err.message);
        });
    }
    
    vm.LoadHabitGroups();
    
    vm.GetHabitGroups = function(){
        return vm.userHabitGroups;
    }
}