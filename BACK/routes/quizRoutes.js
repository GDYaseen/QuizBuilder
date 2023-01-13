var express = require('express');
let {getQuizs,getQuiz,addQuiz,updateQuiz,editQuiz,deleteQuiz,getQuizesWithNames} = require('../controllers/quizcontroller')

var router = express.Router();
/* GET users listing. */
router.put('/editQuiz/:id',editQuiz);

router.get('/',getQuizs);
router.get('/quiz/:id',getQuiz);
router.post('/quiz',addQuiz);
router.put('/quiz/:id',updateQuiz);
router.delete('/quiz/:id',deleteQuiz);
router.get('/results/:id',getQuizesWithNames)

module.exports = router;
