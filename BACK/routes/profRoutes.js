var express = require('express');
let {setAsProf,removeProf,checkIfProf} = require('../controllers/profcontroller')

var router = express.Router();

router.post("/add/:id",setAsProf)
router.get("/check/:id",(req,res)=>{
    console.log('Your params.id: '+req.params.id)
    checkIfProf(req.params.id).then((response)=>{
        console.log("result: ")
        console.log(response)
        if(response==true)
        {
            res.send("true")
        }else{
            res.send("false")
        }
        
    })
})
router.delete("/delete/:id",removeProf)

module.exports = router;
