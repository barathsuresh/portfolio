import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedHeadlineProps {
    text: string;
    highlightWords?: string[]; // words to apply shimmer effect
    className?: string;
}

export default function AnimatedHeadline({
    text,
    highlightWords = [],
    className = "",
}: AnimatedHeadlineProps) {
    const ref = useRef<HTMLHeadingElement>(null);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSeen(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const words = text.split(" ");

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.11,
            },
        },
    };

    const customEase = (t: number) => 1 - Math.pow(1 - t, 3);

    const wordVariant: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, ease: customEase },
        },
    };

    return (
        <motion.h1
            ref={ref}
            className={`animated-headline ${className}`}
            variants={container}
            initial="hidden"
            animate={seen ? "visible" : "hidden"}
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "0 0.3em" }}
        >
            {words.map((word, i) => {
                const isHighlighted = highlightWords.includes(word);
                return (
                    <motion.span
                        key={i}
                        variants={wordVariant}
                        style={{ display: "inline-block" }}
                        className={isHighlighted ? "headline-shimmer" : ""}
                    >
                        {word}
                    </motion.span>
                );
            })}
        </motion.h1>
    );
}
