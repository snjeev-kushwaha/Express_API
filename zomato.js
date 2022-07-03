const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const app = express()
app.use(express.json());
app.use(cors());
const port = 4000;
var con = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: '',
     database: "zomato"
})
con.connect((err) => {
   if(err){
    console.log(err.sqlMessage)
   }else{
    console.log("MYSQL connected")
   }
})
app.get("/hotallist", (req,res)=>{
    const q1 = "select  * from hotal"
    con.query(q1, (err,result) => {
     if(err){
        res.send(err.sqlMessage)
     }else{
        res.json({"response":result})
     }
})
})
app.post("/hotalregistration", (req,res) => {
    const data = {
        h_id:req.body.h_id,
        h_name:req.body.h_name,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        pin:req.body.pin,
        howner:req.body.howner,
        contact:req.body.contact,
        type:req.body.type
    }
    const quer = "insert into hotal SET ?"
    con.query(quer,data, (err,result) => {
      if(err){
        res.send(err.sqlMessage)
      }else{
        res.json("Inserted data")
      }
    })
})

//put/patch method

app.put("/hupdate/:h_id", (req,res) => {
  // const id = req.params.id
  const data1 = [req.body, req.params.h_id]

  const q2 = "UPDATE hotal SET ? WHERE h_id = ?"

  con.query(q2,data1, (err,result) => {
    if(err){
    res.send(err.sqlMessage)
    }else{
      res.json({status: 200,"response":result})}
  })
})

//Delete method
app.delete("/hdelete/:h_id", (req,res) => {
  const id = req.params.h_id
const q3 = "delete from hotal where h_id= ?"
con.query(q3,id, (err,result) => {
  if(err){
    res.send(err.sqlMessage)
  }else{
    res.json({status:200, "response":result})
  }
})
})

//munulist for get method

app.get("/menulist", (req,res)=>{
    const q1 = "select  * from menu"
    con.query(q1, (err,result) => {
     if(err){
        res.send(err.sqlMessage)
     }else{
        res.json({"response":result})
     }
})
})

//munuitem for post method

app.post("/menuitem", (req,res) => {
    const data = {
        m_id:req.body.m_id,
        item:req.body.item,
        price:req.body.price,
        tag:req.body.tag,
        avl_option:req.body.avl_option,
        h_id:req.body.h_id
    }
    const quer = "insert into menu SET ?"
    con.query(quer,data, (err,result) => {
      if(err){
        res.send(err.sqlMessage)
      }else{
        res.json("Inserted data")
      }
    })
})

//put and patch method in menu item

app.put("/mupdate/:m_id", (req,res) => {
  // const id = req.params.id
  const data1 = [req.body, req.params.m_id]

  const q2 = "update menu SET ? where m_id = ?"

  con.query(q2, data1, (err,result) => {
    if(err){
    res.send(err.sqlMessage)
    }else{
      res.json({status: 200,"response":result})}
  })
})

//delete method in menu 

app.delete("/mdelete/:m_id", (req,res) => {
  const id = req.params.m_id
const q3 = "delete from menu where m_id= ?"
con.query(q3,id, (err,result) => {
  if(err){
    res.send(err.sqlMessage)
  }else{
    res.json({status:200, "response":result})
  }
})
})

app.listen(port,() => {
    console.log("server started at http://localhost:4000")
})