"use client"

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, MotionPathPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Home = () => {
  useEffect(() => {
    smoothScroll("#content");

    mountainPara();
    snowboardPara();

    function mountainPara() {
      gsap.timeline({
        scrollTrigger: {
          trigger: "#Mountain-Scroll",
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      })
      .from("#Sky", { y: 0 }, 0)
      .fromTo("#Mountain-Top", { y: 150 }, { y: -300 }, 0)
      .fromTo("#Mountain-Middle", { y: 350 }, { y: -300 }, 0)
      .fromTo("#Mountain-Bottom", { y: 500 }, { y: -300 }, 0);
    }

    function snowboardPara() {
      let direction = 1,
          isRefreshing = false,
          heroGetter = gsap.getProperty("#hero"),
          heroSetter = gsap.quickSetter("#hero", "rotation", "deg"),
          rotation = { base: heroGetter("rotation"), extra: -180 },
          addRotation = () => {
            rotation.base = heroGetter("rotation");
            heroSetter(rotation.base + rotation.extra);
          };

      gsap.set("#hero", { scale: 0.7, autoAlpha: 1, transformOrigin: "50% 50%" });

      gsap.to("#hero", {
        motionPath: {
          path: "#trail",
          align: "#trail",
          autoRotate: 90,
          alignOrigin: [0.5, 0.5]
        },
        onUpdate: addRotation,
        immediateRender: true,
        ease: "none",
        scrollTrigger: {
          trigger: "#Boarder-Scroll",
          start: "top 100",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onRefreshInit: () => isRefreshing = true,
          onUpdate: self => {
            if (isRefreshing) {
              direction = self.direction;
            } else if (direction !== self.direction) {
              direction = self.direction;
              gsap.to(rotation, {
                extra: direction === 1 ? -180 : 0,
                ease: "power1.inOut",
                onUpdate: () => heroSetter(rotation.base + rotation.extra),
                overwrite: true
              });
            }
          },
          onRefresh: () => {
            isRefreshing = false;
            if (heroGetter("rotation") === rotation.base) {
              addRotation();
            }
          }
        }
      });
    }

    function smoothScroll(content) {
      content = gsap.utils.toArray(content)[0];

      gsap.set(content.parentNode, {
        overflow: "hidden",
        position: "fixed",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      });
      gsap.set(content, { overflow: "visible", width: "100%" });

      let getProp = gsap.getProperty(content),
          setProp = gsap.quickSetter(content, "y", "px");

      gsap.fromTo(content, { y: 0 }, {
        y: () => document.documentElement.clientHeight - content.clientHeight,
        ease: "none",
        scrollTrigger: {
          scroller: window,
          invalidateOnRefresh: true,
          start: 0,
          end: () => content.clientHeight - document.documentElement.clientHeight,
          scrub: 3
        }
      });
    }

  }, []);

  return (
    <div id="content">
      <svg id="Mountain-Scroll" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800" preserveAspectRatio="xMidyMin">
        <defs>
          <style>
            {`
              .mountain-1 { fill: #98e2f6; }
              .mountain-2 { fill: #2992c8; }
              .mountain-3, .mountain-6 { fill: #fff; }
              .mountain-4 { opacity: 0.5; }
              .mountain-5 { fill: #1aace5; }
              .mountain-6 { stroke: #fff; stroke-miterlimit:               10; }
              .mountain-7 { fill: #d6d6d6; }
            `}
          </style>
        </defs>
        <g id="Sky">
          <rect class="mountain-1" width="1000" height="447"/>
        </g>
        <g id="Mountain-Top">
          <g id="Layer_19" data-name="Layer 19">
            <polygon class="mountain-2" points="1000 261.5 903.9 140.5 813 229.5 614.2 49.5 470.4 237.5 280.6 168.5 251.7 245.5 143.8 152.5 0 305.5 0 714.5 1000 715.6 1000 261.5"/>
          </g>
          <g id="Layer_18" data-name="Layer 18">
            <polygon class="mountain-3" points="0 297.6 0 714.1 60.2 715 60.2 415.4 95.8 360.9 115.7 242.8 119.9 206.5 144 152 0 297.6"/>
          </g>
          <g id="Layer_17" data-name="Layer 17">
            <polygon class="mountain-3" points="281 168 165 263 0.2 715 187 715 243 346 274 357 299 270 283 257 301 263 281 168"/>
          </g>
          <g id="Layer_16" data-name="Layer 16">
            <polygon class="mountain-3" points="614 50 384 206.2 537 264 678 180.8 682 154.5 614 50"/>
          </g>
          <g id="Layer_15" data-name="Layer 15">
            <polygon class="mountain-3" points="904 140 717 247 688 321 534 716 774 716 813 368 830 347 805 331 840 281 883 281 918 207 904 140"/>
          </g>
          <g id="Layer_14" data-name="Layer 14">
            <polygon class="mountain-3" points="411 295 472 299 507 327 531 396 466 328 411 295"/>
          </g>
        </g>
        <g id="Mountain-Middle">
          <g id="Layer_11" data-name="Layer 11">
            <g class="mountain-4">
              <rect class="mountain-2" x="759.7" y="387.7" width="5.6" height="32.32"/>
              <polygon class="mountain-2" points="751 402 774 402 762.8 367.8 751 402"/>
            </g>
          </g>
          <g id="Layer_10" data-name="Layer 10">
            <g class="mountain-4">
              <rect class="mountain-2" x="789.3" y="379.1" width="5.6" height="32.32"/>
              <polygon class="mountain-2" points="780.6 393.4 803.6 393.4 792.4 359.2 780.6 393.4"/>
            </g>
          </g>
          <g id="Layer_9" data-name="Layer 9">
            <g class="mountain-4">
              <rect class="mountain-2" x="143" y="373.9" width="5.6" height="32.32"/>
              <polygon class="mountain-2" points="134.3 388.2 157.3 388.2 146.1 354 134.3 388.2"/>
            </g>
          </g>
          <g id="Layer_8" data-name="Layer 8">
            <g class="mountain-4">
              <rect class="mountain-2" x="172.6" y="376.4" width="5.6" height="32.32"/>
              <polygon class="mountain-2" points="163.9 390.7 186.9 390.7 175.7 356.5 163.9 390.7"/>
            </g>
          </g>
          <g id="Layer_7" data-name="Layer 7">
            <g class="            mountain-4">
              <rect class="mountain-2" x="41.3" y="375.5" width="5.6" height="32.32"/>
              <polygon class="mountain-2" points="32.6 389.8 55.6 389.8 44.4 355.7 32.6 389.8"/>
            </g>
          </g>
          <g id="Layer_6" data-name="Layer 6">
            <path class="mountain-5" d="M1000,302.3C874,345.5,757.1,445.1,627.9,469.1c-120.1,22.2-240.5-22.6-359.7-52.3C179.9,394.8,86.2,382,0,409V852l1000,1.7Z"/>
          </g>
          <g id="Layer_5" data-name="Layer 5">
            <path class="mountain-6" d="M479.7,562.4c-7.4-1.4-16.7-5.4-16.6-14.2s9.2-12.1,16.4-13.6A580.8,580.8,0,0,0,587,501.7c30.7-12.8,63.3-25.8,86.7-49.5,2-2,4-4.2,5.9-6.3-8.4,3.3-8.2,4.8-19.7,8.7-32.4,30.9-101.3,38.3-144.1,44.7-65.3,9.8-132.4,11.4-194.4,37.3-13.7,5.8-26.9,18.9-16.9,33.6,4.8,7,12.8,11.3,20.5,15.3C437.2,643.4,875.5,820.3,999.1,852V656.7C884.1,634.8,594.6,584.3,479.7,562.4Z"/>
          </g>
        </g>
        <g id="Mountain-Bottom">
          <g id="Layer_13" data-name="Layer 13">
            <path class="mountain-7" d="M1000,594c-133.2,69.4-276.7,101.3-418.9,92.1C385.9,673.4,193.7,585.4,0,577.6V962H1000Z"/>
          </g>
          <g id="Layer_12" data-name="Layer 12">
            <path class="mountain-3" d="M73.6,802.3c44.8,42.3,103.8,61.1,155.7,91.1C249.1,904.9,119.2,929.8,0,950.2v11.9H999c-249.8-77.6-532.6-95-786.4-250.2-41.5-25.5,143.1-45,215.2-48.7L228.4,614c-55,21.1-107.2,52.7-154.8,89.5C62,712.5,50,722.9,46,737.8c-3.3,12.1-.7,25.4,4.9,36.4S64.8,794.1,73.6,802.3Z"/>
          </g>
        </g>
      </svg>

      <svg id="Boarder-Scroll" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 7600">
        <defs>
          <style>
            {`
              .cls-1 { fill: #fbb469; }
              .cls-2 { fill: #4699c2; }
              .cls-3 { fill: #fbda67; }
              .cls-4 { fill: #fff; }
              .cls-5 { fill: #8fb3c6; }
              .cls-10, .cls-16, .cls-18, .cls-6 { fill: none              ; }
              .cls-6 { stroke: #fff; stroke-miterlimit: 10; }
              .cls-7 { fill: #d6d6d6; }
            `}
          </style>
        </defs>
        <g id="Layer_1" data-name="Layer 1">
          <path class="cls-1" d="M0,0H1000V7600H0Z"/>
          <path class="cls-2" d="M0,0H1000V7600H0Z" opacity="0.5"/>
          <path class="cls-3" d="M0,0H1000V7600H0Z" opacity="0.3"/>
          <path class="cls-4" d="M0,0H1000V7600H0Z" opacity="0.2"/>
          <path class="cls-5" d="M0,0H1000V7600H0Z" opacity="0.1"/>
          <g id="hero">
            <circle class="cls-7" cx="500" cy="500" r="50"/>
          </g>
          <path class="cls-6" d="M0,0H1000V7600H0Z"/>
        </g>
      </svg>
    </div>
  );
};

export default Home;