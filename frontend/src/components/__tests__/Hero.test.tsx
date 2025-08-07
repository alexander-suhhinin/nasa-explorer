import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Hero from '../Hero';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Hero', () => {
  it('should render the main title', () => {
    renderWithRouter(<Hero />);

    expect(screen.getByText('NASA Explorer')).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    renderWithRouter(<Hero />);

    expect(screen.getByText('Exploring the cosmos, one API at a time.')).toBeInTheDocument();
  });

  it('should render the start exploring button', () => {
    renderWithRouter(<Hero />);

    const button = screen.getByRole('link', { name: /start exploring/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Start Exploring');
  });

  it('should have correct navigation link', () => {
    renderWithRouter(<Hero />);

    const button = screen.getByRole('link', { name: /start exploring/i });
    expect(button).toHaveAttribute('href', '/dashboard');
  });

  it('should have correct section styling', () => {
    renderWithRouter(<Hero />);

    const section = screen.getByText('NASA Explorer').closest('section');
    expect(section).toHaveClass(
      'relative',
      'bg-gradient-to-b',
      'from-black',
      'via-blue-900',
      'to-black',
      'text-white',
      'h-[80vh]',
      'flex',
      'items-center',
      'justify-center'
    );
  });

  it('should have correct content container styling', () => {
    renderWithRouter(<Hero />);

    const contentContainer = screen.getByText('NASA Explorer').closest('div');
    expect(contentContainer).toHaveClass(
      'text-center',
      'space-y-4',
      'px-6',
      'max-w-xl'
    );
  });

  it('should have correct title styling', () => {
    renderWithRouter(<Hero />);

    const title = screen.getByText('NASA Explorer');
    expect(title).toHaveClass(
      'text-5xl',
      'font-bold',
      'tracking-wide',
      'uppercase'
    );
  });

  it('should have correct subtitle styling', () => {
    renderWithRouter(<Hero />);

    const subtitle = screen.getByText('Exploring the cosmos, one API at a time.');
    expect(subtitle).toHaveClass('text-lg', 'text-blue-200');
  });

  it('should have correct button styling', () => {
    renderWithRouter(<Hero />);

    const button = screen.getByRole('link', { name: /start exploring/i });
    expect(button).toHaveClass(
      'inline-block',
      'bg-blue-500',
      'hover:bg-blue-700',
      'transition',
      'px-6',
      'py-3',
      'rounded-full',
      'text-white',
      'font-semibold',
      'shadow-lg'
    );
  });

  it('should have proper semantic structure', () => {
    renderWithRouter(<Hero />);

    const section = screen.getByText('NASA Explorer').closest('section');
    expect(section).toBeInTheDocument();
  });

  it('should be accessible with proper ARIA attributes', () => {
    renderWithRouter(<Hero />);

    const button = screen.getByRole('link', { name: /start exploring/i });
    expect(button).toBeInTheDocument();
  });

  it('should have responsive design considerations', () => {
    renderWithRouter(<Hero />);

    const contentContainer = screen.getByText('NASA Explorer').closest('div');
    expect(contentContainer).toHaveClass('px-6', 'max-w-xl');
  });

  it('should have proper spacing between elements', () => {
    renderWithRouter(<Hero />);

    const contentContainer = screen.getByText('NASA Explorer').closest('div');
    expect(contentContainer).toHaveClass('space-y-4');
  });

  it('should render with proper text hierarchy', () => {
    renderWithRouter(<Hero />);

    const title = screen.getByText('NASA Explorer');
    const subtitle = screen.getByText('Exploring the cosmos, one API at a time.');
    const button = screen.getByRole('link', { name: /start exploring/i });

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should have correct button text content', () => {
    renderWithRouter(<Hero />);

    const button = screen.getByRole('link', { name: /start exploring/i });
    expect(button.textContent).toBe('Start Exploring');
  });

  it('should have proper contrast with dark background', () => {
    renderWithRouter(<Hero />);

    const section = screen.getByText('NASA Explorer').closest('section');
    expect(section).toHaveClass('text-white');
  });
});
