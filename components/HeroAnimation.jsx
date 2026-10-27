"use client";

import { useEffect, useState } from "react";

export default function HeroAnimation({ texts, speed = 100 }) {
  const initialIndex = texts.reduce(
    (longestIndex, text, index, list) =>
      text.length > list[longestIndex].length ? index : longestIndex,
    0
  );
  const [textIndex, setTextIndex] = useState(initialIndex);
  const [displayText, setDisplayText] = useState(texts[initialIndex]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentText = texts[textIndex];
    const isComplete = !isDeleting && displayText === currentText;
    const isEmpty = isDeleting && displayText === "";

    if (isComplete) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isEmpty) {
      const timeout = setTimeout(() => {
        setTextIndex((index) => (index + 1) % texts.length);
        setIsDeleting(false);
      }, 500);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      const nextLength = displayText.length + (isDeleting ? -1 : 1);
      setDisplayText(currentText.slice(0, nextLength));
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, speed, textIndex, texts]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((visible) => !visible);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <p className="text-3xl sm:text-[42px]">
      <span className="text-transparent sm:bg-gradient-to-r to-foreground bg-gradient-to-t to-70% from-muted-foreground bg-clip-text font-semibold">
        {displayText}
      </span>

      <span className={showCursor ? "text-muted-foreground" : "hidden"}>|</span>
    </p>
  );
}
