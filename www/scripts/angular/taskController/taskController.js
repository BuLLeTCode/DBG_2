ons.bootstrap()
      .controller('TaskController', TaskController);
      
function TaskController() {
    //Init
    var vm = this;
    
    //UserManagement
    vm.userName = undefined;
    vm.userEmail = undefined;
    vm.userPassword = undefined;
    //Habit page
    vm.userSearch = undefined;
    vm.userHabits = [];
    vm.habitName = undefined;
    vm.habitPushDelay = undefined;
    
    //Collection objects
    var Habits = monaca.cloud.Collection("Habits");
    
    //Functions
    
    //registerFunction
    vm.registerUser = function(){
        alert("submit");
        monaca.cloud.User.register(vm.userEmail, vm.userPassword, {Name : vm.userName})
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
    
    //Push notification
    vm.sendPushNotification = function(){
        alert("Sending push notification");
        
        window.wakeuptimer.wakeup( successCallback,  
       errorCallback, 
       // a list of alarms to set
       {
            alarms : [{
                type : 'onetime',
                time : { hour : 19, minute : 52 },
                extra : { message : 'json containing app-specific information to be posted when alarm triggers' }, 
                message : 'Alarm has expired!'
           }] 
       }
    );

//        monaca.cloud.Push();
    };
}