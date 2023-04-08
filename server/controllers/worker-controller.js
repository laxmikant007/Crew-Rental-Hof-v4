
import Worker from "../model/worker-schema.js";
import Jwt  from "jsonwebtoken";


const jwtKey="crew-rental";
const url="http://localhost:8000"


export const workerRegister= async(req, res)=>{ 
    try{
        console.log("Worker Data front end is ", req.body);
         const newWorker=new Worker(req.body);
         await newWorker.save()  

         console.log("new Worker is ", newWorker);
         
         Jwt.sign({newWorker},jwtKey,{expiresIn:"5h"},(err,token)=>{
            return res.status(200).json({newWorker,auth:token});
         })
    }
    catch(error){
        console.log("error while worker register ", error.message);
        res.status(500).json({message:error.message});
    }
}
export const getAllWorkers=async(req, res)=>{
      console.log("get all worker is called")
      try{
        const result=await Worker.find();
            // console.log("Data from workers table are ", result);
        res.status(200).json(result);
        //   res.send(result);
      }
      catch(error){
        console.log("Error while getting all workes  from db ", error.message);
        res.status(500).json({message:error.message});
      }
}


export const getWorker=async(req,res)=>{
   try{
    const user= await Worker.findOne({email:req.params.Id})
    console.log("user is ",user);
    res.status(200).json(user);

   }
   catch(error){
    console.log("error while getting user data ", error.message);
    res.status(500).json({error:error.message});
   }
}













