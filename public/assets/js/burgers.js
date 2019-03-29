// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-devoured").on("click", function(event) {
      var devourId = $(this).data("id");
      console.log("DEVOUR ID: " + devourId);
      //Find out whether it's devoured (it's not) and invert it
      var newDevoured = $(this).attr("data-newDevoured");
      if(newDevoured == "false") { //false should change to 1 (true)
        newDevoured = 1;
      }
      else if(newDevoured == "true") { //true would change to 0 (false)
        newDevoured = 0;
      }
      console.log(newDevoured);

      var newDevouredState = {
        id: devourId,
        devoured: newDevoured
      };
      console.log(newDevouredState);
  
      // Send the POST request.
      $.ajax("/burgers/update", {
        type: "POST",
        data: newDevouredState
      }).then(
        function() {
          console.log("changed devoured to", newDevoured);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      console.log("CREATE");
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#burger").val().trim(),
        devoured: 0
      };
      console.log(newBurger);
  
      // Send the POST request.
      $.ajax("/burgers/create", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-burger").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  