const express = require("express");
const {
  filterByPrice,
  filterBySubject,
  filterByRate,
  sortByPopularity,
  sortByPriceA,
  sortByPriceD,
  updatePromotions
} = require("../controllers/filterController");

const router = express.Router();

router.get("/subject/:subject", filterBySubject);

router.get("/price/:price", filterByPrice);

router.get("/rate/:rate", filterByRate);

router.get("/popularity", sortByPopularity);
router.get("/priceAsc", sortByPriceA);
router.get("/priceDesc", sortByPriceD);
//new 
router.patch("/patchAll", updatePromotions)

module.exports = router;
