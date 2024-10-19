"use client"

import { useEffect } from 'react';
import { gsap, ScrollTrigger, ScrollSmoother } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Accordion = () => {
  useEffect(() => {
    const scrollerSmoother = ScrollSmoother.create({
      content: '#content',
      wrapper: '#wrapper',
      smooth: true,
      effects: false,
      normalizeScroll: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.accordions',
        pin: true,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        ease: 'linear',
      },
    });

    tl.to('.accordion .text', {
      height: 0,
      paddingBottom: 0,
      opacity: 0,
      stagger: 0.5,
    })
      .to('.accordion', {
        marginBottom: -15,
        stagger: 0.5,
      }, '<');

    return () => {
      scrollerSmoother.kill();
      tl.kill();
    };
  }, []);

  return (
    <div id="wrapper" className="relative">
      <div id="content">
        <div className="h-[70vh]"></div>
        <div className="flex flex-col items-center pb-[20vh] accordions">
          {accordionData.map((item, index) => (
            <div
              className={`accordion bg-gradient-to-r ${
                index === 0 ? 'from-blue-500 to-purple-600' :
                index === 1 ? 'from-red-400 to-red-600' :
                index === 2 ? 'from-green-400 to-blue-400' :
                'from-purple-600 to-pink-600'
              } w-max[50vw] max-w-[280px] p-6 rounded-lg mb-10 shadow-lg`}
              key={index}
            >
              <div className="title text-white text-xl font-semibold mb-2">
                {item.title}
              </div>
              <div className="text text-white opacity-70">
                {item.text}
              </div>
            </div>
          ))}
        </div>
        <div className="h-[70vh]"></div>
      </div>
    </div>
  );
};

const accordionData = [
  {
    title: 'All-screen design.',
    text: 'Lets you immerse yourself in whatever you’re reading, watching, or creating. The 10.9-inch Liquid Retina display features advanced technologies like True Tone, P3 wide color, and an antireflective coating.',
  },
  {
    title: 'Beauty all around.',
    text: 'The breakthrough M1 chip is now in Air. An 8-core CPU delivers up to 60 percent faster performance than the previous generation, making Air a creative and mobile gaming powerhouse. Multitask smoothly between powerful apps and play graphics-intensive games.',
  },
  {
    title: 'Take Center Stage.',
    text: 'The 12MP Ultra Wide front camera enables Center Stage, making video calls more natural and content creation more fun.',
  },
  {
    title: 'Pretty everywhere.',
    text: 'Join superfast 5G wireless networks when you’re on the go. Download files, play multiplayer games, stream movies, check in with friends, and more.',
  },
];
export default Accordion;