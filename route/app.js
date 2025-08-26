const {Router} = require("express")

const appController = require("../controller/app")




const router  = Router();

router.post("/distance", appController.sendDistanceData);
router.get("/distance/latest", appController.getLatestData);
router.get("/distance/weekly", appController.getWeeklyData);

module.exports = router;
    