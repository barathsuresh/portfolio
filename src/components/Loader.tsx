import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Loader.css";

interface LoaderProps {
    onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"loading" | "done">("loading");

    useEffect(() => {
        // Simulate asset preloading with smooth progress
        const steps = [
            { target: 30, delay: 0, duration: 400 },
            { target: 65, delay: 420, duration: 500 },
            { target: 88, delay: 950, duration: 400 },
            { target: 100, delay: 1380, duration: 300 },
        ];

        let timeouts: ReturnType<typeof setTimeout>[] = [];

        steps.forEach(({ target, delay, duration }) => {
            const t = setTimeout(() => {
                setProgress(target);
                if (target === 100) {
                    const done = setTimeout(() => {
                        setPhase("done");
                        setTimeout(onComplete, 600);
                    }, duration + 100);
                    timeouts.push(done);
                }
            }, delay);
            timeouts.push(t);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase === "loading" && (
                <motion.div
                    className="loader"
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    {/* Ambient glow orb */}
                    <div className="loader__orb" />

                    {/* Logo mark */}
                    <motion.div
                        className="loader__logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        BS
                    </motion.div>

                    {/* Status text */}
                    <motion.p
                        className="loader__text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Booting portfolio
                        <span className="loader__dots">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </span>
                    </motion.p>

                    {/* Progress bar */}
                    <div className="loader__track">
                        <motion.div
                            className="loader__bar"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        />
                    </div>

                    {/* Progress number */}
                    <motion.span
                        className="loader__percent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {progress}%
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
