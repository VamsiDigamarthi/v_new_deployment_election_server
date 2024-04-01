import express from "express";
import {
  addRejectedTask,
  addTaskToUser,
  addedAssemblyCoorTask,
  districtCoorPsAcDetailsUsingDropdown,
  exelData,
  notAssignMandalWiseUser,
  onFetchAssemblyCorr,
  onNewRecheckingFile,
  paymentInitiatedToUser,
  paymentNotReceviedUser,
  rechechingOnesWithId,
  rechechingOnesWithIdStart,
  rejectedAllTaskFromUser,
  rejectedTaskDistrictBased,
  updatedOwnDistrictTask,
  userGetScoreGreaterThanEight,
  usersNotAssignTaskMandalwise,
  onFetchAllDistrictWiseAssemblyCoor,
  getAllPsDetailsWithLon,
} from "../Controllers/DistrictController.js";
const router = express.Router();

router.get(
  "/district-coor-ps-ac-number/:district",
  districtCoorPsAcDetailsUsingDropdown
);

router.post("/update/own/task/:id/task/:taskId", updatedOwnDistrictTask);

router.get("/score-user/:district", userGetScoreGreaterThanEight);

router.post("/users/notassigntask/mandalwise", usersNotAssignTaskMandalwise);

router.get(
  "/users/notassigntask/butnotassign/mandal/:district",
  notAssignMandalWiseUser
);

router.post("/add-task-user/:id/name/:name/phone/:phone", addTaskToUser);

router.post("/payment-mode-admin-update/:id", paymentInitiatedToUser);

router.get("/rejected/tasks/district/:district", rejectedAllTaskFromUser);

router.get("/payment/not/received/:district", paymentNotReceviedUser);

router.post(
  "/add-rejected-task-user/:id/name/:name/phone/:phone",
  addRejectedTask
);

router.get("/rejected-task-data/:district", rejectedTaskDistrictBased);

// rechecking

router.post("/rechecking/ones/:id", rechechingOnesWithId);

// Exel Data

router.get("/exeldata/:district", exelData);

// add new features

router.post("/rechecking/:id/start/:taskId", rechechingOnesWithIdStart);

router.post("/new/rechecking/:id", onNewRecheckingFile);

//
//
//
//
router.get(
  "/fetch/assemblyuser/state/:state/dist/:dist/assembly/:assembly",
  onFetchAssemblyCorr
);

router.put(
  "/all/assemblycoor/added/ps/state/:state/district/:district/assembly/:assembly/userid/:id/name/:name/phone/:phone",
  addedAssemblyCoorTask
);

router.get(
  "/fetch/all/assembly/coor/state/:state/district/:district",
  onFetchAllDistrictWiseAssemblyCoor
);

router.get("/all/excel/details/with/lon/:district", getAllPsDetailsWithLon)

export default router;
