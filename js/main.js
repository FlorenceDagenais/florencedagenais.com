$(document).ready(function() {

    $(".project, .long-project").hover(function() {
       $(this).children(".description").show({"duration": 200});
    },
    function() {
       $(this).children(".description").hide();
    });

    // Enable tooltips!
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

});
