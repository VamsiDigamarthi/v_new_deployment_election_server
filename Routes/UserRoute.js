import express from "express";
import {
  allUserDataFromPDFFile,
  downloadCertificate,
  fetchAllUserAvailable,
  incresePreviweCount,
  kiStartImgUpload,
  onCompletedCertificateKitFit,
  onInstallationCertificateAndImage,
  rejectedTasks,
  scoreDataWheneUserOpenLearning,
  updateScoreOfUser,
  updateTask,
  uploadLongLatiSpeed,
  userFetchTask,
  userGetOwnProfile,
  userProfileUpdate,
} from "../Controllers/UserController.js";
const router = express.Router();

router.get("/fetch/all/user/available", fetchAllUserAvailable);

router.get("/user-get-profile/:id", userGetOwnProfile);

router.put("/update-profile/:id", userProfileUpdate);

router.get("/only-score/:id", scoreDataWheneUserOpenLearning);

router.put("/update-score/:id", updateScoreOfUser);

router.get("/fetch-task/:id", userFetchTask);

router.put("/update-task/:id", updateTask);

router.put("/rejected/all/task/:id", rejectedTasks);

router.put("/kit-start-image/upload/:id", kiStartImgUpload);

router.put(
  "/installation-certificate-image/:id",
  onInstallationCertificateAndImage
);

router.put(
  "/completed-certificate-kit-fitting-img/:id",
  onCompletedCertificateKitFit
);

router.put("/download-certificate/:id", downloadCertificate);

router.put("/previwe/:id", incresePreviweCount);

router.put("/uploaded/lon/speed/:id/taskId/:taskId", uploadLongLatiSpeed);

// download pdf files all users

router.get(
  "/all/user/pdf/file/state/:state/district/:district/assembly/:assembly",
  allUserDataFromPDFFile
);

export default router;
