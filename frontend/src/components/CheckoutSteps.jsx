import { Breadcrumbs } from "@mantine/core";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CheckoutSteps = ({ step1, step2, step3, step4 , active1 ,active2 , active3 , active4}) => {
  return (
    <Breadcrumbs separator="→" separatorMargin="md" className="flex items-center justify-center ">
      {step1 && (
        <Link
          to="/"
          className={`text-blue-500 hover:underline text-lg font-Courier ${active1 && "font-semibold"} `}
        >
          Login
        </Link>
      )}
      {step2 && (
        <Link
          to="/shipping"
          className={`text-blue-500 hover:underline text-lg font-Courier ${active2 && "font-semibold"} `}
        >
          Shipping
        </Link>
      )}
      {step3 && (
        <Link
          to="/payment"
          className={`text-blue-500 hover:underline text-lg font-Courier ${active3 && "font-semibold"} `}
        >
          Payment
        </Link>
      )}
      {step4 && (
        <Link
          to="/placeorder"
          className={`text-blue-500 hover:underline text-lg font-Courier ${active4 && "font-semibold"} `}
        >
          Place Order
        </Link>
      )}
    </Breadcrumbs>
  );
};

export default CheckoutSteps;
