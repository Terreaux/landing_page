import React, { useEffect, useRef, useState } from 'react';
import {
  ApertureIcon,
  AppWindowIcon,
  BracesIcon,
  DatabaseIcon,
  FileSpreadsheetIcon,
  GithubIcon,
  GlobeIcon,
  UploadIcon,
} from 'lucide-react';
import { motion } from 'motion/react';

import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

const SourceIcon = ({
  Icon,
  id,
  className,
}: {
  Icon?: React.JSXElementConstructor<{ className?: string }>;
  id?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'inline-flex justify-center rounded-full border border-dashed border-[#bcd69f40] bg-soil-800 p-3 text-[#f7f9f2]',
        className,
      )}
    >
      {Icon && <Icon className="size-5" />}
      {id && (
        <img
          alt={id}
          width={20}
          height={20}
          className="size-5"
          src={`https://zmdrwswxugswzmcokvff.supabase.co/storage/v1/object/public/uicapsule/emerald-template/${id}.svg`}
        />
      )}
    </div>
  );
};

const Lines = ({
  className,
  width,
  height,
  radius,
  strokeWidth,
  highlightStrokeWidth,
  strokeDasharray,
  invert,
}: {
  className?: string;
  width: number;
  height: number;
  radius: number;
  strokeWidth: number;
  highlightStrokeWidth: number;
  strokeDasharray: number;
  invert?: boolean;
}) => {
  const topLinesHeight = Math.round(height / 3);
  const bottomLineHeight = height - topLinesHeight;
  const thirdWidth = Math.round(width / 3);
  const halfWidth = Math.round(width / 2);
  const sixthWidth = Math.round(width / 6);

  const path = `M1 0v${
    topLinesHeight - radius
  }a${radius} ${radius} 0 00${radius} ${radius}h${halfWidth - radius}M${
    width - 1
  } 0v${topLinesHeight - radius}a${radius} ${radius} 0 01-${radius} ${radius}H${
    halfWidth + 1
  }v${bottomLineHeight}m-${sixthWidth} -${height}v${topLinesHeight}m${thirdWidth} -${topLinesHeight}v${topLinesHeight}`;

  const animate = invert
    ? {
        x1: [0, 0],
        y1: [2.5 * height, -2 * height],
        x2: [0, 0],
        y2: [2 * height, -2.5 * height],
      }
    : {
        x1: [0, 0],
        y1: [-2.5 * height, 2 * height],
        x2: [0, 0],
        y2: [-2 * height, 2.5 * height],
      };

  const animateId = `pulse-${invert ? 'inverted' : 'normal'}`;

  return (
    <svg
      className={cn(invert && 'rotate-180', className)}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      <path
        d={path}
        stroke="#ffffff20"
        strokeDasharray={strokeDasharray}
        strokeWidth={strokeWidth}
      />
      <path
        d={path}
        stroke={`url(#${animateId})`}
        strokeLinecap="round"
        strokeWidth={highlightStrokeWidth}
        strokeDasharray={strokeDasharray}
      />
      <defs>
        <motion.linearGradient
          animate={animate}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          id={animateId}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="oklch(0.696 0.17 162.48)" stopOpacity="0" />
          <stop stopColor="oklch(0.696 0.17 162.48)" stopOpacity="0.4" />
          <stop offset="1" stopColor="oklch(0.696 0.17 162.48)" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

const PARALLAX_FACTOR = 0.35;

export function HeroWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setContainerDimensions({
        width: rect.width || 0,
        height: rect.height || 0,
      });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateParallax = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const scrollProgress = Math.max(0, window.scrollY - sectionTop + window.innerHeight * 0.4);
      const offset = -scrollProgress * PARALLAX_FACTOR;
      setTranslateY(offset);
      rafId = 0;
    };

    const handleScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="hero-workflow-shell flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="flex max-h-[254px] w-full max-w-[28rem] flex-col items-center will-change-transform"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        <div className="grid grid-cols-4 items-center justify-center gap-4">
          <SourceIcon Icon={DatabaseIcon} />
          <SourceIcon Icon={FileSpreadsheetIcon} />
          <SourceIcon id="drive" />
          <SourceIcon id="linear" />
          <SourceIcon Icon={GlobeIcon} />
          <SourceIcon Icon={GithubIcon} />
          <SourceIcon id="markdown" />
          <SourceIcon Icon={UploadIcon} />
        </div>
        <div ref={containerRef} className="w-full px-5">
          <Lines
            width={containerDimensions.width || 280}
            height={100}
            radius={5}
            strokeWidth={1}
            highlightStrokeWidth={2}
            strokeDasharray={2}
          />
          <div className="flex justify-center">
            <div className="rounded-full border border-[#bcd69f59] bg-soil-800 p-3 text-[#f7f9f2]">
              <Logo className="size-5" />
            </div>
          </div>
          <Lines
            width={containerDimensions.width || 280}
            height={100}
            radius={5}
            strokeWidth={1}
            highlightStrokeWidth={2}
            strokeDasharray={2}
            invert
          />
        </div>
        <div className="grid grid-cols-4 items-center justify-center gap-4">
          <SourceIcon Icon={AppWindowIcon} />
          <SourceIcon Icon={BracesIcon} />
          <SourceIcon id="slack" />
          <SourceIcon Icon={ApertureIcon} />
        </div>
      </div>
    </div>
  );
}
