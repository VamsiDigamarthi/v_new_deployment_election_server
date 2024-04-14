import mongodb from "mongodb";
import { getDb } from "../Database/mongoDb.js";

const ObjectId = mongodb.ObjectId;

export const userGetOwnProfile = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const user = await userModal.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(500).json({ msg: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const userProfileUpdate = async (req, res) => {
  const userModal = getDb().db().collection("users");

  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.username,
          phonepe: req.body.phonepe,
          address: req.body.address,
          email: req.body?.email,
          profilePic: req.body?.profilePic,
          bankname: req.body?.bankname,
          banknumber: req.body?.banknumber,
          IFSC: req.body?.IFSC,
          branchName: req.body?.branchName,
        },
      }
    );
    res.status(200).json({
      resp: true,
      msg: "updates user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const scoreDataWheneUserOpenLearning = async (req, res) => {
  const userModal = getDb().db().collection("users");

  try {
    const result = await userModal.findOne({
      _id: new ObjectId(req.params.id),
    });
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const updateScoreOfUser = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { score: req.body.score } }
    );
    res.status(200).json({
      resp: true,
      msg: "updates the Score details",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const userFetchTask = async (req, res) => {
  const userModal = getDb().db().collection("tasks");
  try {
    const result = await userModal.find({ user_id: req.params.id }).toArray();
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const onUpdatePsDetailsRejectedUser = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  // console.log(req.body.taskId);
  try {
    await psModal.updateMany(
      { user_id: req.params.id },
      {
        $set: { eassign: "rejected" },
      },
      { multi: true }
    );
    res.status(200).json("task updated  successfully ...!");
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const updateTask = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  // console.log(req.body);
  // console.log(req.params.id);
  try {
    await taskModal.updateMany(
      {
        user_id: req.params.id,
      },
      { $set: { action: req.body.action } }
    );
    res.status(200).json("task updated  successfully ...!");
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const rejectedTasks = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  // console.log(req.body);
  console.log(req.params.id);
  try {
    await taskModal.updateMany(
      {
        user_id: req.params.id,
      },
      { $set: { action: req.body.action } }
    );
    onUpdatePsDetailsRejectedUser(req, res);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const kiStartImgUpload = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  try {
    await taskModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: { kit_start: req.body.image },
      }
    );
    res.status(200).json("image uploaded successfully...!");
  } catch (error) {
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};

export const onInstallationCertificateAndImage = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  try {
    await taskModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          InstallationCertificate: req.body.instaCer,
          installationImage: req.body.instaImg,
        },
      }
    );
    res.status(200).json("image uploaded successfully...!");
  } catch (error) {
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};

export const onCompletedCertificateKitFit = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  try {
    await taskModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          CompletedCertificate: req.body.completedCer,
          kit_end: req.body.kitFit,
        },
      }
    );
    res.status(200).json("image uploaded successfully...!");
  } catch (error) {
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};

export const downloadCertificate = async (req, res) => {
  const userModal = getDb().db().collection("users");
  // console.log(req.body.data);
  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          download_cer: req.body.data,
        },
      }
    );
    res.status(200).json("download certificated successfully ...!");
  } catch (error) {
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};

export const incresePreviweCount = async (req, res) => {
  const userModal = getDb().db().collection("users");

  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $inc: { downloadPreview: 1 } },
      { returnOriginal: false }
    );
    res.status(200).json("download certificated successfully ...!");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};

const addedLogLatOnPsTable = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  try {
    await psModal.updateOne(
      { _id: new ObjectId(req.params.taskId) },
      {
        $set: {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          airtelSpped: req.body.airtelSpped,
          jioSpeed: req.body.jioSpeed,
          bsnlSpeed: req.body.bsnlSpeed,
          power: req.body.power,
        },
      }
    );
    res.status(200).json("download certificated successfully ...!");
  } catch (error) {
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};

export const uploadLongLatiSpeed = async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.taskId);
  const taskModal = getDb().db().collection("tasks");
  try {
    await taskModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          airtelSpped: req.body.airtelSpped,
          jioSpeed: req.body.jioSpeed,
          bsnlSpeed: req.body.bsnlSpeed,
          power: req.body.power,
        },
      }
    );
    addedLogLatOnPsTable(req, res);
    // res.status(200).json("download certificated successfully ...!");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};

export const fetchAllUserAvailable = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const user = await userModal
      .find(
        { state: "Assam" },
        {
          projection: {
            _id: 0,
            state: 1,
            district: 1,
            name: 1,
            phone: 1,
            email: 1,
            pinCode: 1,
            phonepe: 1,
            role: 1,
            fatherName: 1,
            motherName: 1,
            mandal: 1,
            address: 1,
            adharnumber: 1,
            dateOfRegister: 1,
            assembly: 1,
            bankname: 1,
            banknumber: 1,
            branchName: 1,
            IFSC: 1,
          },
        }
      )
      .toArray();
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};

export const allUserDataFromPDFFile = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const users = await userModal
      .find(
        {
          $and: [
            { state: req.params.state },
            { district: req.params.district },
            { assembly: req.params.assembly },
            { role: "3" },
          ],
        },
        {
          projection: {
            _id: 1,
            // state: 1,
            district: 1,
            name: 1,
            phone: 1,
            email: 1,
            pinCode: 1,
            address: 1,
            // phonepe: 1,
            // role: 1,
            fatherName: 1,
            motherName: 1,
            mandal: 1,
            addres: 1,
            adharnumber: 1,
            // dateOfRegister: 1,
            assembly: 1,

            voteridurl: 1,

            adharidurl: 1,
            profilePic: 1,
          },
        }
      )
      // .limit(2)

      .toArray();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      msg: "something went wrong please try again ....",
    });
  }
};
