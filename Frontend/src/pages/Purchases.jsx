import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Sidebar } from "../components";

function Purchases() {
  const [purchased, setPurchased] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
        console.log(res)
        setPurchased(res.data.courseData || []);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to load purchased courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchased();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">📚 Purchased Courses</h1>

        {loading && (
          <div className="flex justify-center items-center h-60">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        {!loading && !errorMessage && purchased.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl font-semibold">No purchases yet 😕</p>
            <p className="text-sm mt-2">
              Buy a course to see it here.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {!loading &&
            purchased.map((course, index) => (
              <Card
                key={index}
                className="rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <img
                  src={course.image?.url}
                  alt={course.title}
                  className="h-40 w-full object-cover rounded-t-2xl"
                />

                <CardContent className="p-5 space-y-2">
                  <h3 className="font-semibold text-lg">
                    {course.title}
                  </h3>
                  <p className="text-primary font-bold">
                    Rs. {course.price}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      </main>
    </div>
  );
}

export default Purchases;
