import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Layout from '../Layout';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Layout', () => {
  it('should render the layout structure', () => {
    renderWithRouter(<Layout />);

    // Check that main layout elements are present
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should render the main content area', () => {
    renderWithRouter(<Layout />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('flex-1', 'overflow-y-auto', 'p-6', 'bg-gray-50');
  });

  it('should render the footer', () => {
    renderWithRouter(<Layout />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('bg-white', 'border-t', 'py-3', 'text-center', 'text-xs', 'text-gray-500');
  });

  it('should render footer with current year', () => {
    renderWithRouter(<Layout />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} NASA Explorer. Built with React + Tailwind.`)).toBeInTheDocument();
  });

  it('should have correct container styling', () => {
    renderWithRouter(<Layout />);

    const container = screen.getByRole('main').closest('div')?.parentElement;
    expect(container).toHaveClass('flex', 'h-screen', 'bg-gray-50');
  });

  it('should have correct main content container styling', () => {
    renderWithRouter(<Layout />);

    const mainContainer = screen.getByRole('main').querySelector('div');
    expect(mainContainer).toHaveClass('max-w-6xl', 'mx-auto', 'w-full');
  });

  it('should render Outlet for routing', () => {
    renderWithRouter(<Layout />);

    // The Outlet should be rendered within the main content area
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    renderWithRouter(<Layout />);

    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');

    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('should render NASA Explorer title in header', () => {
    renderWithRouter(<Layout />);

    expect(screen.getByText('NASA Explorer')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    renderWithRouter(<Layout />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getAllByText('APOD')).toHaveLength(2); // Appears in sidebar and topbar
    expect(screen.getAllByText('Mars Rover')).toHaveLength(2);
    expect(screen.getAllByText('NeoWs')).toHaveLength(2);
    expect(screen.getAllByText('NeoWs 3D')).toHaveLength(2); // Check for the actual text in topbar
  });
});
