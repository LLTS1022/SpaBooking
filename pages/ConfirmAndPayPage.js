import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from "../styles/ConfirmAndPay.module.css";

export default function ConfirmAndPayPage() {
  const router = useRouter();
  const { name, image, images, date, time, callType, price } = router.query;
  const [isProcessing, setIsProcessing] = useState(false);

  // Resolve main image from ?image OR ?images
  const mainImage = useMemo(() => {
    if (!router.isReady) return "/images/default.jpg";

    let candidate = image;

    // Support ?images=[...] or ?images=a,b,c
    if (!candidate && images) {
      try {
        const parsed = JSON.parse(String(images));
        if (Array.isArray(parsed) && parsed.length) candidate = parsed[0];
      } catch {
        const list = String(images)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        if (list.length) candidate = list[0];
      }
    }

    try {
      return candidate
        ? decodeURIComponent(String(candidate))
        : "/images/default.jpg";
    } catch {
      return typeof candidate === "string" && candidate
        ? candidate
        : "/images/default.jpg";
    }
  }, [router.isReady, image, images]);

  const paypalOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (_data, actions) => {
    if (!price || isNaN(parseFloat(String(price)))) {
      console.error("Invalid price:", price);
      alert("Invalid price. Please go back and select a valid service.");
      throw new Error("Invalid price");
    }
    const formattedPrice = parseFloat(String(price)).toFixed(2);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: formattedPrice,
            currency_code: "USD",
          },
        },
      ],
    });
  };

  const onApprove = async (_data, actions) => {
    setIsProcessing(true);
    try {
      const details = await actions.order.capture();
      alert(
        "Payment successful! Transaction completed by " +
          details.payer.name.given_name
      );
      router.push("/");
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className={styles.confirmPage}>
        <div className={styles.paymentSection}>
          <h2>Confirm and pay</h2>

          <div className={styles.cardForm}>
            <h4>1. Choose when to pay</h4>
            <div className={styles.cardBox}>Pay ${price} now</div>

            <h4>2. Pay with PayPal</h4>
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              style={{ layout: "vertical" }}
            />
            {isProcessing && <p>Processing payment...</p>}
          </div>
        </div>

        <div className={styles.summarySection}>
          <img
            src={mainImage}
            alt={name || "Model"}
            className={styles.profilePic}
          />

          <p>
            <strong>Model:</strong> {name}
          </p>
          <p>
            <strong>Date:</strong> {date}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
          <p>
            <strong>Call Type:</strong> {callType}
          </p>
          <p className={styles.totalAmount}>Total: ${price}</p>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}
