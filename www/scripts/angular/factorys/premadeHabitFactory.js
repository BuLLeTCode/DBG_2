module.factory('premadeHabitFactory', premadeHabitFactory);

//Factory for storing PremadeHabit collection functional
function premadeHabitFactory() { 
    
    //Do this is needed?
    var vm = this;
    
    //Collection objects
    var PremadeHabits = monaca.cloud.Collection("PremadeHabits");
    
    return {
        LoadPremadeHabits: LoadPremadeHabits,
        GetPremadeHabitDuration: GetPremadeHabitDuration
    };

    function LoadPremadeHabits(){
        vm.userHabits = [];
        
        //TODO: Remove limit...
        PremadeHabits.findMine("", "", {propertyNames: ["Icon", "HabitName", "Description", "Duration"], limit: 10})
        .done(function(result)
        {
           alert('Total items found: ' + result.totalItems);
           alert('The name of the first item: ' + result.items[0].HabitName + " delay: " + result.items[0].Duration);
           
           for(var i = 0; i < result.items.lenght; i++)
           {
                var newHabit = {
                    icon: result.items[i].Icon,
                    name: result.items[i].HabitName,
                    description: result.items[i].Description,
                    duration: result.items[i].Duration
                };
                alert("New habit added");
//               vm.userHabits[i] = newHabit;
                vm.userHabits.push(newHabit);
           }
           
           return vm.userHabits;
        })
        .fail(function(err)
        {
           alert("Err#" + err.code +": " + err.message);
           
           return null;
        });
    }
    
    function GetPremadeHabitDuration(){
        vm.total = 0;
        
         PremadeHabits.findMine("", "", {propertyNames: ["Icon", "HabitName", "Description", "Duration"], limit: 10})
        .done(function(result)
        {
           alert('Total items found: ' + result.totalItems);
           alert('The name of the first item: ' + result.items[0].HabitName + " delay: " + result.items[0].Duration);
           
           for(var i = 0; i < result.items.lenght; i++)
           {
                vm.total += result.items[i].Duration;
           }
           
           return vm.total;
        })
        .fail(function(err)
        {
           alert("Err#" + err.code +": " + err.message);
           
           return null;
        });
    }
}