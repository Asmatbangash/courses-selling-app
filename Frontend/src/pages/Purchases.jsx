import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios'
import { Sidebar } from "../components";

function Purchases() {
    const [courses, setCourses] = useState([])
    useEffect(()=>{
   const fetchCourses = async() =>{
     try {
    const response = await axios.get('http://localhost:4000/api/v1/course/get',{withCredentials:true});
    setCourses(response.data.getCourses)
  } catch (error) {
    console.error(error);
  }
   }
   fetchCourses()
},[])
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">📚 Purchase Courses</h1>
      <div className="flex flex-wrap">
        {courses.map((course, index) => (
                  <div key={index} className="px-3">
                    <Card className="w-85 mb-4 rounded-2xl shadow-md hover:shadow-xl transition">
                      <img
                        src={course.image.url}
                        alt={course.title}
                        className="h-40 w-full object-cover rounded-t-2xl"
                      />
        
                      <CardContent className="p-5 space-y-2">
                        <h3 className="font-semibold text-lg">
                          {course.title}
                        </h3>
                        <p className="text-primary font-bold">
                          {course.price}
                        </p>
                      </CardContent>
        
                      <CardFooter className="p-5 pt-0">
                        <Button className="w-full rounded-xl">
                          Enroll Now
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
      </div>
      </main>
    </div>
  );
}

export default Purchases;
