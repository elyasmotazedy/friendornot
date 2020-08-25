const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Match = require("../../models/Match");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

// @route   POST api/match
// @des     Create match request
// @access  Private

router.post(
  "/",
  [auth, [check("gender", "Please choose a Gender").not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { gender, room, name , avatar } = req.body;
    const genderRequest = gender === "female" ? "male" : "female";

    try {
      const userInfo = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name", "avatar"]);
      const genderSearch = await Match.find({ gender: genderRequest , available : true});
      const findUserRequest = await Match.findOne({ 'user.id': req.user.id }).select(
        "available"
      );
      // check user cant not send request more than one
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
        user: {id:req.user.id, name, avatar} ,
        gender,
        location: userInfo.location,
        room,
      });
      await match.save();
      res.json({ room, msg: "Finding perfect match for you"});
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/match
// @des     Delete request for chat
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    await Match.findOneAndRemove({ user: req.user.id });

    res.json({ msg: "You canceled the request" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
