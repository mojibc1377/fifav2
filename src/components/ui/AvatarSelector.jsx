import React, { useEffect, useRef, useState } from 'react';

const avatars = [
    '/images/avatars/EJCj0hJ5N4Ki940uwZyk--3--syi4d.jpg',
    '/images/avatars/EJCj0hJ5N4Ki940uwZyk--4--jjpi9.jpg',
    '/images/avatars/WFEifZEI5SaxCtDuOJJH--1--df0wa.jpg',
    '/images/avatars/cartoonish-profile-avatar-soccer-related-ZSpzbLFhEO-watermarked.png',
    '/images/avatars/craiyon_010413_john_terry_caricature.png',
    '/images/avatars/craiyon_010826_harry_maguire_caricature.png',
    '/images/avatars/craiyon_010947_Zidane_enfant_en_pixar_et_fait_que_D_ID_ne_le_reconnaisse_pas__J_aimerai_que_la_quali.png',
    '/images/avatars/craiyon_011013_bald_neymar.png',
    '/images/avatars/craiyon_011030_ronaldo_nazario_funny_caricature.png',
    '/images/avatars/craiyon_011148_messi_funny_caricature.png',
    '/images/avatars/cristiano-ronaldo-profile-avatar-soccer-related-iypa1hDVpF-watermarked.png',
  ];
 
  function AvatarSelector({ onAvatarSelect }) {
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]); // Default selection
  
    const handleAvatarChange = (avatar) => {
      setSelectedAvatar(avatar);
      onAvatarSelect(avatar);
    };
  
    const containerRef = useRef(null);
  
    useEffect(() => {
      let intervalId;
      const scrollToEndAndBack = () => {
        const container = containerRef.current;
        if (container) {
          container.scrollLeft = 0;
          const scrollWidth = container.scrollWidth - container.clientWidth;
          const duration = 4000; // 4 seconds
          const scrollStep = (scrollWidth * 10) / duration; // scrolling speed 
          let currentTime = 0;
          const animateScroll = () => {
            currentTime += 10;
            container.scrollLeft += scrollStep;
            if (currentTime < duration / 2) {
              requestAnimationFrame(animateScroll);
            } else if (currentTime >= duration / 2 && currentTime < duration) {
              container.scrollLeft -= scrollStep;
              requestAnimationFrame(animateScroll);
            } else {
              clearInterval(intervalId); // Stop the animation after it completes
            }
          };
  
          intervalId = setInterval(animateScroll, 10);
        }
      };
  
      scrollToEndAndBack();
  
      return () => clearInterval(intervalId);
    }, []);
  
  
    return (
        <div className="par w-32 overflow-x-hidden relative hide-scrollbar">
          <h3 className="text-lg font-bold my-2">انتخاب عکس کاربری</h3>
          <div
            className="flex items-center gap-4 mb-4 overflow-x-auto"
            ref={containerRef}
          >
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`cursor-pointer rounded-full w-16 h-16 mb-2 border-2 ${
                  selectedAvatar === avatar ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => handleAvatarChange(avatar)}
              />
            ))}
          </div>
          {selectedAvatar && (
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold mb-2">عکس انتخاب شده</h3>
              <img src={selectedAvatar} alt="Preview Avatar" className="rounded-full w-40 h-40" />
            </div>
          )}
        </div>
      );
  }
  
  export default AvatarSelector;