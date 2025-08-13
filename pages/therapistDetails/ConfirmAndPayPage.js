// pages/therapistDetails/book.js
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/ConfirmAndPay.module.css'; // make sure this path is correct

export default function ConfirmAndPayPage() {
  const router = useRouter();
  const { name, image, date, time, callType, price } = router.query;
  console.log("Test", image);

  return (
    <div className={styles.confirmPage}>
      <div className={styles.paymentSection}>
        <h2>Confirm and pay</h2>

        <div className={styles.cardForm}>
          <h4>1. Choose when to pay</h4>
          <div className={styles.cardBox}>Pay ${price} now</div>

          <h4>2. Add a payment method</h4>
          <input placeholder="Card number" />
          <div className={styles.inlineInputs}>
            <input placeholder="Expiration" />
            <input placeholder="CVV" />
          </div>
          <input placeholder="ZIP Code" />
          <select>
            <option>United States</option>
          </select>

          <button className={styles.continueBtn}>Next</button>
        </div>
      </div>

      <div className={styles.summarySection}>
        {/* <Image
          // src={image || '/images/default.jpg'}
          src={decodeURIComponent(image || '/images/default.jpg')}
          alt={name}
          className={styles.profilePic}
          width={300}
          height={200}
        /> */}
        <img
  src={decodeURIComponent(image || '/images/default.jpg')}
  alt={name}
  className={styles.profilePic}
/>

        <p><strong>Model:</strong> {name}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Call Type:</strong> {callType}</p>
        <p className={styles.totalAmount}>Total: ${price}</p>
      </div>
    </div>
  );
}
