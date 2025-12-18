const express = require("express");
const app = express();
const router = express.Router();

router.get('/' ,(req,res) => {
    res.send("This is the user root route")
})

router.post('/' ,(req,res) => {
    res.send("This is the user root route with post request")
})

router.get('/:id' ,(req,res) => {
    res.send("This is the id routet")
})

router.post('/:id' ,(req,res) => {
    res.send("This is the id route with post request")
})

router.delete('/:id' ,(req,res) => {
    res.send("This is the user delete route")
})

module.exports = router;