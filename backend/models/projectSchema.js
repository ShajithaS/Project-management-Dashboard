const mdb=require("mongoose")
const taskSchema=new mdb.Schema({
    title:String,
    status:String,
    assignedTo:String
});

const projectSchema=new mdb.Schema({
    title:String,
    description:String,
    status:String,
    deadline:Date,
    tasks:[taskSchema]
})

const Project=mdb.model("project",projectSchema)
module.exports=Project;