import express from "express";
import {
  accessUserByPhone,
  deleteSpecificStateAndDistrictPSs,
  donwloadMajuli,
  downloadUserSomeCount,
  fetchOnlAssamPsData,
  fetchPdfDataAssemblyDistrictWise,
  findUserSpecificDistrict,
  findUserSpecificDistrictUpdatedAssembly,
  firstFetchDistrciUser,
  onChangeRole,
  onGetAllStatepsDetails,
  onMultipleRegistorFind,
  ownNameUpdateDistrictValue,
  removeWhiteSPace,
  updatedAssemblyByPhone,
  updatedAssemblyDistrictWise,
  updatedUserBYPhoneADistrictAssembly,
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

router.put("/update/phone/assembly/:phone/:assembly", updatedAssemblyByPhone);

router.put(
  "/find/user/specific/district/:district/update/:updated",
  findUserSpecificDistrict
);

router.get(
  "/find/user/specific/district/:district/update/assembly/:assembly/updated/:updated",
  findUserSpecificDistrictUpdatedAssembly
);

router.get(
  "/own/district/name/update/district/:district/value/:value",
  ownNameUpdateDistrictValue
);

router.get("/mutliple/registor/find", onMultipleRegistorFind);

router.put(
  "/updated/users/byphone/:phone",
  updatedUserBYPhoneADistrictAssembly
);

router.get("/donload/majuli/district/:district", donwloadMajuli);

router.get("/download/user/some/count", downloadUserSomeCount);

export default router;
