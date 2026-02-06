import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface RunawayButtonProps {
  onCatchClick: () => void;
}

const MAX_ESCAPES = 5;

const RunawayButton = ({ onCatchClick }: RunawayButtonProps) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [btnSize, setBtnSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const escapeCount = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Capture button size before it leaves the flow
  useEffect(() => {
    if (buttonRef.current && !isRunning) {
      setBtnSize({
        w: buttonRef.current.offsetWidth,
        h: buttonRef.current.offsetHeight,
      });
    }
  }, [isRunning]);

  const runAway = useCallback(() => {
    if (escapeCount.current >= MAX_ESCAPES) return;
    escapeCount.current += 1;

    const btn = buttonRef.current;
    const btnW = btn ? btn.offsetWidth : 140;
    const btnH = btn ? btn.offsetHeight : 52;

    const vw = window.visualViewport?.width ?? window.innerWidth;
    const vh = window.visualViewport?.height ?? window.innerHeight;

    // Get "Да" button rect to avoid overlapping it
    const yesBtn = document.querySelector(".valentine-btn-yes");
    const yesRect = yesBtn?.getBoundingClientRect() ?? null;

    const pad = 24;
    const maxX = Math.max(pad, vw - btnW - pad);
    const maxY = Math.max(pad, vh - btnH - pad);

    // Try up to 20 times to find a position that doesn't overlap "Да"
    let x = 0, y = 0;
    for (let i = 0; i < 20; i++) {
      x = Math.floor(Math.random() * (maxX - pad)) + pad;
      y = Math.floor(Math.random() * (maxY - pad)) + pad;

      if (!yesRect) break;

      // Check overlap with some margin
      const margin = 12;
      const overlaps =
        x < yesRect.right + margin &&
        x + btnW > yesRect.left - margin &&
        y < yesRect.bottom + margin &&
        y + btnH > yesRect.top - margin;

      if (!overlaps) break;
    }

    setIsRunning(true);
    setPosition({ x, y });

    if (escapeCount.current >= MAX_ESCAPES) {
      setStopped(true);
    }
  }, []);

  const handleClick = () => {
    onCatchClick();
    setIsRunning(false);
    setPosition(null);
    escapeCount.current = 0;
    setStopped(false);
  };

  // Portal-rendered escaped button
  const escapedButton = isRunning && position ? createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <button
        ref={buttonRef}
        className="valentine-btn-no select-none"
        onMouseEnter={stopped ? undefined : runAway}
        onTouchStart={
          stopped
            ? undefined
            : (e) => {
                e.preventDefault();
                runAway();
              }
        }
        onClick={handleClick}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          pointerEvents: "auto",
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      >
        Нет 😅
      </button>
    </div>,
    document.body
  ) : null;

  // Inline button (or invisible placeholder to keep card size)
  return (
    <>
      {!isRunning ? (
        <button
          ref={buttonRef}
          className="valentine-btn-no select-none"
          onMouseEnter={stopped ? undefined : runAway}
          onTouchStart={
            stopped
              ? undefined
              : (e) => {
                  e.preventDefault();
                  runAway();
                }
          }
          onClick={handleClick}
        >
          Нет 😅
        </button>
      ) : (
        /* Invisible placeholder keeps the card from shrinking */
        <div
          style={{
            width: btnSize.w || "auto",
            height: btnSize.h || "auto",
            visibility: "hidden",
          }}
          aria-hidden="true"
        />
      )}
      {escapedButton}
    </>
  );
};

export default RunawayButton;
