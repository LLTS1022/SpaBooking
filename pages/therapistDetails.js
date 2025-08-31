import { useEffect, useState } from 'react';
import styles from '../styles/therapistDetails.module.css';
import BookingModal from '../components/BookingModal';


const getDummyAvailability = () => {
  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];
    const slots = Array.from({ length: 10 }, (_, j) => `${9 + j}:00`);
    return { date: formattedDate, slots };
  });
};

const formatDate = (date) => {
    return date.toLocaleDateString('en-CA'); // YYYY-MM-DD
  };
  

//   const getDummyAvailability = () => {
//     return Array.from({ length: 7 }).map((_, i) => {
//       const base = new Date(); // today
//       const date = new Date(base); // fresh copy
//       date.setDate(base.getDate() + i); // add i days
//       const formattedDate = date.toISOString().split('T')[0];
//       const slots = Array.from({ length: 10 }, (_, j) => `${9 + j}:00`);
//       return { date: formattedDate, slots };
//     });
//   };
  

export default function TherapistDetails() {
  const [therapist, setTherapist] = useState(null);
  const [availability] = useState(getDummyAvailability);
  const [selectedDate, setSelectedDate] = useState(availability[0]?.date);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [callType, setCallType] = useState('');
  const [rating] = useState(4.2);
  const reviews = [
    { name: 'Justin Lewis', stars: 4, text: 'Bringing the girl to my doorstep was the best decision ever!' },
    { name: 'Cameron Wright', stars: 4, text: 'Great experience and on-time service.' },
    { name: 'Tyler Mitchell', stars: 4, text: 'Loved the experience. Will book again.' }
  ];
  const [showBookingModal, setShowBookingModal] = useState(false);
  


  useEffect(() => {
    const stored = localStorage.getItem('selectedTherapist');
    if (stored) setTherapist(JSON.parse(stored));
  }, []);

  const handleBookNow = () => {
    if (!callType) {
      alert("Please select call type (InCall or OutCall).");
      return;
    }
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
    // ✅ All good → show booking modal
    setShowBookingModal(true);
  };

    // Filter past time slots for today
    const isToday = selectedDate === formatDate(new Date());
    const currentHour = new Date().getHours();

    const slots = availability.find(d => d.date === selectedDate)?.slots || [];
    const validSlots = isToday
        ? slots.filter(slot => parseInt(slot.split(':')[0], 10) > currentHour)
        : slots;

    const toLocalDate = (isoDateStr) => {
        const [year, month, day] = isoDateStr.split('-');
        return new Date(year, month - 1, day); // 🧠 Month is 0-indexed
        };
          

  return (
    <div className={styles.wrapper}>
      {therapist ? (
        <div className={styles.layout}>

          <div className={styles.leftPanel}>
  <img src={therapist.picture_url || '/images/default.jpg'} alt={therapist.name} className={styles.profilePic} />
  <div className={styles.details}>
    <p><strong>Name:</strong> {therapist.name}</p>
    <p><strong>Service Areas:</strong> {therapist.service_area_primary || therapist.service_area}</p>
    {/* <p><strong>Availability Type:</strong> {therapist.availability_type || 'inCall/outCall'}</p> */}
    <p><strong>Price:</strong> ${therapist.price}/hr</p>
    <p><strong>Gender:</strong> {therapist.gender}</p>
    <p><strong>Ethnicities:</strong> {therapist.ethnicity}</p>
    <p><strong>Height:</strong> {therapist.height}</p>
    <p><strong>Age:</strong> {therapist.age}</p>
  </div>
</div>


          <div className={styles.rightPanel}>
            <h3>Make an Appointment with {therapist.name}</h3>
            <p>Booking fee is ${(therapist.price * 0.1).toFixed(2)} (10% of ${therapist.price})</p>

            <select className={styles.callType} value={callType} onChange={(e) => setCallType(e.target.value)}>
              <option value="">Select</option>
              <option value="incall">inCall</option>
              <option value="outcall">outCall</option>
            </select>

            <div className={styles.datesRow}>
              {availability.map(day => (
                <div
                  key={day.date}
                  className={`${styles.dateBlock} ${selectedDate === day.date ? styles.active : ''}`}
                  onClick={() => setSelectedDate(day.date)}
                >
                  {/* <div>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</div> */}
                  <div>{toLocalDate(day.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</div>
                  <div>{new Date(day.date).getDate()}</div>
                </div>
              ))}
            </div>

            <div className={styles.slots}>
              {validSlots.length > 0 ? (
                validSlots.map(slot => (
                  <span
                    key={slot}
                    className={`${styles.slot} ${selectedSlot === slot ? styles.selectedSlot : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </span>
                ))
              ) : (
                <p>No available time slots for today</p>
              )}
            </div>

{/* <div className={styles.slots}>
  {availability
    .find(d => d.date === selectedDate)
    ?.slots.filter(slot => {
      const hour = parseInt(slot.split(':')[0]);
      return hour >= 17; // Only after 5 PM
    })
    .map(slot => (
      <span
        key={slot}
        className={`${styles.slot} ${selectedSlot === slot ? styles.selectedSlot : ''}`}
        onClick={() => setSelectedSlot(slot)}
      >
        {slot}
      </span>
    ))}
</div> */}


            {/* <button className={styles.bookButton}>Book Now</button> */}
            {/* <button className={styles.bookButton} onClick={() => setShowBookingModal(true)}>
  Book Now
</button> */}
<button className={styles.bookButton} onClick={handleBookNow}>
  Book Now
</button>

          </div>
        </div>
      ) : (
        <p>Loading therapist details...</p>
      )}

      {/* <div className={styles.reviewSection}>
        <h3>Average Rating</h3>
        <div className={styles.stars}>{'⭐'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</div>

        {reviews.map((r, i) => (
          <div key={i}>
            <strong>{r.name}</strong>
            <div className={styles.stars}>{'⭐'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
            <p>{r.text}</p>
          </div>
        ))}

        <a href="#" className={styles.loadMore}>Load more.</a>
      </div> */}
      <div className={styles.reviewSection}>
  <h3>Average Rating</h3>
  <div className={styles.stars}>
    {'⭐'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
  </div>

  <div className={styles.reviewGrid}>
    {reviews.map((r, i) => (
      <div className={styles.reviewItem} key={i}>
        <strong>{r.name}</strong>
        <div className={styles.stars}>
          {'⭐'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
        </div>
        <p>{r.text}</p>
      </div>
    ))}
  </div>

  <a href="#" className={styles.loadMore}>Load more.</a>
</div>

{showBookingModal && (
  <BookingModal
    therapist={therapist}
    selectedDate={selectedDate}
    selectedSlot={selectedSlot}
    callType={callType}
    onClose={() => setShowBookingModal(false)}
  />
)}


    </div>
  );
}
