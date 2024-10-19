"use client"

import { useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Head from 'next/head';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scrollDist',
        start: '0 0',
        end: '100% 100%',
        scrub: 1,
      },
    });

    tl.fromTo('.sky', { y: 0 }, { y: -200 })
      .fromTo('.cloud1', { y: 100 }, { y: -800 })
      .fromTo('.cloud2', { y: -150 }, { y: -500 })
      .fromTo('.cloud3', { y: -50 }, { y: -650 })
      .fromTo('.mountBg', { y: -10 }, { y: -100 })
      .fromTo('.mountMg', { y: -30 }, { y: -250 })
      .fromTo('.mountFg', { y: -50 }, { y: -600 });

    return () => {
      tl.kill(); // Cleanup on unmount
    };
  }, []);

  const handleArrowHover = (direction) => {
    gsap.to('.arrow', { y: direction === 'enter' ? 10 : 0, duration: direction === 'enter' ? 0.8 : 0.5, ease: direction === 'enter' ? 'back.inOut(3)' : 'power3.out' });
  };

  const scrollToNextSection = () => {
    gsap.to(window, { scrollTo: innerHeight, duration: 1.5, ease: 'power1.inOut' });
  };

  return (
    <div>
      <Head>
        <title>Parallax Scene</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" />
        <style>{`
          body, html {
            width: 100%;
            height: 100%;
            background: #111b29;
            font-family: 'Montserrat', sans-serif;
            font-size: 99px;
            text-align: center;
            margin: 0;
          }
          main {
            position: fixed;
            background: #fff;
            width: 100%;
            max-width: 1200px;
            height: 100%;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
          }
          .scrollDist {
            height: 200%;
          }
        `}</style>
      </Head>
      <div className="scrollDist"></div>
      <main>
        <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <mask id="m">
            <g className="cloud1">
              <rect fill="#fff" width="100%" height="801" y="799" />
              <image href="https://assets.codepen.io/721952/cloud1Mask.jpg" width="1200" height="800" />
            </g>
          </mask>
          <image className="sky" href="https://assets.codepen.io/721952/sky.jpg" width="1200" height="590" />
          <image className="mountBg" href="https://assets.codepen.io/721952/mountBg.png" width="1200" height="800" />
          <image className="mountMg" href="https://assets.codepen.io/721952/mountMg.png" width="1200" height="800" />
          <image className="cloud2" href="https://assets.codepen.io/721952/cloud2.png" width="1200" height="800" />
          <image className="mountFg" href="https://assets.codepen.io/721952/mountFg.png" width="1200" height="800" />
          <image className="cloud1" href="https://assets.codepen.io/721952/cloud1.png" width="1200" height="800" />
          <image className="cloud3" href="https://assets.codepen.io/721952/cloud3.png" width="1200" height="800" />
          <text fill="#fff" x="350" y="200">EXPLORE</text>
          <polyline className="arrow" fill="#fff" points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250" />
          <g mask="url(#m)">
            <rect fill="#fff" width="100%" height="100%" />
            <text x="350" y="200" fill="#162a43">FURTHER</text>
          </g>
          <rect
            id="arrow-btn"
            width="100"
            height="100"
            opacity="0"
            x="550"
            y="220"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => handleArrowHover('enter')}
            onMouseLeave={() => handleArrowHover('leave')}
            onClick={scrollToNextSection}
          />
        </svg>
      </main>
    </div>
  );
}
