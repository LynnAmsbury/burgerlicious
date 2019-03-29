var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  res.redirect("/burgers");
  // burger.all(function(data) {
  //   var hbsObject = {
  //     burgers: data
  //   };
  //   console.log(hbsObject);
  //   res.render("index", hbsObject);
  // });
});

router.get("/burgers",function (req, res) {
  burger.all(function(data) {
    res.render("index", {burgers: data});
  });
});

router.post("/burgers/update", function(req, res) {
  console.log("UPDATING BURGER");
  var updateId = req.body.id;
  var updateDevoured = req.body.devoured;
  console.log("SET " + updateId + " to " + updateDevoured);
  // An example of objColVals would be {name: panther, sleepy: true}
  // update: function(objColVals, condition, cb) {
  var objColVals = {devoured: updateDevoured};
  var idMatch = "id=" + updateId;
  burger.update(objColVals, idMatch, function(result) {
    console.log(result);
    res.redirect("/");
  });

});

router.post("/burgers/create", function(req, res) {
  console.log("CREATING BURGER");

  //cols, vals, callback
  var cols = ['burger_name', 'devoured'];
  var vals = [req.body.burger_name, req.body.devoured];
  burger.create(cols, vals, function(result) {
    console.log(result);
    res.redirect("/");
  });
});

  // burger.create([
  //   "burger_name", "devoured"
  // ], [
//     req.body.name, req.body.devoured
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
