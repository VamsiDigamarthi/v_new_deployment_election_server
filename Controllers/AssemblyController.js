import { getDb } from "../Database/mongoDb.js";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
export const asslPsData = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  try {
    const result = await psModal.find({ assemblyId: req.params.id }).toArray();

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const allUserAssemblyWise = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const result = await userModal
      .find({
        $and: [
          { state: req.params.state },
          {
            district: req.params.district,
          },
          {
            assembly: req.params.assembly,
          },
          {
            role: "3",
          },
          { score: { $gte: 8 } },
        ],
      })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const userTableUpdate = async (req, res) => {
  const userModal = getDb().db().collection("users");
  // console.log(req.params.id);
  try {
    await userModal.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          assign_task: "yes",
        },
      }
    );
    // console.log("third");
    res.status(200).json("task added successfully..!");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: error,
    });
  }
};

const updateUserTaskAddedToPsDetails = async (req, res) => {
  // console.log(req.params.name);
  // console.log(req.params.phone);
  let ids = [];
  for (let i of req.body["array"]) {
    ids.push(i?._id);
  }
  // console.log(ids);
  const psModal = getDb().db().collection("ps_details");
  try {
    await psModal.updateMany(
      {
        _id: { $in: ids.map((id) => new ObjectId(id)) },
      },
      {
        $set: {
          assign: "yes",
          eassign: "yes",
          name: req.params.name,
          phone: req.params.phone,
          user_id: req.params.id,
          bankname: req.params.bankname,
          banknumber: req.params.banknumber,
          ifsc: req.params.ifsc,
        },
      }
    );
    // console.log("second");
    userTableUpdate(req, res);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
export const assignAllTaskToUser = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  var values = [];
  for (let i of req.body["array"]) {
    values.push({
      PS_name: i.PS_Name_and_Address,
      AC_name: i.AC_Name,
      PS_No: i.PS_No,
      AC_No: i.AC_No,
      district: i.District,
      //  mandal: i.Mandal,
      //  location: i.Location,
      kit_start: "",
      kit_end: "",
      InstallationCertificate: "",
      CompletedCertificate: "",
      installationImage: "",
      rejected_dist_assign_new_user: "no",
      action: "initiated",
      user_id: req.params.id,
      task_id: i._id,
    });
  }

  try {
    await taskModal.insertMany(values);
    // console.log("first");
    updateUserTaskAddedToPsDetails(req, res);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const onFetchAllRejectedTask = async (req, res) => {
  const taskModal = getDb().db().collection("ps_details");
  try {
    const result = await taskModal
      .find({
        $and: [
          {
            AC_Name: req.params.assembly,
          },
          {
            eassign: "rejected",
          },
          {
            State: req.params.state,
          },
        ],
      })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const onFetchNotAssingUser = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const result = await userModal
      .find({
        $and: [
          { state: req.params.state },
          {
            district: req.params.district,
          },
          {
            assembly: req.params.assembly,
          },
          {
            role: "3",
          },
          { score: { $gte: 8 } },
          {
            assign_task: "no",
          },
        ],
      })
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const onUpdatedRejectedPsEassign = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  let ids = [];
  for (let i of req.body["array"]) {
    ids.push(i?._id);
  }
  try {
    await psModal.updateMany(
      {
        _id: { $in: ids.map((id) => new ObjectId(id)) },
      },
      {
        $set: {
          // assign: "yes",
          eassign: "yes",
          name: req.params.name,
          phone: req.params.phone,
          bankname: req.params.bankname,
          banknumber: req.params.banknumber,
          ifsc: req.params.ifsc,
        },
      }
    );
    // console.log("second");
    //  userTableUpdate(req, res);
    userTableUpdate(req, res);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const updatedOldTaskDistrictAssign = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  // console.log(req.body["signleRejectedTask"][0]?.location);
  try {
    await taskModal.updateMany(
      {
        user_id: req.body["array"][0]?.user_id,
      },
      { $set: { rejected_dist_assign_new_user: "yes" } }
    );
    onUpdatedRejectedPsEassign(req, res);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const onAssignRejectedTask = async (req, res) => {
  const taskModal = getDb().db().collection("tasks");
  var values = [];
  for (let i of req.body["array"]) {
    values.push({
      PS_name: i.PS_Name_and_Address,
      AC_name: i.AC_Name,
      PS_No: i.PS_No,
      AC_No: i.AC_No,
      district: i.District,
      //  mandal: i.Mandal,
      //  location: i.Location,
      kit_start: "",
      kit_end: "",
      InstallationCertificate: "",
      CompletedCertificate: "",
      installationImage: "",
      rejected_dist_assign_new_user: "no",
      action: "initiated",
      user_id: req.params.id,
      task_id: i._id,
    });
  }
  try {
    await taskModal.insertMany(values);
    updatedOldTaskDistrictAssign(req, res);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
