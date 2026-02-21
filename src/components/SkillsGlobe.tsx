import { useEffect, useMemo, useRef } from "react";
import { skills } from "../data";
import "./SkillsGlobe.css";

// Muted, OLED-safe palette — low saturation, easy on the eyes.
// Colors are assigned by category ORDER, not by name.
// Add more entries here only if you create more than 10 categories.
const MUTED_PALETTE = [
    "#7dcfba", // soft teal
    "#8ab4f8", // periwinkle blue
    "#c3a8f0", // soft lavender
    "#a8d8a0", // sage green
    "#f0b87a", // warm amber
    "#e8a0b0", // dusty rose
    "#80cddc", // sky blue
    "#b0c4a8", // muted olive
    "#d4b896", // warm sand
    "#9ecfc0", // seafoam
];

// Derive one color per category in the order they appear in data.ts.
// Adding a new skills category in data.ts automatically picks the next palette color.
const CAT_COLORS: Record<string, string> = Object.fromEntries(
    skills.map((s, i) => [s.category, MUTED_PALETTE[i % MUTED_PALETTE.length]])
);

interface SkillTag {
    name: string;
    category: string;
    color: string;
}

const allSkills: SkillTag[] = skills.flatMap((cat) =>
    cat.items.map((item) => ({
        name: item.name,
        category: cat.category,
        color: CAT_COLORS[cat.category] ?? "#7dcfba",
    }))
);

// Fibonacci sphere — distributes N points evenly on a unit sphere
function fibonacciSphere(count: number) {
    const phi = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: count }, (_, i) => {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = phi * i;
        return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
}

export default function SkillsGlobe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const tagsRef = useRef<HTMLDivElement[]>([]);
    const radiusRef = useRef(220);

    // Spherical positions (unit sphere)
    const positions = useMemo(() => fibonacciSphere(allSkills.length), []);

    // Rotation state
    const rotX = useRef(0.2);  // slight tilt
    const rotY = useRef(0);
    const velX = useRef(0);
    const velY = useRef(0.003); // auto-rotate speed
    const dragging = useRef(false);
    const lastMouse = useRef({ x: 0, y: 0 });
    const rafId = useRef<number>(0);

    // Responsive radius: scales based on window width
    const updateRadius = () => {
        const width = typeof window !== "undefined" ? window.innerWidth : 768;
        if (width < 375) radiusRef.current = 100;    // very small phone
        else if (width < 480) radiusRef.current = 120;    // small phone
        else if (width < 768) radiusRef.current = 140;    // larger phone/tablet
        else radiusRef.current = 220; // desktop
    };

    function applyPositions() {
        const cosX = Math.cos(rotX.current);
        const sinX = Math.sin(rotX.current);
        const cosY = Math.cos(rotY.current);
        const sinY = Math.sin(rotY.current);
        const RADIUS = radiusRef.current;

        tagsRef.current.forEach((el, i) => {
            if (!el) return;
            const { x: ox, y: oy, z: oz } = positions[i];

            // Rotate around Y axis
            const x1 = ox * cosY + oz * sinY;
            const z1 = -ox * sinY + oz * cosY;

            // Rotate around X axis
            const y2 = oy * cosX - z1 * sinX;
            const z2 = oy * sinX + z1 * cosX;

            const sx = x1 * RADIUS;
            const sy = y2 * RADIUS;
            // z2 in [-1, 1]

            // Perspective scale: front items bigger
            const perspective = 400;
            const scale = perspective / (perspective - z2 * RADIUS * 0.5);
            const opacity = 0.35 + ((z2 + 1) / 2) * 0.65;

            el.style.transform = `translate(-50%, -50%) translate(${sx}px, ${sy}px) scale(${scale.toFixed(3)})`;
            el.style.opacity = opacity.toFixed(3);
            el.style.zIndex = String(Math.round(z2 * 100 + 100));
        });
    }

    function tick() {
        if (!dragging.current) {
            velY.current *= 0.98;
            velX.current *= 0.98;
            // Drift back to auto-rotate if velocity near zero
            if (Math.abs(velY.current) < 0.002) velY.current = 0.003;
            rotY.current += velY.current;
            rotX.current += velX.current;
        }
        applyPositions();
        rafId.current = requestAnimationFrame(tick);
    }

    useEffect(() => {
        // Set initial radius
        updateRadius();
        
        rafId.current = requestAnimationFrame(tick);

        const container = containerRef.current;
        if (!container) return;

        function onMouseDown(e: MouseEvent) {
            dragging.current = true;
            lastMouse.current = { x: e.clientX, y: e.clientY };
            velX.current = 0;
            velY.current = 0;
        }

        function onMouseMove(e: MouseEvent) {
            if (!dragging.current) return;
            const dx = e.clientX - lastMouse.current.x;
            const dy = e.clientY - lastMouse.current.y;
            velY.current = dx * 0.004;
            velX.current = dy * 0.004;
            rotY.current += velY.current;
            rotX.current += velX.current;
            lastMouse.current = { x: e.clientX, y: e.clientY };
        }

        function onMouseUp() {
            dragging.current = false;
        }

        // Touch
        function onTouchStart(e: TouchEvent) {
            dragging.current = true;
            lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            velX.current = 0;
            velY.current = 0;
        }

        function onTouchMove(e: TouchEvent) {
            if (!dragging.current) return;
            const dx = e.touches[0].clientX - lastMouse.current.x;
            const dy = e.touches[0].clientY - lastMouse.current.y;
            velY.current = dx * 0.004;
            velX.current = dy * 0.004;
            rotY.current += velY.current;
            rotX.current += velX.current;
            lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }

        function onResize() {
            updateRadius();
        }

        container.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        container.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onMouseUp);
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(rafId.current);
            container.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            container.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onMouseUp);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div className="globe-wrap">
            {/* Legend */}
            <div className="globe-legend">
                {Object.entries(CAT_COLORS).map(([cat, color]) => (
                    <span key={cat} className="globe-legend__item">
                        <span className="globe-legend__dot" style={{ background: color }} />
                        {cat}
                    </span>
                ))}
            </div>

            {/* Hint */}
            <p className="globe-hint">Drag to rotate</p>

            {/* Globe stage */}
            <div className="globe-stage" ref={containerRef}>
                {allSkills.map((skill, i) => (
                    <div
                        key={skill.name}
                        ref={(el) => { if (el) tagsRef.current[i] = el; }}
                        className="globe-tag"
                        style={{ color: skill.color, borderColor: `${skill.color}30` }}
                    >
                        {skill.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
