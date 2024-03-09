import express from "express";
import {
  allUserAssemblyWise,
  assignAllTaskToUser,
  asslPsData,
  onAssignRejectedTask,
  onFetchAllRejectedTask,
  onFetchNotAssingUser,
} from "../Controllers/AssemblyController.js";

const router = express.Router();

router.get("/allps/assemblycoor/:id", asslPsData);

router.get(
  "/alluser/assembly/:assembly/state/:state/district/:district",
  allUserAssemblyWise
);

router.post(
  "/assign/task/user/:id/name/:name/phone/:phone",
  assignAllTaskToUser
);

router.get(
  "/all/rejectedtask/assembly/:assembly/state/:state",
  onFetchAllRejectedTask
);

router.get(
  "/notassignusers/state/:state/district/:district/assembly/:assembly",
  onFetchNotAssingUser
);

router.post(
  "/assign/rejectedtask/user/:id/name/:name/phone/:phone",
  onAssignRejectedTask
);

export default router;
