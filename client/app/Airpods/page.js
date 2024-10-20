"use client"

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const ImageSequence = () => {
  useEffect(() => {
    const frameCount = 147;
    const urls = new Array(frameCount).fill().map((_, i) => 
      `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(i + 1).toString().padStart(4, '0')}.jpg`
    );
    const canvas = document.getElementById('image-sequence');
    const ctx = canvas.getContext('2d');
    const playhead = { frame: 0 };
    let curFrame = -1;
    const images = new Array(urls.length);

    const loadImages = () => {
      return Promise.all(
        urls.map((url, i) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
              images[i] = img; 
              resolve();
            };
          });
        })
      );
    };

    const updateImage = () => {
      const frame = Math.round(playhead.frame);
      if (frame !== curFrame && frame >= 0 && frame < images.length) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[frame], 0, 0);
        curFrame = frame;
      }
    };
    loadImages().then(() => {
      updateImage(); 

      gsap.to(playhead, {
        frame: images.length - 1,
        ease: 'none',
        onUpdate: updateImage,
        duration: images.length / 30,
        scrollTrigger: {
          start: 0,
          end: 'max',
          scrub: true,
        },
      });
    });
    return () => {
    };
  }, []);
  return (
    <canvas id="image-sequence" width={1158} height={770} />
  );
};
export default ImageSequence;
