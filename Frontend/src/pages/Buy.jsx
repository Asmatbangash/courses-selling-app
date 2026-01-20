import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Buy() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePurchase = async () => {
    const token = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      toast.error("Please login to continue");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:4000/api/v1/course/buy/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message);
      navigate("/purchased-courses");
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Something went wrong!";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center mb-3">
          Purchase Course
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Click below to complete your purchase securely.
        </p>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}

        <Button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full py-6 text-lg"
        >
          {loading ? "Processing..." : "Buy Now"}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure payment • Instant access
        </p>
      </div>
    </div>
  );
}

export default Buy;
