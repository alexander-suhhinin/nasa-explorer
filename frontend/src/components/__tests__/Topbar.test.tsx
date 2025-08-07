import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Topbar from '../Topbar';

describe('Topbar', () => {
  it('should render the NASA Explorer title', () => {
    render(<Topbar />);

    expect(screen.getByText('NASA Explorer')).toBeInTheDocument();
  });

  it('should render the mobile menu button', () => {
    render(<Topbar />);

    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveClass('md:hidden');
  });

  it('should render navigation links on desktop', () => {
    render(<Topbar />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('APOD')).toBeInTheDocument();
    expect(screen.getByText('Mars Rover')).toBeInTheDocument();
    expect(screen.getByText('NeoWs')).toBeInTheDocument();
    expect(screen.getByText('NeoWs 3D')).toBeInTheDocument();
  });

  it('should render user avatar', () => {
    render(<Topbar />);

    expect(screen.getByText('U')).toBeInTheDocument();
  });

  it('should call onMenuClick when menu button is clicked', () => {
    const mockOnMenuClick = vi.fn();
    render(<Topbar onMenuClick={mockOnMenuClick} />);

    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onMenuClick when not provided', () => {
    render(<Topbar />);

    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    // Should not throw error when onMenuClick is not provided
    expect(menuButton).toBeInTheDocument();
  });

  it('should have correct header styling', () => {
    render(<Topbar />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass(
      'h-16',
      'bg-white',
      'border-b',
      'px-6',
      'flex',
      'items-center',
      'justify-between',
      'shadow-sm'
    );
  });

  it('should have correct navigation styling', () => {
    render(<Topbar />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('hidden', 'md:flex', 'items-center', 'gap-6', 'ml-6', 'text-sm', 'font-medium', 'text-gray-600');
  });

  it('should have correct navigation links with hover effects', () => {
    render(<Topbar />);

    const dashboardLink = screen.getByText('Dashboard');
    const apodLink = screen.getByText('APOD');
    const marsLink = screen.getByText('Mars Rover');
    const neowsLink = screen.getByText('NeoWs');
    const neows3dLink = screen.getByText('NeoWs 3D');

    [dashboardLink, apodLink, marsLink, neowsLink, neows3dLink].forEach(link => {
      expect(link).toHaveClass('hover:text-blue-600', 'transition-colors');
    });
  });

  it('should have correct navigation link hrefs', () => {
    render(<Topbar />);

    expect(screen.getByText('Dashboard')).toHaveAttribute('href', '/');
    expect(screen.getByText('APOD')).toHaveAttribute('href', '/apod');
    expect(screen.getByText('Mars Rover')).toHaveAttribute('href', '/mars');
    expect(screen.getByText('NeoWs')).toHaveAttribute('href', '/neows');
    expect(screen.getByText('NeoWs 3D')).toHaveAttribute('href', '/3d-neows');
  });

  it('should have correct menu button styling', () => {
    render(<Topbar />);

    const menuButton = screen.getByRole('button');
    expect(menuButton).toHaveClass(
      'md:hidden',
      'flex',
      'items-center',
      'justify-center',
      'w-9',
      'h-9',
      'rounded',
      'hover:bg-gray-100'
    );
  });

  it('should have correct title styling', () => {
    render(<Topbar />);

    const title = screen.getByText('NASA Explorer');
    expect(title).toHaveClass('font-bold', 'text-gray-800', 'text-lg');
  });

  it('should have correct user avatar styling', () => {
    render(<Topbar />);

    const avatar = screen.getByText('U').closest('div');
    expect(avatar).toHaveClass('w-10', 'h-10', 'rounded-full', 'bg-gray-300', 'flex', 'items-center', 'justify-center', 'cursor-pointer', 'shadow');
  });

  it('should render dropdown menu items', () => {
    render(<Topbar />);

    expect(screen.getByText('Profile (soon)')).toBeInTheDocument();
    expect(screen.getByText('Settings (soon)')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should have correct dropdown menu styling', () => {
    render(<Topbar />);

    const profileItem = screen.getByText('Profile (soon)');
    const settingsItem = screen.getByText('Settings (soon)');
    const logoutItem = screen.getByText('Logout');

    expect(profileItem).toHaveClass('px-4', 'py-2', 'text-gray-600', 'text-sm', 'hover:bg-gray-50');
    expect(settingsItem).toHaveClass('px-4', 'py-2', 'text-gray-600', 'text-sm', 'hover:bg-gray-50');
    expect(logoutItem).toHaveClass('px-4', 'py-2', 'text-gray-400', 'text-sm', 'cursor-not-allowed');
  });

  it('should render hamburger menu icon', () => {
    render(<Topbar />);

    const menuButton = screen.getByRole('button');
    const svg = menuButton.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('w-6', 'h-6', 'text-gray-700');
  });

  it('should have proper semantic structure', () => {
    render(<Topbar />);

    const header = screen.getByRole('banner');
    const nav = screen.getByRole('navigation');
    const menuButton = screen.getByRole('button');

    expect(header).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
    expect(menuButton).toBeInTheDocument();
  });
});
