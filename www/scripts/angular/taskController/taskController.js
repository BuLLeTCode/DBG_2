ons.bootstrap()
      .controller('TaskController', TaskController);
      
function TaskController() {
    //Init
    var vm = this;
    
    //TaskManagement
    vm.taskName = undefined;
    vm.userTasks = [];
    //UserManagement
    vm.userName = undefined;
    vm.userEmail = undefined;
    vm.userPassword = undefined;
    
    //Functions
    vm.showNewTask = function(){
        console.log("new task");
        $("#new-task").toggle();
    };
    
    vm.addNewTask = function(){
        console.log("new task");
        vm.userTasks.push(vm.taskName);
        vm.taskName = undefined;
        $("#new-task-input").val("");
        console.log("userTasks: " + vm.userTasks);
    };
    
    vm.removeTask = function(target){
        console.log("target: " + target);
        vm.userTasks.splice(target, 1);
    }
    
    vm.reset = function() {
        vm.taskName = undefined;
    };    
    
    //functions
    //registerFunction
    vm.registerUser = function(){
        monaca.cloud.User.register(vm.userEmail, vm.userPassword, {Name : vm.userName})
        .done(function(result)
        {
           alert("Welcome, " + result.user._username);
        }
        )
        .fail(function(err)
        {
            alert("Err#" + err.code +": " + err.message);
        });
    };
    
    //loginUser
    vm.loginUser = function(){
        monaca.cloud.User.login(vm.userEmail, vm.userPassword)
        .done(function(result){
           alert("Hello again, " + result.user._username);
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
}