var express = require('express');
let {getQuestions,getQuestion,addQuestion,updateQuestion,getQuestionsAnswers,deleteQuestion} = require('../controllers/questioncontroller')

var router = express.Router();
/* GET users listing. */
router.get('/getQuestion/:id',getQuestion);
router.post('/getQuestionsAnswers/',getQuestionsAnswers); // exactly like getQuestion, don't worry about it

router.get('/',getQuestions);
router.post('/',addQuestion);
router.put('/:id',updateQuestion);
router.delete('/:id',deleteQuestion);

module.exports = router;
