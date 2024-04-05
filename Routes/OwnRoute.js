import express from "express";
import {
  accessUserByPhone,
  deleteSpecificStateAndDistrictPSs,
  fetchOnlAssamPsData,
  fetchPdfDataAssemblyDistrictWise,
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

router.get("/access/user/by/phone/:phone", accessUserByPhone);

router.get("/only/assam/psdata", fetchOnlAssamPsData);

router.get(
  "/fetch/pdf/data/assembly/:assembly/district/:district",
  fetchPdfDataAssemblyDistrictWise
);

export default router;
