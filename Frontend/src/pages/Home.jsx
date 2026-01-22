import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import { Link } from "react-router-dom";

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute -left-5 top-1/2 -translate-y-1/2 z-10
      bg-white/80 backdrop-blur-md shadow-md rounded-full p-3
      hover:bg-black hover:text-white transition"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-5 top-1/2 -translate-y-1/2 z-10
      bg-white/80 backdrop-blur-md shadow-md rounded-full p-3
      hover:bg-black hover:text-white transition"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}

function CourseSkeleton() {
  return (
    <div className="px-3">
      <div className="rounded-2xl bg-white shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-300" />
        <div className="p-5 space-y-3">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-10 bg-gray-300 rounded mt-4" />
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/course/get",
          { withCredentials: true }
        );
        setCourses(res.data.getCourses);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />

      <section className="px-4 md:px-12 py-14 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Learn Skills That Power Your Career
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Explore industry-ready courses designed by experts to grow your
            skills and career.
          </p>

          <Link
            to="/courses"
            className="inline-flex items-center mt-5 px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
          >
            Explore Courses <ArrowRight className="ml-2 w-4" />
          </Link>
        </div>

        <Slider {...settings}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <CourseSkeleton key={i} />
              ))
            : courses.map((course) => (
                <div key={course._id} className="px-3">
                  <Card className="group overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition bg-white">
                    <div className="relative overflow-hidden">
                      <img
                        src={course?.image?.url}
                        alt={course.title}
                        className="h-48 w-full object-cover group-hover:scale-105 transition"
                      />

                      <span className="absolute top-3 right-3 bg-black text-white text-sm px-3 py-1 rounded-full">
                        ${course.price}
                      </span>
                    </div>

                    <CardContent className="p-5 space-y-3">
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-2">
                        {course.description}
                      </p>

                      <Link
                        to={`/buy/${course._id}`}
                        className="block text-center mt-4 rounded-lg bg-black text-white py-2 hover:bg-gray-800 transition"
                      >
                        Buy Now →
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
        </Slider>
      </section>

      <Footer />
    </>
  );
}

export default Home;
