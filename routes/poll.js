const express = require('express');
const router = express.Router();

const Pusher = require('pusher')

const keys = require('../config/keys');

const pusher = new Pusher({
    appId: keys.appId,
    key: keys.key,
    secret: keys.secret,
    cluster: keys.cluster,
    useTLS: true
  });

router.get(
    '/', (req, res) => {
        res.send('poll')
    }
)
router.post(
    '/', (req, res) => {
        pusher.trigger("os-poll", "os-vote", {
            // message: "hello world"
            points: 1,
            os :req.body.os
          });
          return res.json({success: true,message:'thank you for voting'});
    }
)
module.exports = router;