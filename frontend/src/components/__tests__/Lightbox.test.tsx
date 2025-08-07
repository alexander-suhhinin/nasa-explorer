import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Lightbox from '../Lightbox';

describe('Lightbox', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    render(
      <Lightbox
        isOpen={false}
        src="/test-image.jpg"
        alt="Test image"
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Test image')).not.toBeInTheDocument();
  });

  it('should not render when src is null', () => {
    render(
      <Lightbox
        isOpen={true}
        src={null}
        alt="Test image"
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Test image')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true and src is provided', () => {
    render(
      <Lightbox
        isOpen={true}
        src="/test-image.jpg"
        alt="Test image"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close lightbox');
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <Lightbox
        isOpen={true}
        src="/test-image.jpg"
        alt="Test image"
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render image with correct src and alt attributes', () => {
    render(
      <Lightbox
        isOpen={true}
        src="/test-image.jpg"
        alt="Test image"
        onClose={mockOnClose}
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  it('should render with correct CSS classes', () => {
    render(
      <Lightbox
        isOpen={true}
        src="/test-image.jpg"
        alt="Test image"
        onClose={mockOnClose}
      />
    );

    const container = screen.getByRole('button').parentElement;
    expect(container).toHaveClass('fixed', 'inset-0', 'bg-black', 'bg-opacity-90', 'flex', 'items-center', 'justify-center', 'z-50');
  });

  it('should render close button with correct styling', () => {
    render(
      <Lightbox
        isOpen={true}
        src="/test-image.jpg"
        alt="Test image"
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button');
    expect(closeButton).toHaveClass('absolute', 'top-4', 'right-4', 'text-white', 'text-3xl', 'font-bold', 'focus:outline-none');
  });

  it('should render image with correct styling', () => {
    render(
      <Lightbox
        isOpen={true}
        src="/test-image.jpg"
        alt="Test image"
        onClose={mockOnClose}
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toHaveClass('max-w-5xl', 'max-h-[90vh]', 'object-contain', 'rounded-lg', 'shadow-xl');
  });
});
