// import { useState } from 'react';
// import styles from '../styles/bookingModal.module.css';

// export default function BookingModal({ therapist, selectedDate, selectedSlot, callType, onClose }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [cvc, setCvc] = useState('');
//   const [expiry, setExpiry] = useState('');

//   const handleSubmit = () => {
//     console.log('Booking Details:', {
//       therapist,
//       name,
//       email,
//       cardNumber,
//       cvc,
//       expiry,
//       selectedDate,
//       selectedSlot,
//       callType
//     });

//     alert('Booking confirmed!');
//     onClose();
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modal}>
//         <button className={styles.closeBtn} onClick={onClose}>×</button>
//         <h2>Complete Booking</h2>

//         <p><strong>Model:</strong> {therapist.name}</p>
//         <p><strong>Date:</strong> {selectedDate}</p>
//         <p><strong>Time:</strong> {selectedSlot}</p>
//         <p><strong>Call Type:</strong> {callType}</p>

//         <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
//         <input type="text" placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} />
//         <input type="text" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />

//         <button onClick={handleSubmit}>Confirm Booking</button>
//       </div>
//     </div>
//   );
// }


// import { useState } from 'react';
// import styles from '../styles/bookingModal.module.css';

// export default function BookingModal({ onClose }) {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//     password: '',
//     address: '',
//   });

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleNext = () => {
//     if (step === 1 && (!formData.firstName || !formData.lastName || !formData.phone)) {
//       alert('Please fill all fields');
//       return;
//     }
//     if (step === 2 && (!formData.email || !formData.password || !formData.address)) {
//       alert('Please complete all required fields');
//       return;
//     }
//     setStep(step + 1);
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         {/* Close icon */}
//         <div className={styles.closeButton} onClick={onClose}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//             <path stroke="#333" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
//           </svg>
//         </div>

//         <h2>{step === 1 ? 'Register to book' : step === 2 ? 'Add account details' : 'Payment'}</h2>

//         {step === 1 && (
//           <>
//             <div className={styles.inputGroup}>
//               <label>First Name</label>
//               <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
//             </div>

//             <div className={styles.inputGroup}>
//               <label>Last Name</label>
//               <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
//             </div>

//             <div className={styles.inputGroup}>
//               <label>Phone Number</label>
//               <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
//             </div>

//             <div className={styles.divider}><span>or</span></div>

//             {/* Social Buttons Only on Step 1 */}
//             <button className={styles.authBtn}>Continue with Google</button>
//             <button className={styles.authBtn}>Continue with Apple</button>
//             <button className={styles.authBtn}>Continue with Email</button>
//             <button className={styles.authBtn}>Continue with Facebook</button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <div className={styles.inputGroup}>
//               <label>Email</label>
//               <input type="email" name="email" value={formData.email} onChange={handleChange} />
//             </div>

//             <div className={styles.inputGroup}>
//               <label>Password</label>
//               <input type="password" name="password" value={formData.password} onChange={handleChange} />
//             </div>

//             <div className={styles.inputGroup}>
//               <label>Address or Zipcode</label>
//               <input type="text" name="address" value={formData.address} onChange={handleChange} />
//             </div>
//           </>
//         )}

//         {step < 3 && (
//           <button className={styles.continueBtn} onClick={handleNext}>
//             Continue
//           </button>
//         )}

//         {step === 3 && (
//           <div className={styles.paymentSummary}>
//             <p>Proceeding to payment screen...</p>
//             {/* Placeholder - You can integrate Stripe or similar here */}
//             <button className={styles.continueBtn}>Enter Card Details</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// File: components/BookingModal.js
import React, { useState } from 'react';
import styles from '../styles/bookingModal.module.css';
import { useRouter } from 'next/router';


const BookingModal = ({ onClose, therapist, selectedDate, selectedSlot, callType }) => {
  const router = useRouter();
  console.log('BookingModal props:', {
    therapist,
    selectedDate,
    selectedSlot,
    callType
  });

  console.log(therapist.picture_url);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (step === 1) setStep(2);
    else if (step === 2) {
      handleProceedToPay();
    }
  };

  const handleProceedToPay = () => {
    router.push({
      pathname: '/therapistDetails/ConfirmAndPayPage',
      query: {
        name: therapist.name,
        image: therapist.picture_url || '/images/default.jpg',
        date: selectedDate,
        time: selectedSlot,
        callType,
        price: therapist.price, 
      },
    });
  };
  

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>

        {step === 1 && (
          <>
            <h2>Login/SignUp</h2>
            <div className={styles.inputGroup}>
              <input name="firstName" placeholder="First name" onChange={handleChange} value={formData.firstName} />
              <input name="lastName" placeholder="Last name" onChange={handleChange} value={formData.lastName} />
              <input name="phone" placeholder="Phone number" onChange={handleChange} value={formData.phone} />
              <button className={styles.continueBtn} onClick={handleContinue}>Continue</button>
            </div>
            <div className={styles.divider}><span>or</span></div>
            <button className={styles.authBtn}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20"><path fill="#fbc02d" d="M43.6 20.5H42V20H24v8h11.3C33.2 32.7 29 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.5-.4-3.5z"/><path fill="#e53935" d="M6.3 14.7l6.6 4.8C14.3 15.7 18.8 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4c-7.5 0-14 4.2-17.7 10.7z"/><path fill="#4caf50" d="M24 44c5.2 0 10.2-2 13.9-5.3l-6.4-5.4C29.4 34.9 26.8 36 24 36c-5 0-9.2-3.3-10.7-7.9l-6.6 5.1C10 39.6 16.5 44 24 44z"/><path fill="#1565c0" d="M43.6 20.5H42V20H24v8h11.3c-1.1 2.9-3.3 5.2-6.1 6.5l.1.1 6.4 5.4c-.4.3 6.3-4.6 6.3-14.5 0-1.2-.1-2.5-.4-3.5z"/></svg>
    Continue with Google
  </button>

  <button className={styles.authBtn}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"><path fill="black" d="M16.365 1.43c-1.148.093-2.543.783-3.327 1.701-.684.799-1.265 2.093-1.11 3.294 1.242.029 2.533-.702 3.293-1.617.736-.888 1.293-2.147 1.144-3.378zM19.845 9.64c-.063-2.244 1.827-3.321 1.911-3.373-1.041-1.516-2.657-1.722-3.224-1.742-1.37-.139-2.668.802-3.358.802-.69 0-1.763-.782-2.9-.761-1.488.022-2.862.865-3.625 2.197-1.553 2.688-.396 6.66 1.119 8.841.741 1.069 1.616 2.271 2.765 2.23 1.103-.045 1.521-.723 2.853-.723 1.334 0 1.704.723 2.863.7 1.182-.018 1.927-1.086 2.646-2.163.827-1.206 1.167-2.381 1.184-2.44-.026-.012-2.271-.871-2.297-3.448zM15.66 2.95z"/></svg>
    Continue with Apple
  </button>

  <button className={styles.authBtn}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"><path fill="#000" d="M3 4h18a1 1 0 0 1 1 1v2.18l-10 5.32L2 7.18V5a1 1 0 0 1 1-1m0 4.24l8.37 4.46a1 1 0 0 0 .94 0L21 8.24V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/></svg>
    Continue with email
  </button>

  <button className={styles.authBtn}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 320 512"><path fill="#1877f2" d="M279.14 288l14.22-92.66h-88.91V127.56c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.64 0 225.36 0C141.09 0 89.53 54.42 89.53 153.27V195.3H0v92.66h89.53V512h107.71V288z"/></svg>
    Continue with Facebook
  </button>
       </>
        )}

        {step === 2 && (
          <>
            <h2>Finish signing up</h2>
            <div className={styles.inputGroup}>
              <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} />
              <input name="address" placeholder="Address or Zipcode" onChange={handleChange} value={formData.address} />
              <button className={styles.continueBtn} onClick={handleContinue}>Agree and continue</button>
            </div>
          </>
        )}

        {/* {step === 3 && handleProceedToPay()} */}
      </div>
    </div>
  );
};
export default BookingModal;


