import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock CSS imports to prevent PostCSS processing during tests
vi.mock('*.css', () => ({}));
vi.mock('*.scss', () => ({}));
vi.mock('*.sass', () => ({}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock createPortal for Lightbox component
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: (children: React.ReactNode) => children,
  };
});

// Mock framer-motion for testing
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => React.createElement('div', props, children),
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => React.createElement('button', props, children),
  },
  useFrame: vi.fn(),
}));

// Mock @react-three/fiber and @react-three/drei
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: React.PropsWithChildren<Record<string, unknown>>) => React.createElement('div', { 'data-testid': 'canvas' }, children),
  useFrame: vi.fn(),
}));

vi.mock('@react-three/drei', () => ({
  OrbitControls: () => React.createElement('div', { 'data-testid': 'orbit-controls' }),
  Sphere: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => React.createElement('div', { 'data-testid': 'sphere', ...props }, children),
  Stars: () => React.createElement('div', { 'data-testid': 'stars' }),
  Html: ({ children }: React.PropsWithChildren<Record<string, unknown>>) => React.createElement('div', { 'data-testid': 'html' }, children),
  useTexture: () => ({}),
  Line: () => React.createElement('div', { 'data-testid': 'line' }),
}));

// Mock Three.js
vi.mock('three', () => ({
  Vector3: class {
    x: number;
    y: number;
    z: number;

    constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    lerp() {}
    set() {}
  },
  PerspectiveCamera: class {
    position = { set: vi.fn(), lerp: vi.fn() };
    lookAt = vi.fn();
  },
}));
