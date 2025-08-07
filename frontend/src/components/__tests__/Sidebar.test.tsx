import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import Sidebar from '../Sidebar';

// Mock useLocation hook
const mockUseLocation = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all navigation links', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });

    renderWithRouter(<Sidebar />);

    expect(screen.getByText('APOD')).toBeInTheDocument();
    expect(screen.getByText('Mars Rover')).toBeInTheDocument();
    expect(screen.getByText('NeoWs')).toBeInTheDocument();
    expect(screen.getByText('NeoWs 3D')).toBeInTheDocument();
  });

  it('should render NASA logo as a link to home', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });

    renderWithRouter(<Sidebar />);

    const logoLink = screen.getByRole('link', { name: /nasa logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('should highlight active link when on APOD page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/apod' });

    renderWithRouter(<Sidebar />);

    const apodLink = screen.getByRole('link', { name: 'APOD' });
    expect(apodLink).toHaveClass('bg-blue-100', 'text-blue-600', 'font-medium');
  });

  it('should highlight active link when on Mars page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/mars' });

    renderWithRouter(<Sidebar />);

    const marsLink = screen.getByRole('link', { name: 'Mars Rover' });
    expect(marsLink).toHaveClass('bg-blue-100', 'text-blue-600', 'font-medium');
  });

  it('should highlight active link when on NeoWs page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/neows' });

    renderWithRouter(<Sidebar />);

    const neowsLink = screen.getByRole('link', { name: 'NeoWs' });
    expect(neowsLink).toHaveClass('bg-blue-100', 'text-blue-600', 'font-medium');
  });

  it('should highlight active link when on NeoWs 3D page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/3d-neows' });

    renderWithRouter(<Sidebar />);

    const neows3dLink = screen.getByRole('link', { name: 'NeoWs 3D' });
    expect(neows3dLink).toHaveClass('bg-blue-100', 'text-blue-600', 'font-medium');
  });

  it('should not highlight links when on different page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/dashboard' });

    renderWithRouter(<Sidebar />);

    const apodLink = screen.getByRole('link', { name: 'APOD' });
    const marsLink = screen.getByRole('link', { name: 'Mars Rover' });
    const neowsLink = screen.getByRole('link', { name: 'NeoWs' });
    const neows3dLink = screen.getByRole('link', { name: 'NeoWs 3D' });

    expect(apodLink).toHaveClass('text-gray-700', 'hover:bg-gray-50');
    expect(marsLink).toHaveClass('text-gray-700', 'hover:bg-gray-50');
    expect(neowsLink).toHaveClass('text-gray-700', 'hover:bg-gray-50');
    expect(neows3dLink).toHaveClass('text-gray-700', 'hover:bg-gray-50');
  });

  it('should have correct href attributes for all links', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });

    renderWithRouter(<Sidebar />);

    expect(screen.getByRole('link', { name: 'APOD' })).toHaveAttribute('href', '/apod');
    expect(screen.getByRole('link', { name: 'Mars Rover' })).toHaveAttribute('href', '/mars');
    expect(screen.getByRole('link', { name: 'NeoWs' })).toHaveAttribute('href', '/neows');
    expect(screen.getByRole('link', { name: 'NeoWs 3D' })).toHaveAttribute('href', '/3d-neows');
  });

  it('should render with correct sidebar styling', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });

    renderWithRouter(<Sidebar />);

    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveClass('w-56', 'bg-white', 'border-r', 'flex', 'flex-col', 'h-full', 'md:h-screen');
  });

  it('should render navigation with correct styling', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });

    renderWithRouter(<Sidebar />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('flex', 'flex-col', 'gap-1', 'mt-4');
  });

  it('should render inactive links with correct hover styling', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });

    renderWithRouter(<Sidebar />);

    const apodLink = screen.getByRole('link', { name: 'APOD' });
    expect(apodLink).toHaveClass('flex', 'items-center', 'gap-3', 'px-6', 'py-2', 'rounded-r-full', 'transition-colors', 'text-gray-700', 'hover:bg-gray-50');
  });

  it('should render active links with correct styling', () => {
    mockUseLocation.mockReturnValue({ pathname: '/apod' });

    renderWithRouter(<Sidebar />);

    const apodLink = screen.getByRole('link', { name: 'APOD' });
    expect(apodLink).toHaveClass('flex', 'items-center', 'gap-3', 'px-6', 'py-2', 'rounded-r-full', 'transition-colors', 'bg-blue-100', 'text-blue-600', 'font-medium');
  });
});
