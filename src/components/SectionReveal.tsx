import { motion, useAnimation, useInView } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

interface SectionRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function SectionReveal({
    children,
    delay = 0,
    className = "",
}: SectionRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay, ease: "easeOut" as const },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
