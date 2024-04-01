import express from "express";
import {
  accessUserByPhone,
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

router.get("/access/user/by/phone/:phone", accessUserByPhone)

export default router;
