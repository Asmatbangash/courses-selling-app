import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

function Buy() {
  const { courseId } = useParams();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [course, setCourse] = useState([])
  const [clientSecrete, setClientSecrete] = useState('')
  const [cardError, setCardError] = useState()
  const navigate = useNavigate()

  const stripe = useStripe();
  const elements = useElements();
  
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token

  useEffect(()=>{
  const fetchBuyCourseData = async () =>{
     if (!token) {
      toast.error("Please login to continue");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/course/buy/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("buy course",response)
      setCourse(response.data.courseData)
      setClientSecrete(response.data.clientSecret)
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong!";
      setErrorMessage(msg);
      navigate("/purchased-courses")
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }
  fetchBuyCourseData()
  },[courseId])

  const handlePurchase = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("stripe or elements not found!")
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      console.log("card element not found!")
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setLoading(false)
      console.log('[stripe payment error]', error);
    } else {
      console.log('[PaymentMethod created]', paymentMethod);
    }
    if(!clientSecrete){
      console.log("client secrete not found!")
      setLoading(false)
      return
    }
    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
  clientSecrete,
  {
    payment_method: {
      card: card,
      billing_details: {
        name: user?.User?.FullName,
        email:user?.User?.email
      },
    },
  },
);
if(confirmError){
  console.log(confirmError)
  setCardError(confirmError.message)
}
else if(paymentIntent.status == "succeeded"){
  console.log("payment succeeded", paymentIntent)
  setCardError("your payemnt id", paymentIntent.id)
  const paymentInfo ={
    userId: user?.User?._id,
    email: user?.User?.email,
    courseId: courseId,
    paymentId: paymentIntent.id,
    amount: paymentIntent.amount,
    status: paymentIntent.status
  }
   const response = await axios.post(
       "http://localhost:4000/api/v1/payment",
        paymentInfo,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      ).then(() =>{console.log(response)}).catch((error ) =>{console.log("payment error", error)})
  toast.success("Payment successfully!")
  navigate("/purchased-courses")
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center mb-3">
          Purchase Course
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your card details to complete the purchase.
        </p>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}

        <div className="border p-4 rounded mb-4">
          <CardElement options={{ hidePostalCode: true }} />
        </div>

        <Button
          onClick={handlePurchase}
          disabled={loading || !stripe}
          className="w-full py-6 text-lg"
        >
          {loading ? "Processing..." : "Pay Now"}
        </Button>
<p className="text-xs text-red-500 text-center mt-4">
          {cardError}
        </p>
        <p className="text-xs text-gray-500 text-center mt-4">
          Secure payment • Instant access
        </p>
      </div>
    </div>
  );
}

export default Buy;
