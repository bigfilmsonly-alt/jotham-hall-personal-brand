# Animated Sphere Component

A rotating 3D sphere rendered with ASCII characters on an HTML canvas. The sphere rotates continuously on both X and Y axes, creating a mesmerizing visual effect using Unicode block characters for depth perception.

## Installation

Copy `animated-sphere.tsx` into your project's components folder.

### Dependencies

- React 18+
- TypeScript (optional but recommended)

No external dependencies required.

## Usage

```tsx
import { AnimatedSphere } from "@/components/animated-sphere";

export default function Page() {
  return (
    <div className="w-[400px] h-[400px]">
      <AnimatedSphere />
    </div>
  );
}
```

The component fills its parent container. Set dimensions on the parent element to control the sphere size.

## How It Works

1. **Character Set**: Uses Unicode block characters (`░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯`) to represent depth
2. **3D Projection**: Generates points on a sphere using spherical coordinates (phi, theta)
3. **Rotation**: Applies Y-axis and X-axis rotation matrices over time
4. **Depth Sorting**: Points are sorted by Z-coordinate and rendered back-to-front
5. **Alpha Mapping**: Opacity increases for points closer to the viewer

## Customization

| Property | Location | Default | Description |
|----------|----------|---------|-------------|
| `chars` | Line 15 | `"░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯"` | Characters used for depth visualization |
| `radius` | Line 35 | `0.525 * min(width, height)` | Sphere size relative to container |
| `font` | Line 37 | `"12px monospace"` | Font for rendering characters |
| `phi step` | Line 43 | `0.15` | Horizontal point density |
| `theta step` | Line 44 | `0.15` | Vertical point density |
| `rotY speed` | Line 50 | `time * 0.3` | Y-axis rotation speed |
| `rotX speed` | Line 55 | `time * 0.2` | X-axis rotation speed |
| `time increment` | Line 78 | `0.02` | Overall animation speed |

### Example: Slower, Larger Sphere

```tsx
// Modify these values in the component:
const radius = Math.min(rect.width, rect.height) * 0.7; // Larger
const rotY = time * 0.1; // Slower Y rotation
const rotX = time * 0.05; // Slower X rotation
```

### Example: Different Characters

```tsx
const chars = "·•●◉◎"; // Dot-based characters
// or
const chars = "0123456789"; // Numbers
```

## Component Code

```tsx
"use client";

import { useEffect, useRef } from "react";

export function AnimatedSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.525;

      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const points: { x: number; y: number; z: number; char: string }[] = [];

      for (let phi = 0; phi < Math.PI * 2; phi += 0.15) {
        for (let theta = 0; theta < Math.PI; theta += 0.15) {
          const x = Math.sin(theta) * Math.cos(phi + time * 0.5);
          const y = Math.sin(theta) * Math.sin(phi + time * 0.5);
          const z = Math.cos(theta);

          const rotY = time * 0.3;
          const newX = x * Math.cos(rotY) - z * Math.sin(rotY);
          const newZ = x * Math.sin(rotY) + z * Math.cos(rotY);

          const rotX = time * 0.2;
          const newY = y * Math.cos(rotX) - newZ * Math.sin(rotX);
          const finalZ = y * Math.sin(rotX) + newZ * Math.cos(rotX);

          const depth = (finalZ + 1) / 2;
          const charIndex = Math.floor(depth * (chars.length - 1));

          points.push({
            x: centerX + newX * radius,
            y: centerY + newY * radius,
            z: finalZ,
            char: chars[charIndex],
          });
        }
      }

      points.sort((a, b) => a.z - b.z);

      points.forEach((point) => {
        const alpha = 0.2 + (point.z + 1) * 0.4;
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fillText(point.char, point.x, point.y);
      });

      time += 0.02;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
```

## License

MIT
