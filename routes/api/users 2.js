const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "api/users"
router.route("/")
  .get(usersController.findAll)
  .post(usersController.create);

router
  .route("/:name")
  .get(usersController.findByName)
  .put(usersController.saveCategory);

  router
    .route("/:name/addCard")
    .put(usersController.addInfoCard);

  router
  .route("/:name/delete")
  .delete(usersController.deleteCategory);
  
module.exports = router;