module.controller('UserManagmentController', UserManagmentController);
   
UserManagmentController.$inject = ['oneSignalService'];   
   
function UserManagmentController(oneSignalService) {
    //init
    var vm = this;
    
    //Interval for guest account generating?
    var maxAccounts = 10000;
    var minAccounts = 1;
    
    vm.updateUserCollection = function(){
        if (monaca.cloud.User.isAuthenticated() && oneSignalService.userOneSignalId !== undefined) {
          monaca.cloud.User.saveProperty("OneSignalId", oneSignalService.userOneSignalId);
        }
    };
    
    vm.tryAutoLogin = function(){
        monaca.cloud.User.autoLogin()
        .done(function(result)
        {
           alert("Hello again, " + result.user._username);
           if(monaca.cloud.User.isAuthenticated())
           {   
               app.navi.pushPage('main.html');
           }
        })
        .fail(function(err)
        {
//           alert("Err#" + err.code +": " + err.message);
            vm.createGuestUser();
        });    
    };
    
    vm.createGuestUser = function(){
        var randIndex = Math.floor(Math.random() * (maxAccounts - minAccounts + 1)) + minAccounts;
        var guestUserName = "Guest_" + randIndex;
        var guestPassword = "Password" + randIndex;
        alert("Generated userName: " + guestUserName);
        monaca.cloud.User.validate(guestUserName)
        .done(function(result)
        {
           console.log("Validation passed!");
            monaca.cloud.User.register(guestUserName, guestPassword, {OneSignalId : oneSignalService.userOneSignalId})
            .done(function(result)
            {
//               alert("Welcome, " + result.user._username);
                monaca.cloud.User.login(guestUserName, guestPassword)
                .done(function(result){
                   alert("Hello!");
                   if(monaca.cloud.User.isAuthenticated())
                   {   
                       app.navi.pushPage('main.html');
                   }
                })
                .fail(function(err)
                {
                   alert("Login Err#" + err.code +": " + err.message);
                });
            }
            )
            .fail(function(err)
            {
                alert("Register Err#" + err.code +": " + err.message);
            });
        })
        .fail(function(err)
        {
           console.log("Validation Err#" + err.code +": " + err.message);
        });
    };
    
    vm.initOneSignalPushNotifications = function(){
       //OneSignal - push notification service listener
       document.addEventListener('deviceready', function () {
       // Enable to debug issues.
       // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
     
       var notificationOpenedCallback = function(jsonData) {
           console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
       };
       
       window.plugins.OneSignal
           .startInit("e0c9ffdc-adec-472b-b2e1-6b7821035f1a")
           .handleNotificationOpened(notificationOpenedCallback)
           .endInit();
       
       //Service can return OneSignalId
       oneSignalService.getOneSignalId();
       vm.tryAutoLogin();
       
//        vm.updateUserCollection();
         // Sync hashed email if you have a login system or collect it.
         //   Will be used to reach the user at the most optimal time of day.
         // window.plugins.OneSignal.syncHashedEmail(userEmail);
       }, false);
    };
    
    vm.checkAppUser = function(){
        //Start with push notification service init.
        vm.initOneSignalPushNotifications();
    };
};