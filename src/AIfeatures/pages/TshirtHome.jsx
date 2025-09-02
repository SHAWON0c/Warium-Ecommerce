import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import state from '../store';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  slideAnimation
} from '../config/motion';
import UseAuth from '../../hooks/UseAuth';

const TshirtHome = () => {
  const snap = useSnapshot(state);
  const [currentBanner, setCurrentBanner] = useState(0);

  const { user } = UseAuth();


  const banners = [
    { id: 1, title: "LET'S DO IT.", subtitle: "Create your unique and exclusive shirt with our 3D customization tool." },
    { id: 2, title: "UNLEASH CREATIVITY.", subtitle: "Design your exclusive style with our intuitive editor." },
    { id: 3, title: "MAKE IT UNIQUE.", subtitle: "Bring your imagination to life and define your style." },
  ];

  // Cycle through banners every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const loopAnimation = {
    animate: {
      x: [0, 20, 0, -20, 0],
      y: [0, 10, 0, 10, 0],
      rotate: [0, 2, -2, 1, -1, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const bannerAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: "0%", opacity: 1, transition: { duration: 1, ease: "easeOut" } },
    exit: { y: "100%", opacity: 0, transition: { duration: 1, ease: "easeIn" } }
  };

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section
          className="home relative grid grid-cols-4 gap-4 min-h-[70vh] border-black"
        >
          {/* Banner cycling */}
          <AnimatePresence mode="wait">
            <motion.div
              key={banners[currentBanner].id}
              className="text-left col-span-4 md:col-span-3 px-4 py-6 md:py-8 absolute left-0 top-0 lg:top-20 lg:left-32 w-full"
              variants={bannerAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.header {...slideAnimation("down")} className="mb-2 lg:mb-4 flex flex-row gap-2 items-center font-bold text-black">
                <img
                  src='./threejs.png'
                  alt="logo"
                  className="w-5 h-5 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
                />
                <p className='head-text text-black' variants={loopAnimation} >try our new ai featured</p>
              </motion.header>

              <motion.div className="mb-2 lg:mb-10" animate="animate">
                <h1 className="head-text text-xl lg:text-5xl font-black leading-snug">
                  {banners[currentBanner].title}
                </h1>

              </motion.div>

              <motion.div {...headContentAnimation} className="flex flex-col gap-3 max-w-md">
                <p className="font-normal text-sm md:text-base leading-relaxed text-black">
                  {banners[currentBanner].subtitle} <strong>Unleash your imagination</strong> and define your style.
                </p>
                <CustomButton
                  type="filled"
                  title="Customize It"
                  handleClick={() => {
                    if (user) {
                      state.intro = false; // normal action
                    } else {
                      Swal.fire({
                        icon: 'warning',
                        title: 'you must log in first to use the AI',
                        confirmButtonText: 'OK',
                      });
                    }
                  }}
                  customStyles="w-fit px-4 py-2 font-bold text-sm md:text-base"
                />

              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="absolute bottom-12 left-2 z-10 p-1 sm:p-2 bg-white/20 backdrop-blur-sm rounded text-[10px] sm:text-xs text-gray-500">
            <p>© {new Date().getFullYear()} WARIUM. All rights reserved.</p>
            <p className="text-[9px] sm:text-[10px]">Sponsored by shawonEDULab</p>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default TshirtHome;
