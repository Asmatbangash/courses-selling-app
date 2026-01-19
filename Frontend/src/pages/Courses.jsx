import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import axios from "axios";
import { Sidebar } from "../components";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/course/get",
          { withCredentials: true }
        );
        setCourses(response.data.getCourses);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">📚 Courses</h1>

        {loading && (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        )}

        <div className="flex flex-wrap">
          {!loading &&
            courses.map((course, index) => (
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
                    <Link
                      to={`/buy/${course._id}`}
                      className="rounded-md bg-black py-2 px-4 text-white"
                    >
                      Buy Now
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default Courses;
