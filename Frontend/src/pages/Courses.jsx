import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "../components";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/course/get",
          { withCredentials: true }
        );
        setCourses(res.data.getCourses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">📚 Explore Courses</h1>
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        )}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course._id}
                className="group overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition duration-300 bg-white"
              >
                <div className="relative">
                  <img
                    src={course?.image?.url || "/placeholder.jpg"}
                    alt={course.title}
                    className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  <span className="absolute top-3 right-3 bg-black text-white text-sm px-3 py-1 rounded-full">
                    ${course.price}
                  </span>
                </div>

                <CardContent className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {course.description}
                  </p>

                  <Link
                    to={`/buy/${course._id}`}
                    className="block text-center mt-4 rounded-lg bg-black text-white py-2 font-medium hover:bg-gray-800 transition"
                  >
                    Buy Now →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {!loading && courses.length === 0 && (
          <p className="text-center text-gray-500 mt-20">
            No courses available yet.
          </p>
        )}
      </main>
    </div>
  );
}

export default Courses;
