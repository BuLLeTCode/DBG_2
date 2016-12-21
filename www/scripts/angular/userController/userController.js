//ons.bootstrap()
//      .controller('UserController', UserController);
//      
//function UserController() {
//    //user auth logic here?
//    var vm = this;
//    
//    vm.userEmail = undefined;
//    vm.userPassword = undefined;
//    
//    var mc = monaca.cloud; 
//    var w = monaca.cloud.Collection("Users");
//    
//    //functions
//    //registerFunction
//    vm.registerUser = function(){
//        console.log("Err#");
////        monaca.cloud.User.register("me@example.com", "password", {age:21})
////.done(function(result)
////{
////   console.log("Welcome, " + result.user._username);
////   console.log("You are " + result.user.age + " years old.");
////}
////)
////.fail(function(err)
////{
////   console.log("Err#" + err.code +": " + err.message);
////});
//
//    var friendUserOid = "x00000000-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
//    var permission = {};
//    permission[friendUserOid] = "r";
//    
//    w.insert({title: 'Any title', body: 'Hello World'}, permission)
//    .done(function(result)
//    {
//       console.log("Inserted!");
//    })
//    .fail(function(err)
//    {
//       console.log("Err#" + err.code +": " + err.message);
//    });
//        console.log("Err#END");
//    };
//    
//    //loginUser
//    vm.loginUser = function(){
//       
//    }; 
//}