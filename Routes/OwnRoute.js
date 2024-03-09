import express from "express";
import {
  deleteSpecificStateAndDistrictPSs,
  onChangeRole,
  onGetAllStatepsDetails,
} from "../Controllers/OwnController.js";

const router = express.Router();

router.get("/allstates/ps/details", onGetAllStatepsDetails);

router.delete(
  "/all/delete/state/:state/district/:district",
  deleteSpecificStateAndDistrictPSs
);

router.put("/change/role/phone/:phone", onChangeRole);

export default router;
