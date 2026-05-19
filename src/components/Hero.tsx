import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { personal } from "../data";
import "./Hero.css";

const FULL_NAME = "Barath Suresh";
const TYPE_SPEED = 80; // ms per character

export default function Hero() {
    const [displayed, setDisplayed] = useState("");
    const [nameDone, setNameDone] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    const heroRef = useRef<HTMLElement>(null);
    const [heroVisible, setHeroVisible] = useState(true);

    const [showGreeting, setShowGreeting] = useState(false);
    const [showTagline, setShowTagline] = useState(false);
    const [showCTAs, setShowCTAs] = useState(false);

    useEffect(() => {
        const t0 = setTimeout(() => setShowGreeting(true), 300);

        let charIndex = 0;
        const t1 = setTimeout(() => {
            const interval = setInterval(() => {
                charIndex++;
                setDisplayed(FULL_NAME.slice(0, charIndex));
                if (charIndex >= FULL_NAME.length) {
                    clearInterval(interval);
                    setNameDone(true);
                    setTimeout(() => setShowCursor(false), 2000);
                }
            }, TYPE_SPEED);
            return () => clearInterval(interval);
        }, 600);

        const nameFinishMs = 600 + FULL_NAME.length * TYPE_SPEED + 200;
        const t2 = setTimeout(() => setShowTagline(true), nameFinishMs);
        const t3 = setTimeout(() => setShowCTAs(true), nameFinishMs + 500);

        return () => {
            clearTimeout(t0);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setHeroVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) =>
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

    const cursorActive = showCursor && !nameDone && heroVisible;
    const cursorBlink = showCursor && nameDone && heroVisible;

    return (
        <section id="hero" className="hero" ref={heroRef}>
            <div className="hero__glow" aria-hidden="true" />

            <div className="container hero__content">
                {/* "Hi, I am" */}
                <motion.span
                    className="hero__greeting"
                    initial={{ opacity: 0, y: 10 }}
                    animate={showGreeting ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {personal.greeting}
                </motion.span>

                {/* Typewriter name */}
                <div className="hero__name-row">
                    <h1 className="hero__headline">
                        {displayed}
                        <span
                            className={[
                                "hero__cursor",
                                cursorActive ? "hero__cursor--typing" : "",
                                cursorBlink ? "hero__cursor--blink" : "",
                                !showCursor ? "hero__cursor--hidden" : "",
                            ].join(" ")}
                        >
                            |
                        </span>
                    </h1>
                </div>

                {/* Tagline */}
                <motion.p
                    className="hero__subtitle"
                    initial={{ opacity: 0, y: 12 }}
                    animate={showTagline ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                >
                    {personal.tagline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    className="hero__ctas"
                    initial={{ opacity: 0, y: 14 }}
                    animate={showCTAs ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <button className="btn btn-primary" onClick={() => scrollTo("#projects")}>
                        View Projects
                    </button>
                    <button className="btn btn-outline" onClick={() => scrollTo("#contact")}>
                        Contact Me
                    </button>
                    {personal.resumeUrl && (
                        <a
                            href={personal.resumeUrl}
                            download
                            className="btn btn-outline"
                        >
                            ↓ Resume
                        </a>
                    )}
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    className="hero__scroll-hint"
                    initial={{ opacity: 0 }}
                    animate={showCTAs ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <span className="hero__scroll-line" />
                    <span className="hero__scroll-text">scroll</span>
                </motion.div>
            </div>
        </section>
    );
}
