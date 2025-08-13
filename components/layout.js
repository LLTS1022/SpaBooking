// import Head from 'next/head';
// import Image from 'next/image';
// import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.css';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import{ CURRENT_URL } from '../components/config';
// import dynamic from 'next/dynamic'

// const name = 'Massage at Home';
// export const siteTitle = 'Tristate Massage';

// export default function Layout({ children, home }) {

//   const CrispWithNoSSR = dynamic(
//     () => import('../components/crisp')
//   )


//   const [isLoggedIn, setIsLoggedIn] = useState(false);


//   useEffect(() => {
//     const customerId = localStorage.getItem("customertoken");
//     if(customerId){
//       setIsLoggedIn(true);
//     }
   
//   }, []);
//   return (
//     <div className={styles.container}>
//       <CrispWithNoSSR />
//       <Head>

//         <link rel="icon" href="/favicon.ico" />
//         <meta
//           name="description"
//           content="Learn how to build a personal website using Next.js"
//         />
//         {/* <meta
//           property="og:image"
//           content={`https://og-image.vercel.app/${encodeURI(
//             siteTitle,
//           )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
//         /> */}
//         <meta name="og:title" content={siteTitle} />
//         <meta name="twitter:card" content="summary_large_image" />
//       </Head>
//       <header className={styles.header}>
//         <a className={styles.logoa}  href={CURRENT_URL}> <img className='logomain' src="https://tsm.spagram.com/api/images/logo2.png" /> </a>
//         {/* <a className={styles.logoa}  href={CURRENT_URL}> <img className='logomain' src="images/logo2.png" /> </a> */}
//         {home ? (
//           <>            
//             <ul className='menu'>
//                 <li> <Link href='/'> Therapists </Link> </li>
//                 <li> <Link href='/model-registration'> Therapist Login/Register </Link> </li>
//                 <li> <Link href='https://www.tristatemassage.com/contact'> Help  </Link> </li>
//                 <li> {isLoggedIn? <div> <Link href='/customer-backend'> Settings </Link> | <Link href='/logout'>  Logout </Link> </div>  : <Link href='/customer-login'> Customer Zone </Link> }  </li>
//             </ul>
//           </>
//         ) : (
//           <>
//             <ul className='menu'>
//             <li> <Link href='/'> Therapists </Link> </li>
//                 <li> <Link href='/model-registration'> Therapists Login/Register </Link> </li>
//                 <li> <Link href='https://www.tristatemassage.com/contact'> Help  </Link> </li>
//                 <li> {isLoggedIn? <div> <Link href='/customer-backend'> Settings </Link> | <Link href='/logout'>  Logout </Link> </div>  : <Link href='/customer-login'> Customer Zone </Link> }  </li>

//             </ul>
//             {/* <h2 className={utilStyles.headingLg}>
//               <Link href="/" className={utilStyles.colorInherit}>
//                 {name}
//               </Link>
//             </h2> */}
//           </>
//         )}
//       </header>
//       <main>{children}
      
//       {!home && (
//         <div className={styles.backToHome}>
//           <Link href="/">← Back to home</Link>
//         </div>
//       )}
//       </main>
      
//       <div className='footer'>  &copy; 2024 Tri State Massage LLC. All rights reserved! </div>
//     </div>
//   )
// }

import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.css';
import { useState, useEffect } from 'react';
import { CURRENT_URL } from '../components/config';
import dynamic from 'next/dynamic';
import LoginModal from '../components/LoginModal';


const name = 'Massage at Home';
export const siteTitle = 'Spagram';

export default function Layout({ children, home }) {
  const CrispWithNoSSR = dynamic(() => import('../components/crisp'));

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const customerId = localStorage.getItem("customertoken");
    if (customerId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <CrispWithNoSSR />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Find massage therapists at home" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{siteTitle}</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.left}>
          <a href={CURRENT_URL} className={styles.logoContainer}>
            <img className={styles.logo} src="https://tsm.spagram.com/api/images/logo2.png" alt="Logo" />
            <span className={styles.brand}>Spagram</span>
          </a>
        </div>

        <nav className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
        </nav>

        <div className={styles.menuIcon} onClick={() => setShowDropdown(prev => !prev)}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>

        {showDropdown && (
          <div className={styles.dropdownMenu}>
            <div className={styles.dropdownButton} 
            onClick={() => window.location.href = 'https://www.tristatemassage.com/contact'}
            >
              Help Center
            </div>
            
            {/* <a href="https://www.tristatemassage.com/contact">Help Center</a> */}
            {/* <Link href="/customer-login">Login / Sign Up</Link> */}
            <div className={styles.dropdownButton} onClick={() => setShowLoginModal(true)}>
              Login / Sign Up
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      <div className="footer">© 2024 Tri State Massage LLC. All rights reserved!</div>
    </div>
  );
}


