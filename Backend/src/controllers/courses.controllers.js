import { coursesdb } from "../models/courses.model.js"

// create course
const createCourse = async (req,res) => {
   try {
      const {title, description, price, image } = req.body
      if(!title || !description || !price || !image) {
         return res.status(400).json({errors: "All feild are require"})
      }
 
     const courseData = {
         title, 
         description,
         price,
         image
     }
 
    const course =  await coursesdb.create(courseData)
    res.status(200).json({message: "course create successfully", course})
   } catch (error) {
     console.log(error)
   }
}

// get all course
const getAllCourse = async(req, res) =>{
    try {
        const getCourses = await coursesdb.find()
        res.status(200).json({message:"all courses get succesfully!", getCourses})
    } catch (error) {
        console.log(error)
    }
}


export {
    createCourse,
    getAllCourse
}