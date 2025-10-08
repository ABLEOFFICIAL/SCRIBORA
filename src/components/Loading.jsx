import React from "react";

export default function Loading({
  size = 60,
  color = "#737373",
  speed = 1.2,
  balls = 5,
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          animation: `spinner-rotate ${speed}s linear infinite`,
        }}
      >
        {[...Array(balls)].map((_, i) => (
          <span
            key={i}
            className="orbit-ball"
            style={{
              "--i": i,
              "--count": balls,
              "--color": color,
              width: size * 0.15,
              height: size * 0.15,
            }}
          />
        ))}

        <style>{`
          @keyframes spinner-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .orbit-ball {
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 50%;
            background: var(--color);
            transform: rotate(calc(360deg * var(--i) / var(--count)))
                       translateX(${size / 2 - size * 0.15}px)
                       translate(-50%, -50%);
          }
        `}</style>
      </div>
    </div>
  );
}
