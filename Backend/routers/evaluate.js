const express = require('express')
const router = express.Router();

// Importing All The Necessary Models
const User = require('../models/user-model')
const Easy = require('../models/easy-questions')
const Moderate = require ('../models/moderate-questions')
const Difficult = require('../models/difficult-questions')
const EvaluationRank = require('../models/rank-result')

// Route For Getting All The Students IDs with Responses 
// Route For Posting Marks 
// Route For Showing The Rank List of Student For Particular domain 

// Route For Getting All The Student Responses with Ids --> Auth for Admins Only 
router.get('/getresponses/:id', async (req, res) => {
    var id = req.params.id // User
    try {
        const user = await User.findById(id);
        await user.populate('easyresponses.id').populate('moderateresponses.id').populate('difficultresponses.id').execPopulate();
        res.send(user);
    }catch (e){
        console.log(e);
        res.send(e);
    }
})

// Route For Posting Marks To The Student Response , Can Be Used For Updation As well 
router.post('/postmarks/:id', async (req, res) => {
    var id = req.params.id ;
    const {questionid ,marks} = req.body 
    try {
        const user = await User.findById(id);
        const iseasy = await Easy.findById(questionid)
        const ismoderate = await Moderate.findById(questionid)
        const isdifficult = await Difficult.findById(questionid)
        if (!iseasy && !ismoderate && !isdifficult){
            res.send(`Sorry No Record Found , Please Check the Id `)
            console.log(`Sorry No Record Found , Please Check the Id`)
        }

        if (iseasy){
            // await user.updateOne({"easyresponses.id": questionid}, {$set: {"marks": marks}})
            // console.log(user.easyresponses)
            user.easyresponses.forEach((stack) => {
                if (stack.id == questionid){
                    stack.marks = marks ;
                    user.totalMarks += parseInt(marks) ;
                }
            })
        }
        if (ismoderate){
            // await user.updateOne({"easyresponses.id": questionid}, {$set: {"marks": marks}})
            // console.log(user.easyresponses)
            user.moderateresponses.forEach((stack) => {
                if (stack.id == questionid){
                    stack.marks = marks ;
                    user.totalMarks += parseInt(marks) ;
                }
            })
        }
        if (isdifficult){
            // await user.updateOne({"easyresponses.id": questionid}, {$set: {"marks": marks}})
            // console.log(user.easyresponses)
            user.difficultresponses.forEach((stack) => {
                if (stack.id == questionid){
                    stack.marks = marks ;
                    user.totalMarks += parseInt(marks) ;
                }
            })
        }
        await user.save();
        res.send(user);
    } catch (e){
        console.log(e);
        res.send(e);
    }
})

// Function For Sorting The Array Of Objects 
function compare (a, b) {
    const bandA = a.totalMarks;
    const bandB = b.totalMarks;
  
    let comparison = 0;
    if (bandA < bandB) {
      comparison = 1;
    } else if (bandA > bandB) {
      comparison = -1;
    }
    return comparison;
}
  


// Route For Getting The Ranks Being Alloted As Per Marks 
router.get('/ranklist', async (req, res) => {
    // console.log(req.user);
    try {
        const alluser = await User.find({})
        alluser.sort(compare)
        var rankiteration = 1 ;
        var ranklist;
        alluser.forEach(async (user) => {
            console.log(user.totalMarks)
            ranklist = new EvaluationRank({name:user.name, email: user.email, contact: user.contact, marks: user.marks, rank: rankiteration})
            rankiteration += 1
            await ranklist.save();
        })
        res.send(ranklist)
    } catch (e) {
        console.log(e);
        res.send(e);
    }
    
})


module.exports = router ;