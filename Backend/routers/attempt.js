const express = require('express');
const router = express.Router();

// Importing User Responses
const User = require('../models/user-model')

// Importing Questions 
const Easy = require('../models/easy-questions')
const Moderate = require('../models/moderate-questions')
const Difficult = require('../models/difficult-questions')

// Importing All The Middlewares 
const adminauth = require('../middleware/admin-auth')
const auth = require('../middleware/auth')
const sudoauth = require('../middleware/sudo-auth')

// Route For Generating Questions Ids 
router.post('/generatequestions', auth, async(req, res) => {
    try{
        const user = await User.findById(req.user._id)
        const {domain} = req.body
        if (!user.domain.includes(domain))
            res.send(`Sorry, You Havent Been Enrolled into ${domain}. Please Select The Domain `)
        else {
            const easyQs = await Easy.find({domain})
            const moderateQs = await Moderate.find({domain})
            const hardQs = await Difficult.find({domain})
            let idsEasy = []
            let idsModerate = []
            let idsDifficult = []
            easyQs.forEach(Q =>{idsEasy.push(Q._id)})
            moderateQs.forEach(Q => idsModerate.push(Q._id))
            hardQs.forEach(Q => idsDifficult.push(Q._id))

            // Putting Constraints For Each Questions 
            // Easy = Easy/2 ,
            // Moderate = Moderate/3 
            // Difficult = Difficult/5 

            let initLengthEasy = idsEasy.length 
            let initLengthModerate = idsModerate.length
            let initLengthDifficult = idsDifficult.length

            var easyTemp = {easyIds:[], moderateIds:[], difficultIds:[]}
            
            for (let index = 0 ; index < initLengthEasy/2 ; index++ ){
                let randNum = Math.floor(Math.random()*idsEasy.length)
                easyTemp.easyIds.push(idsEasy[randNum])
                idsEasy.splice(randNum,1)
            }
            for (let index = 0 ; index < initLengthModerate/3 ; index++ ){
                let randNum = Math.floor(Math.random()*idsModerate.length)
                easyTemp.moderateIds.push(idsModerate[randNum])
                idsModerate.splice(randNum,1)
            }
            for (let index = 0 ; index < initLengthDifficult/2 ; index++ ){
                let randNum = Math.floor(Math.random()*idsDifficult.length)
                
                easyTemp.difficultIds.push(idsDifficult[randNum])
                idsDifficult.splice(randNum,1)
            }
            // console.log(user)
            // console.log(easyTemp)
            user.questionsIds = [] 
            user.questionsIds.push(easyTemp)
            console.log(user.questionsIds)
            await user.save();
            res.send(user)
        }
    }catch(e){
        console.log(e);
        res.send(e);
    }
        
})

// Route For Displaying Questions 
router.get('/questionsall', auth, async (req, res) => {
    
    try {
        const user = await User.findById(req.user._id);
        await user.populate('questionsIds.easyIds').populate('questionsIds.moderateIds').populate('questionsIds.difficultIds').execPopulate()
        res.send(user)
    }catch (e){
        console.log(e);
        res.send(e);
    }
})

// Route For Posting Answers to an Id --> Not Adding For Updation 
router.post('/answerid', auth, async (req, res) => {
    const {questionid, answer} = req.body 
    try {
        const iseasy = await Easy.findById(questionid)
        const ismoderate = await Moderate.findById(questionid)
        const isdifficult = await Difficult.findById(questionid)
        const user = await User.findById(req.user._id)

        if (!iseasy && !ismoderate && !isdifficult){
            res.send(`Sorry No Record Found , Please Check the Id `)
            console.log(`Sorry No Record Found , Please Check the Id`)
        }

        if (iseasy){
            var template = {
                id: iseasy._id,
                answer: answer
            }
            user.easyresponses.push(template)    
        }
        if (ismoderate){
            var template = {
                id: ismoderate._id,
                answer: answer
            }
            user.moderateresponses.push(template)    
        }
        if (isdifficult){
            var template = {
                id: isdifficult._id,
                answer: answer
            }
            user.difficultresponses.push(template)    
        }
        await user.save()
        res.send(user)
        console.log(iseasy, ismoderate, isdifficult)
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})

module.exports = router ;






































/*
// Route Generating The Questions Ids Needed 
// Route Displaying the Ids For an User 
// Route For Storing The Response To an Id for an User

// console.log(randNum)
                // console.log(idsEasy[randNum])
                // user.questionsIds.easyIds.push(idsEasy[randNum])

            // res.send(idsEasy + '\n' + idsModerate + '\n' + idsDifficult )

router.post('/temproute/:id', async (req, res) => {
    var id = req.params.id
    
    try {
        const username = await User.findById(id);
        const template = {easyIds: ['5f3923908cc1c1d5d1ee557f'], moderateIds:['5f392af88cc1c1d5d1ee5584'], difficultIds: ['5f392cc68cc1c1d5d1ee558a']}
        // console.log(template)
        // username.questionsIds.push(template)
        await username.populate('questionsIds.easyIds').populate('questionsIds.moderateIds').populate('questionsIds.difficultIds').execPopulate()
        // await username.save();
        // username.questionsIds.forEach(question => console.log(question))
        var temp = {id : '5f3923908cc1c1d5d1ee557f', answer : 'Hello World '}
        username.responses.push(temp);
        await username.populate('responses.id').execPopulate() 
        console.log(username.responses)
        res.send(username) 
    } catch (e) {
        console.log(e);
        res.send(e);
    } 
})




// const template = {easyIds: [ideasy, ideasy2], easyanswers: 'Hello World'}
        // username.responses.push(template)
        // let check = await username.populate('responses.easyIds').execPopulate() 
        // // console.log(username.responses)
        // username.responses.forEach(response => console.log(response))
        // // await username.save()
*/