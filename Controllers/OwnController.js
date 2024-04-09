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

export const accessUserByPhone = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const user = await userModal.findOne({ phone: req.params.phone });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ msg: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const fetchOnlAssamPsData = async (req, res) => {
  // console.log("fgbhnjm,.");
  const psModal = getDb().db().collection("ps_details");
  try {
    const result = await psModal.find({ State: "Assam" }).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: error,
    });
  }
};

export const fetchPdfDataAssemblyDistrictWise = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const result = await userModal
      .find({
        $and: [
          {
            state: "Assam",
          },
          { assembly: req.params?.assembly },
          {
            district: req.params?.district,
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

//
//
//
// user signup data modifications write new apis

export const firstFetchDistrciUser = async (req, res) => {
  const userModal = getDb().db().collection("users");
  // console.log(req.params.district);
  try {
    const result = await userModal
      .find(
        {
          $and: [
            {
              state: "Assam",
            },
            {
              district: req.params.district,
            },
          ],
        },
        {
          projection: {
            _id: 0, // Exclude _id field
            name: 1, // Include name field
            phone: 1, // Include phone field
            district: 1,
            assembly: 1,
            state: 1,
            role: 1,
          },
        }
      )
      .toArray();
    console.log(result?.length);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const removeWhiteSPace = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    await userModal.updateMany(
      {
        district: req.params.district,
      }, // Match all documents in the users collection
      [
        {
          $set: {
            assembly: { $trim: { input: "$assembly" } }, // Trim leading and trailing whitespace from the name field
          },
        },
      ]
    );
    res.status(200).json("updated");
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const updatedAssemblyDistrictWise = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    await userModal.updateMany(
      {
        district: req.params.district,
      },
      {
        $set: {
          assembly: req.params.assembly,
        },
      }
    );
    res.status(200).json("updated");
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const updatedAssemblyByPhone = async (req, res) => {
  const userModal = getDb().db().collection("users");

  try {
    const result = userModal.findOne({ phone: req.params.phone });

    if (result) {
      await userModal.updateOne(
        { phone: req.params.phone },
        { $set: { assembly: req.params.assembly } }
      );
      res.status(200).json("updated");
    } else {
      res.status(401).json("user not found");
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const findUserSpecificDistrict = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    await userModal.updateMany(
      {
        $and: [
          {
            state: "Assam",
          },
          {
            district: req.params.district,
          },
        ],
      },
      {
        $set: { district: req.params.updated },
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const findUserSpecificDistrictUpdatedAssembly = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    await userModal.updateMany(
      {
        $and: [
          {
            state: "Assam",
          },
          {
            district: req.params.district,
          },
          {
            assembly: req.params.assembly,
          },
        ],
      },
      {
        $set: { assembly: req.params.updated },
      }
    );

    res.status(200).json("updated");

    // const result = await userModal
    //   .find(
    //     {
    //       $and: [
    //         {
    //           state: "Assam",
    //         },
    //         {
    //           district: req.params.district,
    //         },
    //         {
    //           assembly: req.params.assembly,
    //         },
    //       ],
    //     },
    //     {
    //       projection: {
    //         _id: 0, // Exclude _id field
    //         name: 1, // Include name field
    //         phone: 1, // Include phone field
    //         district: 1,
    //         assembly: 1,
    //         state: 1,
    //         role: 1,
    //       },
    //     }
    //   )
    //   .toArray();
    // console.log(result.length);
    // res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
//
//
//
//
//
//
//
//
//

//
//
//

export const ownNameUpdateDistrictValue = async (req, res) => {
  const userModal = getDb().db().collection("users");
  // console.log(req.params.district);
  try {
    // await userModal.updateMany(
    //   {
    //     $and: [
    //       {
    //         state: "Assam",
    //       },
    //       {
    //         district: req.params.district,
    //       },
    //     ],
    //   },
    //   {
    //     $set: { district: req.params.value },
    //   }
    // );

    // res.status(200).json("updated");

    const result = await userModal
      .find(
        {
          $and: [
            {
              state: "Assam",
            },
            {
              district: req.params.district,
            },
          ],
        },
        {
          projection: {
            _id: 0, // Exclude _id field
            name: 1, // Include name field
            phone: 1, // Include phone field
            district: 1,
            assembly: 1,
            state: 1,
            role: 1,
          },
        }
      )
      .toArray();
    console.log(result?.length);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const onMultipleRegistorFind = async (req, res) => {
  const userModal = getDb().db().collection("users");
  try {
    const multipleRegistrations = await userModal
      // .aggregate([
      //   {
      //     $group: {
      //       _id: "$phone", // Grouping by the unique identifier (e.g., email)
      //       count: { $sum: 1 }, // Counting the occurrences of each identifier
      //     },
      //   },
      //   {
      //     $match: {
      //       count: { $gt: 1 }, // Filtering to find identifiers with more than one occurrence
      //     },
      //   },
      // ])
      // .toArray();
      .aggregate([
        {
          $group: {
            _id: "$phone", // Grouping by the unique identifier (e.g., email)
            count: { $sum: 1 }, // Counting the occurrences of each identifier
            users: { $push: "$$ROOT" }, // Pushing the user details for each identifier
          },
        },
        {
          $match: {
            count: { $gt: 1 }, // Filtering to find identifiers with more than one occurrence
          },
        },
        {
          $project: {
            _id: 0,
            email: "$phone",
            count: 1,
            "users.name": 1,
            "users.phone": 1,
            "users.district": 1,
            "users.assembly": 1,
            "users.address": 1,
            "users.adharnumber": 1,
            // Add more fields as needed
          },
        },
      ])
      .toArray();
    // console.log(multipleRegistrations.length);
    res.json(multipleRegistrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
