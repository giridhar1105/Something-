"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, Draggable } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, Draggable);
const Gallery = () => {
    const cardsRef = useRef(null);
    const galleryRef = useRef(null);
    const scrub = useRef(null);
    const playhead = useRef({ offset: 0 });
    let iteration = 0;

    useEffect(() => {
        if (!galleryRef.current || !cardsRef.current) return;

        const cards = gsap.utils.toArray('.cards li');
        gsap.set('.cards li', { xPercent: 400, opacity: 0, scale: 0 });

        const spacing = 0.1;

        const animateFunc = (element) => {
            const tl = gsap.timeline();
            tl.fromTo(element, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, yoyo: true, repeat: 1 })
              .fromTo(element, { xPercent: 400 }, { xPercent: -400, duration: 1, ease: "none" }, 0);
            return tl;
        };

        const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
        scrub.current = gsap.to(playhead.current, {
            offset: 0,
            onUpdate() {
                seamlessLoop.time(playhead.current.offset);
            },
            duration: 0.5,
            ease: "power3",
            paused: true,
        });

        const trigger = ScrollTrigger.create({
            start: 0,
            onUpdate(self) {
                let scroll = self.scroll();
                if (scroll > self.end - 1) {
                    wrap(1, 2);
                } else if (scroll < 1 && self.direction < 0) {
                    wrap(-1, self.end - 2);
                } else {
                    scrub.current.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
                    scrub.current.invalidate().restart();
                }
            },
            end: "+=3000",
            pin: galleryRef.current,
        });

        ScrollTrigger.addEventListener("scrollEnd", () => scrollToOffset(scrub.current.vars.offset));

        const scrollToOffset = (offset) => {
            let snappedTime = gsap.utils.snap(spacing, offset);
            let progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
            let scroll = gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end);
            if (progress >= 1 || progress < 0) {
                return wrap(Math.floor(progress), scroll);
            }
            trigger.scroll(scroll);
        };

        const wrap = (iterationDelta, scrollTo) => {
            iteration += iterationDelta;
            trigger.scroll(scrollTo);
            trigger.update();
        };

        document.querySelector(".next").addEventListener("click", () => scrollToOffset(scrub.current.vars.offset + spacing));
        document.querySelector(".prev").addEventListener("click", () => scrollToOffset(scrub.current.vars.offset - spacing));

        Draggable.create(".drag-proxy", {
            type: "x",
            trigger: ".cards",
            onPress() {
                this.startOffset = scrub.current.vars.offset;
            },
            onDrag() {
                scrub.current.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
                scrub.current.invalidate().restart();
            },
            onDragEnd() {
                scrollToOffset(scrub.current.vars.offset);
            }
        });

        return () => {
            trigger.kill();
        };
    }, []);

    const buildSeamlessLoop = (items, spacing, animateFunc) => {
        const rawSequence = gsap.timeline({ paused: true });
        const seamlessLoop = gsap.timeline({ paused: true, repeat: -1 });
        let cycleDuration = spacing * items.length;
        let dur;

        items.concat(items).concat(items).forEach((item, i) => {
            let anim = animateFunc(items[i % items.length]);
            rawSequence.add(anim, i * spacing);
            dur || (dur = anim.duration());
        });

        seamlessLoop.fromTo(rawSequence, {
            time: cycleDuration + dur / 2
        }, {
            time: "+=" + cycleDuration,
            duration: cycleDuration,
            ease: "none"
        });

        return seamlessLoop;
    };

    return (
        <div className="relative w-full h-screen overflow-hidden" ref={galleryRef}>
            <ul className="absolute w-56 h-72 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cards" ref={cardsRef}>
                <li key={0} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">0</li>
                <li key={1} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">1</li>
                <li key={2} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">2</li>
                <li key={3} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">3</li>
                <li key={4} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">4</li>
                <li key={5} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">5</li>
                <li key={6} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">6</li>
                <li key={7} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">7</li>
                <li key={8} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">8</li>
                <li key={9} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">9</li>
                <li key={10} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">10</li>
                <li key={11} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">11</li>
                <li key={12} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">12</li>
                <li key={13} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">13</li>
                <li key={14} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">14</li>
                <li key={15} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">15</li>
                <li key={16} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">16</li>
                <li key={17} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">17</li>
                <li key={18} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">18</li>
                <li key={19} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">19</li>
                <li key={20} className="w-56 h-72 flex items-center justify-center text-2xl font-sans bg-purple-300 rounded-lg absolute top-0 left-0">20</li>
            </ul>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <button className="prev px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-green-500 transition duration-200">Prev</button>
                <button className="next px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-green-500 transition duration-200">Next</button>
            </div>
            <div className="drag-proxy" style={{ visibility: 'hidden', position: 'absolute' }}></div>
        </div>
    );
};

export default Gallery;
