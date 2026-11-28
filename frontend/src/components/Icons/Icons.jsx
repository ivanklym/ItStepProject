import React from 'react';

/**
 * Small, dependency-free icon set for the dashboard.
 * All icons inherit `currentColor` and expose a decorative,
 * accessible-friendly default (aria-hidden + focusable=false).
 */
const Svg = ({ children, size = 20, strokeWidth = 1.75, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
);

export const SparkleIcon = ({ size = 20, ...props }) => (
  <Svg size={size} {...props}>
    <path d="M12 2.75 13.7 8.3 19.25 10 13.7 11.7 12 17.25 10.3 11.7 4.75 10 10.3 8.3 12 2.75Z" />
    <path d="m18.6 15.5.7 2.2 2.2.7-2.2.7-.7 2.2-.7-2.2-2.2-.7 2.2-.7.7-2.2Z" />
  </Svg>
);

export const HomeIcon = ({ size = 20, ...props }) => (
  <Svg size={size} {...props}>
    <path d="M3.75 10.25 12 3.5l8.25 6.75" />
    <path d="M5.75 9.25V20.5h12.5V9.25" />
    <path d="M9.5 20.5v-5.25h5v5.25" />
  </Svg>
);

export const SearchIcon = ({ size = 20, ...props }) => (
  <Svg size={size} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.25 4.25" />
  </Svg>
);

export const ApplicationsIcon = ({ size = 20, ...props }) => (
  <Svg size={size} {...props}>
    <rect x="5" y="4.25" width="14" height="16.25" rx="2.75" />
    <path d="M9 4.25v-1.5h6v1.5" />
    <path d="m9 12.5 2.05 2.05L15 10.75" />
  </Svg>
);

export const UserIcon = ({ size = 20, ...props }) => (
  <Svg size={size} {...props}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20.25c.7-3.6 3.4-5.5 7-5.5s6.3 1.9 7 5.5" />
  </Svg>
);

export const BellIcon = ({ size = 20, ...props }) => (
  <Svg size={size} {...props}>
    <path d="M18 9.25a6 6 0 0 0-12 0c0 5.5-2.25 6.75-2.25 6.75h16.5S18 14.75 18 9.25Z" />
    <path d="M10 19.5a2.2 2.2 0 0 0 4 0" />
  </Svg>
);

export const CalendarIcon = ({ size = 20, ...props }) => (
  <Svg size={size} {...props}>
    <rect x="4" y="5.5" width="16" height="15" rx="3" />
    <path d="M8 3.25v4.5M16 3.25v4.5M4 10.25h16" />
  </Svg>
);

export const PinIcon = ({ size = 14, ...props }) => (
  <Svg size={size} strokeWidth={1.9} {...props}>
    <path d="M12 21s7-6.1 7-11.8a7 7 0 1 0-14 0C5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.2" r="2.45" />
  </Svg>
);

export const HeartIcon = ({ size = 20, filled = false, ...props }) => (
  <Svg size={size} fill={filled ? 'currentColor' : 'none'} {...props}>
    <path d="M20.7 5.1a5.35 5.35 0 0 0-7.57 0L12 6.23 10.87 5.1a5.35 5.35 0 1 0-7.57 7.57L12 21.35l8.7-8.68a5.35 5.35 0 0 0 0-7.57Z" />
  </Svg>
);
