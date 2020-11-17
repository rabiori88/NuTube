const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");
const Dislike = require('../models/DisLike');


//=================================
//             Like
//=================================




router.post("/upLike", (req, res) => {

    let variable = {}

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {videoId: req.body.commentId}
    }

   //like Collection에다가 클릭 정보를 넣어준다 

   const like = new Like(variable)

   like.save((err, likeReulst) => {
       if(err) return resjson({success : false, err })

       //만약에 Dislike이 이미 클릭이 되있다면, Dislike 1 줄여준다.

       DisLike.findByIdAndDelete(variable)
       .exec((err, disLikeResult ) => {
           if(err) return res.status(400).json({success : false, err})
           res.status(200).json({success: true})
       }) 
   })   

})

router.post("/upDisLike", (req, res) => {

    let variable = {}

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {videoId: req.body.commentId}
    }

   //like Collection에다가 클릭 정보를 넣어준다 

   const dislike = new DisLike(variable)

   dislike.save((err, likeReulst) => {
       if(err) return resjson({success : false, err })

       //만약에 Dislike이 이미 클릭이 되있다면, Dislike 1 줄여준다.

       Like.findByIdAndDelete(variable)
       .exec((err, LikeResult ) => {
           if(err) return res.status(400).json({success : false, err})
           res.status(200).json({success: true})
       }) 
   })   

})


router.post("/getLikes", (req, res) => {

    let variable = {}

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {videoId: req.body.commentId}
    }

   Like.find(variable)
   .exec((err, likes) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true, likes })
   })

})


router.post("/getDisLikes", (req, res) => {

    let variable = {}

    if(req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {videoId: req.body.commentId}
    }

   DisLike.find(variable)
   .exec((err, dislikes) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true, dislikes })
   })

})




module.exports = router;
