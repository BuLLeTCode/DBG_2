module.controller('UserManagmentController', UserManagmentController);
   
UserManagmentController.$inject = ['oneSignalService'];   
   
function UserManagmentController(oneSignalService) {
    //init
    var vm = this;
    
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
         
         // Sync hashed email if you have a login system or collect it.
         //   Will be used to reach the user at the most optimal time of day.
         // window.plugins.OneSignal.syncHashedEmail(userEmail);
       }, false);   
    };
    
    vm.checkAppUser = function(){
        //Start with push notification service init.
        vm.initOneSignalPushNotifications();
        
        alert(oneSignalService.getOneSignalId());
    };
};