import { useEffect, useState } from "react";
import "./AvatarBoil.css";

const TWO_PI = Math.PI * 2;
const N = 12;

function wobblyPath(cx: number, cy: number, rBase: number, wobble: number[]): string {
    const pts = Array.from({ length: N }, (_, i) => {
        const θ = (i / N) * TWO_PI - Math.PI / 2;
        const r = rBase + wobble[i];
        return { x: cx + r * Math.cos(θ), y: cy + r * Math.sin(θ) };
    });
    let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < N; i++) {
        const p0 = pts[(i - 1 + N) % N];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % N];
        const p3 = pts[(i + 2) % N];
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return d + " Z";
}

const CX = 150, CY = 150;

// ── Subtle wobble: ±6-10px ──────────────────────────────────────────────────
// The shape reads as a circle. Chalk displacement filter adds the
// visible hand-drawn roughness on the stroke edges (not path distortion).

const RING1_WOBBLES = [
    [2, -1, 3, -2, 1, -3, 1, 2, -1, 3, -2, 1],
    [-1, 2, -2, 3, -3, 2, 2, -1, 3, -2, 1, -2],
    [3, -2, 1, -1, 2, -1, 3, -2, 1, -3, 1, 2],
    [-2, 3, -2, 1, -1, 2, -2, 3, -3, 2, 2, -1],
];

const RING2_WOBBLES = [
    [-2, 3, -1, 2, -1, 3, -2, 1, 3, -2, 1, -3],
    [1, -2, 3, -1, 3, -1, 2, -2, -1, 3, -2, 1],
    [3, -1, -2, 1, -1, 3, -1, 3, -2, 1, 3, -2],
    [-1, 3, -2, 1, -3, 2, 3, -1, 2, -1, 3, -2],
];

const R1 = 125; // inner ring
const R2 = 130; // outer ring — visibly larger but not extreme

const FRAMES_R1 = RING1_WOBBLES.map(w => wobblyPath(CX, CY, R1, w));
const FRAMES_R2 = RING2_WOBBLES.map(w => wobblyPath(CX, CY, R2, w));

const FPS = 10;
const INTERVAL = Math.round(1000 / FPS);

export default function AvatarBoil({ size = 310 }: { size?: number }) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setFrame(f => (f + 1) % 4), INTERVAL);
        return () => clearInterval(id);
    }, []);

    return (
        <svg
            className="avatar-boil"
            width={size}
            height={size}
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <defs>
                {/* Chalk texture — displacement roughens the stroke edges */}
                <filter id="chalk" x="-8%" y="-8%" width="116%" height="116%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="4"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="4"
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="displaced"
                    />
                    <feGaussianBlur in="displaced" stdDeviation="0.3" />
                </filter>
            </defs>

            {/* Inner ring — thick chalk stroke, subtle wobble */}
            <path
                d={FRAMES_R1[frame]}
                fill="none"
                stroke="#f0f0f0"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.88}
                filter="url(#chalk)"
            />

            {/* Outer ring — slightly thinner, a touch more transparent */}
            <path
                d={FRAMES_R2[frame]}
                fill="none"
                stroke="#e8e8e8"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.55}
                filter="url(#chalk)"
            />
        </svg>
    );
}
