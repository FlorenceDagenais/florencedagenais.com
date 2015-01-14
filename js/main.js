$(document).ready(function() {

    $(".project").hover(function() {
       $(this).children(".description").show({"duration": 200});
    },
    function() {
       $(this).children(".description").hide();
    });

});
