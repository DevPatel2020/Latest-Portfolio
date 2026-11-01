"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

const PLACE = { city: "Vadodara", region: "Gujarat, India", lat: 22.3072, lng: 73.1812, tz: "Asia/Kolkata" };

// cobe centres the longitude equal to phi (radians), so this brings the pin to the front.
const FOCUS_PHI = (PLACE.lng * Math.PI) / 180;
const FOCUS_THETA = (PLACE.lat * Math.PI) / 180 * 0.55;

// Auto-rotation at half the usual cobe pace (0.005 rad per 60fps frame ≈ 0.3 rad/s).
const AUTO_SPEED = 0.3; // rad/s
const DRAG_SENSITIVITY = 0.008; // rad per px

/** Rotating globe pinned on the current city, with a live local clock. */
export default function LocationClock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dark, setDark] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  // Follow the site theme.
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setDark(root.classList.contains("dark"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Live clock.
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Globe.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = canvas.clientWidth || 260;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: FOCUS_PHI,
      theta: FOCUS_THETA,
      dark: dark ? 1 : 0,
      diffuse: dark ? 1.4 : 1.2,
      mapSamples: 16000,
      mapBrightness: dark ? 5 : 6,
      baseColor: dark ? [0.28, 0.26, 0.25] : [1, 1, 1],
      markerColor: [0.863, 0.149, 0.149],
      glowColor: dark ? [0.2, 0.18, 0.17] : [1, 1, 1],
      markers: [{ location: [PLACE.lat, PLACE.lng], size: 0.07 }],
    });

    // cobe v2 has no render callback, so drive rotation ourselves: slow continuous spin
    // that hands over to the pointer while dragging, then glides back to auto-rotation.
    let phi = FOCUS_PHI;
    let theta = FOCUS_THETA;
    let velocity = reduce ? 0 : AUTO_SPEED; // rad/s
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastMove = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      lastMove = performance.now();
      velocity = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      phi -= dx * DRAG_SENSITIVITY;
      // Touch keeps vertical drags for page scrolling; mouse can also tilt the globe.
      if (e.pointerType !== "touch") theta = Math.max(-1.1, Math.min(1.1, theta + dy * DRAG_SENSITIVITY));
      const now = performance.now();
      const dt = Math.max(now - lastMove, 1) / 1000;
      velocity = (-dx * DRAG_SENSITIVITY) / dt;
      lastMove = now;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = "grab";
      // A stale release (finger paused before lifting) shouldn't fling the globe.
      if (performance.now() - lastMove > 100) velocity = 0;
      velocity = Math.max(-6, Math.min(6, velocity));
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.style.cursor = "grab";

    let raf = 0;
    let prev = performance.now();
    let visible = true;
    const frame = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (!dragging) {
        const target = reduce ? 0 : AUTO_SPEED;
        // Ease any flick back down to the resting spin, and the tilt back to its default.
        velocity += (target - velocity) * Math.min(dt * 2.2, 1);
        phi += velocity * dt;
        theta += (FOCUS_THETA - theta) * Math.min(dt * 1.5, 1);
      }
      globe.update({ phi, theta });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Stop rendering while the hero is scrolled out of view, so it never competes with the page.
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    visibility.observe(canvas);

    return () => {
      visibility.disconnect();
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      globe.destroy();
    };
  }, [dark]);

  const time = now
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: PLACE.tz,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now)
    : "--:--:--";
  const date = now
    ? new Intl.DateTimeFormat("en-GB", { timeZone: PLACE.tz, weekday: "short", day: "numeric", month: "short" })
        .format(now)
        .toUpperCase()
    : "";

  return (
    <div className="w-full max-w-[280px]">
      <div className="relative aspect-square w-full">
        <canvas
          ref={canvasRef}
          className="h-full w-full select-none"
          style={{ touchAction: "pan-y" }}
          aria-label={`Interactive globe pinned on ${PLACE.city} — drag to rotate`}
        />
      </div>

      <div className="mt-4 font-jet uppercase">
        <p className="mb-2 flex items-center gap-2 text-[9px] font-bold tracking-[0.3em] text-stone-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" /> Currently in
        </p>
        <p className="text-xs font-bold tracking-wider text-black">
          {PLACE.city}, {PLACE.region}
        </p>
        <p className="mt-2 font-cormorant text-5xl normal-case italic leading-none tabular-nums text-black">{time}</p>
        <p className="mt-2 text-[10px] font-medium tracking-[0.2em] text-stone-500">
          IST · UTC+5:30 {date && `· ${date}`}
        </p>
        <p className="mt-3 text-[9px] font-bold tracking-[0.3em] text-stone-400">Drag the globe ↻</p>
      </div>
    </div>
  );
}
