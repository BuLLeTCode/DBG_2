(function(){
    //Push notification handler - 
    monaca.cloud.Push.setHandler(function(data) {
      alert(data);
    });
})();