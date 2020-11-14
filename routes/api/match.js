const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Match = require("../../models/Match");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

// const matchEventEmitter = Match.watch();

// @route   POST api/match
// @des     Create match request
// @access  Private

router.post(
  "/",
  [auth, [check("genderRequest", "Please choose a Gender").not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { genderRequest, userGender, room, name, avatar } = req.body;
    let genderSearch = null;
    // const genderRequest = gender === "female" ? "male" : "female";
    // console.log('req.body',req.body)

    try {
      const userInfo = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar"]);

      if (userGender === genderRequest) {
        genderSearch = await Match.find({
          userGender,
          genderRequest,
          available: true,
        });
      } else {
        genderSearch = await Match.find({
          userGender: userGender === "male" ? "female" : "male",
          genderRequest: genderRequest === "male" ? "female" : "male",
          available: true,
        });
      }


      // check user cant not send request more than one
      const findUserRequest = await Match.findOne({
        "user.id": req.user.id,
      }).select("available");

      if (findUserRequest && findUserRequest.available === true) {
        return res.json({ msg: "You have sent request already" });
      }

      // find prefect match to chat
      if (genderSearch.length !== 0) {
        const perfectMatch = genderSearch.find(
          (obj) => obj.location.label === userInfo.location.label
        );

        if (perfectMatch) {
          const newPerfectMatch = await Match.findOneAndUpdate(
            { _id: perfectMatch.id },
            {
              available: false,
              partner: {
                id: userInfo.user.id,
                name: userInfo.user.name,
                avatar: userInfo.user.avatar,
              },
            },
            { new: true }
          );

          return res.json(newPerfectMatch);
        }

        //if didn't find perfect match send first element in array
        const newPerfectMatch = await Match.findOneAndUpdate(
          { _id: genderSearch[0].id },
          {
            available: false,
            partner: {
              id: userInfo.user.id,
              name: userInfo.user.name,
              avatar: userInfo.user.avatar,
            },
          },
          { new: true }
        );

        return res.json(newPerfectMatch);
      }

      //Create

      const match = new Match({
        user: { id: req.user.id, name, avatar },
        genderRequest,
        location: userInfo.location,
        userGender,
        room,
      });

      // matchEventEmitter.on("change", (change) => {
      //   if (change.updateDescription) {
      //     // console.log(change.updateDescription.updatedFields.partner)
      //     console.log(change)
      //     res.json(change.updateDescription.updatedFields.partner);
      //   }
      // });
      await match.save();
      res.json({ room, msg: "Finding perfect match for you" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/match/getAvailableChat
// @des     get chat request if avalable is true
// @access  Private

router.post("/getAvailableChat", auth, async (req, res) => {
  try {
    const availableChat = await await Match.findOne({
      "user.id": req.user.id,
      available: true,
    });

    res.json(availableChat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/match/cancel
// @des     Update available request for chat
// @access  Private

router.post("/cancel", auth, async (req, res) => {
  try {
    await Match.findOneAndUpdate(
      { "user.id": { $in: req.user.id } },
      {
        available: false,
      },
      { new: true }
    );
    res.json({ canceled: true, msg: "You canceled the request" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
