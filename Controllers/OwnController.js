import { getDb } from "../Database/mongoDb.js";

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export const onGetAllStatepsDetails = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  // console.log("cvbnm,.");
  try {
    const result = await psModal.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const deleteSpecificStateAndDistrictPSs = async (req, res) => {
  const psModal = getDb().db().collection("ps_details");
  try {
    await psModal.deleteMany({
      State: req.params.state,
      District: req.params.district,
    });
    res.status(200).json({ msg: "Records Deleted ....!" });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const onChangeRole = async (req, res) => {
  const userModal = getDb().db().collection("users");

  try {
    const user = await userModal.findOne({ phone: req.params.phone });
    if (user) {
      try {
        await userModal.updateOne(
          {
            phone: req.params.phone,
          },
          { $set: { role: req.body.role } }
        );
        res.status(200).json({ msg: "Role Updated ...!" });
      } catch (error) {
        return res.status(500).json({
          msg: error,
        });
      }
    } else {
      res.status(401).json({ msg: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
