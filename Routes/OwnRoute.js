import express from "express";
import {
  accessUserByPhone,
  deleteSpecificStateAndDistrictPSs,
  fetchOnlAssamPsData,
  fetchPdfDataAssemblyDistrictWise,
  firstFetchDistrciUser,
  onChangeRole,
  onGetAllStatepsDetails,
  removeWhiteSPace,
  updatedAssemblyByPhone,
  updatedAssemblyDistrictWise,
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

//
//
//
// user signup data modifications write new apis

router.get("/first/fetch/district/all/user/:district", firstFetchDistrciUser);

router.put("/remove/white/space/:district", removeWhiteSPace);

router.put("/update/assembly/:district/:assembly", updatedAssemblyDistrictWise);

router.put("/update/phone/assembly/:phone", updatedAssemblyByPhone);

export default router;
