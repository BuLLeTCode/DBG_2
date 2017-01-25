module.factory('premadeHabitFactory', premadeHabitFactory);

//Factory for storing PremadeHabit collection functional
function premadeHabitFactory() { 
    
    //Do this is needed?
    var vm = this; 
    var premadeHabits = monaca.cloud.Collection("PremadeHabits");
    return {
        LoadPremadeHabits: LoadPremadeHabits,
        GetPremadeHabitDuration: GetPremadeHabitDuration
    };

    function LoadPremadeHabits(){
        //Collection objects
        
        alert("Loading Premade habits");
        vm.userHabits = [];
        
        return premadeHabits.find("", "", {propertyNames: ["Icon", "HabitName", "Description", "Duration"], limit: 10})
        .done(function(result)
        {
           console.log('Total items found: ' + result.totalItems);
           for(var i = 0; i < result.items.length; i++)
           {
               //TODO: Check alarm day.
               
                var premadeHabit = {
                    id: result.items[i]._id,
                    icon: result.items[i].Icon,
                    name: result.items[i].HabitName,
                    description: result.items[i].Description,
                    duration: result.items[i].Duration
                };

                vm.userHabits.push(premadeHabit);
           }
           
           return vm.userHabits;
        })
        .fail(function(err)
        {
           console.log("Err#" + err.code +": " + err.message);
        }); 
        
    }
    
    function GetPremadeHabitDuration(){
        vm.total = 0;
        
         premadeHabits.find("", "", {propertyNames: ["Icon", "HabitName", "Description", "Duration"], limit: 10})
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