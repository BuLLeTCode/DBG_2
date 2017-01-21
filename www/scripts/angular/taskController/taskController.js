module.controller('TaskController', TaskController);
      
TaskController.$inject = ['$http', 'oneSignalService', 'habitGroupFactory', 'habitGroupService'];
      
function TaskController($http, oneSignalService, habitGroupFactory, habitGroupService) {
    //Init    
    var vm = this;
    
    //UserManagement
    vm.userName = undefined;
    vm.userEmail = undefined;
    vm.userPassword = undefined;
    //Habit page
    vm.userSearch = undefined;
    vm.userHabits = [];
    vm.userHabitGroups = [];
    vm.habitName = undefined;
    vm.habitPushDelay = undefined;
    vm.showHabits = false;
    
    //Collection objects
    var Habits = monaca.cloud.Collection("Habits");
    
    //Functions
    
    //registerFunction
    vm.registerUser = function(){
        
        if(monaca.cloud.User.isAuthenticated()){
            monaca.cloud.User.saveProperties({"Name":vm.userName});
        }else{
            monaca.cloud.User.register(vm.userEmail, vm.userPassword, {Name : vm.userName, OneSignalId : oneSignalService.userOneSignalId})
            .done(function(result)
            {
               alert("Welcome, " + result.user._username);
               app.navi.pushPage('index.html');
            }
            )
            .fail(function(err)
            {
                alert("Err#" + err.code +": " + err.message);
            });
        }
        
    };
    
    //loginUser
    vm.loginUser = function(){
//        alert("Login: " + vm.userEmail + " Pass: " + vm.userPassword);
        monaca.cloud.User.login(vm.userEmail, vm.userPassword)
        .done(function(result){
           alert("Hello again, " + result.user.Name);
           if(monaca.cloud.User.isAuthenticated())
           {   
               app.navi.pushPage('main.html');
           }
        })
        .fail(function(err)
        {
           alert("Err#" + err.code +": " + err.message);
        });
    };
    
    //logoutUser
    vm.logoutUser = function(){
        monaca.cloud.User.logout()
        .done(function(result)
        {
           alert("You are successfully logged out");
           app.navi.pushPage('index.html');
        })
        .fail(function(err)
        {
           alert("Err#" + err.code +": " + err.message);
        });  
    };
    
    vm.loadHabits = function(){
        //TODO: Remove limit :)
        Habits.findMine("", "", {propertyNames: ["HabitName", "HabitDelay"], limit: 10})
        .done(function(result)
        {
           alert('Total items found: ' + result.totalItems);
           alert('The name of the first item: ' + result.items[0].HabitName + " delay: " + result.items[0].HabitDelay);
           
           for(var i = 0; i < result.items.lenght; i++)
           {
                var newHabit = {
                    name: result.items[i].HabitName,
                    delay: result.items[i].HabitDelay
                };
                alert("New habit added");
//               vm.userHabits[i] = newHabit;
                vm.userHabits.push(newHabit);
           }
           
           $("#fountainG").hide();
           $("#habit_container").show();
        })
        .fail(function(err)
        {
           alert("Err#" + err.code +": " + err.message);
           $("#fountainG").hide();
           $("#habit_container").show();
        });  
    };
    
    vm.showHabitInput = function(){
        $("#new-habit-input").toggle();
    };
    
    vm.addHabit = function(){
        var newHabit = {
            name: vm.habitName,
            delay: vm.habitPushDelay
        };
                
        vm.userHabits.push(newHabit);
        
        Habits.insert({HabitName: vm.habitName, HabitDelay: vm.habitPushDelay})
        .done(function(result)
        {
//           alert("Inserted!");
        })
        .fail(function(err)
        {
           alert("Err#" + err.code +": " + err.message);
        });
    };
    
    vm.displayUserHabitGroups = function(){
//        alert("Displaying user habit groups");
//        alert("T:" + habitGroupFactory.GetUserHabitGroups());
//        vm.userHabitGroups = habitGroupFactory.GetUserHabitGroups();
        vm.userHabitGroups = habitGroupService.GetHabitGroups();
    }
    
    //Push notification
    vm.sendPushNotification = function(){
        //TODO: Add server side function... $http
        $http.post('http://46.101.80.183/dbg/CreateNotification.php');
    };
}