import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import { Link } from "react-router-dom";

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Previous"
      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10
                 bg-background shadow-lg rounded-full p-3
                 hover:bg-primary hover:text-white transition"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Next"
      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10
                 bg-background shadow-lg rounded-full p-3
                 hover:bg-primary hover:text-white transition"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}

function Home() {
  const [courses, setCourses] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,

    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: false,

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
        const response = await axios.get(
          "http://localhost:4000/api/v1/course/get",
          { withCredentials: true },
        );
        setCourses(response.data.getCourses);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />
      <section className="relative px-4 md:px-12 py-12">
        <div className="flex justify-center items-center flex-col pb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Learn Skills That Power Your Career
          </h2>
          <p className="mt-3 text-muted-foreground text-center max-w-2xl mx-auto">
            Explore industry-ready courses designed by experts to help you grow,
            upskill, and succeed in today’s competitive tech world.
          </p>

          <Link
            to="/courses"
            className="mt-4 flex rounded-xl px-6 bg-black text-white"
          >
            Explore Courses <ArrowRight className="ms-2" />
          </Link>
        </div>

        <Slider {...settings}>
          {courses.map((course) => (
            <div key={course.id} className="px-3">
              <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                <img
                  src={course.image.url}
                  alt={course.title}
                  className="h-40 w-full object-cover rounded-t-2xl"
                />

                <CardContent className="p-5 space-y-2">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-primary font-bold">{course.price}</p>
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
        </Slider>
      </section>
      <Footer />
    </>
  );
}

export default Home;
