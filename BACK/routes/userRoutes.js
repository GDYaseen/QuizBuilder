var express = require('express');
let {getUsers,getUser,addUser,updateUser,editUser,deleteUser,rememberSession,logout} = require('../controllers/usercontroller')

var router = express.Router();
/* GET users listing. */
router.get('/editUser/:id',editUser);

router.post('/find',getUser);
router.get('/',getUsers);
router.delete('/:id',deleteUser);
router.post('/',addUser);
router.put('/:id',updateUser);
router.get('/remember',rememberSession);
router.post('/logout',logout)


module.exports = router;
