import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "../components";
import { Card, CardContent } from "@/components/ui/card";

function Purchases() {
  const [purchased, setPurchased] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPurchased = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        setErrorMessage("Please login to view purchased courses.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/user/purchaseCourses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setPurchased(res.data.courseData);
      } catch (error) {
        setErrorMessage("Failed to load purchased courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchased();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            📚 My Purchased Courses
          </h1>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && errorMessage && (
          <div className="text-center text-red-500 mt-20">
            {errorMessage}
          </div>
        )}

        {!loading && !errorMessage && purchased.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-24 text-center">
            <img
              src="https://illustrations.popsy.co/gray/shopping.svg"
              className="w-60 mb-6"
              alt="No Data"
            />
            <h2 className="text-xl font-semibold">
              No courses purchased yet
            </h2>
            <p className="text-gray-500 mt-2">
              Explore courses and start learning today 🚀
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading &&
            purchased.map((course) => (
              <Card
                key={course._id}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={course.image?.url}
                    alt={course.title}
                    className="h-44 w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
                    Purchased
                  </span>
                </div>

                <CardContent className="p-5 space-y-3">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {course.desc}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-primary font-bold text-lg">
                      ${course.price}
                    </span>

                    <button className="text-sm font-medium text-primary hover:underline">
                      View Course →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>
    </div>
  );
}

export default Purchases;
