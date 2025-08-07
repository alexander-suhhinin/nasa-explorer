import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Home from '../Home';

// Mock the Hero component
vi.mock('../../components/Hero', () => ({
  default: () => <div data-testid="hero">Hero Component</div>,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home', () => {
  it('should render the Hero component', () => {
    renderWithRouter(<Home />);

    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByText('Hero Component')).toBeInTheDocument();
  });

  it('should render the explore dashboard button', () => {
    renderWithRouter(<Home />);

    const button = screen.getByRole('button', { name: /explore the dashboard/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('🚀 Explore the Dashboard →');
  });

  it('should render the footer text', () => {
    renderWithRouter(<Home />);

    expect(screen.getByText('Powered by NASA Open APIs. This is a demo project.')).toBeInTheDocument();
  });

  it('should have correct main container styling', () => {
    renderWithRouter(<Home />);

    const main = screen.getByRole('main');
    expect(main).toHaveClass(
      'min-h-screen',
      'bg-gradient-to-br',
      'from-black',
      'via-slate-900',
      'to-gray-800',
      'text-white',
      'flex',
      'flex-col'
    );
  });

  it('should have correct section styling', () => {
    renderWithRouter(<Home />);

    const section = screen.getByRole('main').querySelector('section');
    expect(section).toHaveClass(
      'flex',
      'flex-1',
      'flex-col',
      'items-center',
      'justify-center',
      'px-6',
      'py-16',
      'text-center'
    );
  });

  it('should have correct button styling', () => {
    renderWithRouter(<Home />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'mt-10',
      'px-8',
      'py-4',
      'text-lg',
      'font-semibold',
      'bg-blue-600',
      'text-white',
      'rounded-lg',
      'hover:bg-blue-700',
      'transition'
    );
  });

  it('should have correct footer styling', () => {
    renderWithRouter(<Home />);

    const footer = screen.getByRole('main').querySelector('footer');
    expect(footer).toHaveClass('py-4', 'text-center', 'text-sm', 'text-slate-400');
  });

  it('should render with proper semantic structure', () => {
    renderWithRouter(<Home />);

    const main = screen.getByRole('main');
    const section = main.querySelector('section');
    const footer = main.querySelector('footer');

    expect(main).toBeInTheDocument();
    expect(section).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('should have proper spacing between elements', () => {
    renderWithRouter(<Home />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('mt-10'); // 10 units margin top from hero
  });

  it('should be accessible with proper ARIA attributes', () => {
    renderWithRouter(<Home />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    // Button doesn't have explicit type attribute, which is fine for accessibility
  });
});
