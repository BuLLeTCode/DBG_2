(function(){
    //Push notification handler - Not really usefull - TODO: remove it.
    monaca.cloud.Push.setHandler(function(data) {
      alert(data);
    });
})();