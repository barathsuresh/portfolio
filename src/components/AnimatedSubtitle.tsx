import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedSubtitleProps {
    text: string;
    delay?: number;
    className?: string;
}

export default function AnimatedSubtitle({
    text,
    delay = 0.85,
    className = "",
}: AnimatedSubtitleProps) {
    const ref = useRef<HTMLParagraphElement>(null);
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

    return (
        <motion.p
            ref={ref}
            className={`animated-subtitle ${className}`}
            initial={{ opacity: 0, y: 14 }}
            animate={seen ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {text}
        </motion.p>
    );
}
