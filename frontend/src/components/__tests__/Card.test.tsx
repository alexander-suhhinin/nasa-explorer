import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card, { SkeletonCard } from '../Card';

describe('Card', () => {
  it('should render children content', () => {
    render(
      <Card>
        <h2>Test Title</h2>
        <p>Test content</p>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render with default styling', () => {
    render(
      <Card>
        <div>Test content</div>
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toHaveClass(
      'bg-white',
      'rounded-lg',
      'shadow',
      'p-6',
      'mb-6',
      'flex',
      'flex-col',
      'justify-between'
    );
  });

  it('should apply custom className', () => {
    render(
      <Card className="custom-class test-class">
        <div>Test content</div>
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class', 'test-class');
  });

  it('should render without custom className', () => {
    render(
      <Card>
        <div>Test content</div>
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
  });

  it('should render complex nested content', () => {
    render(
      <Card>
        <header>
          <h1>Header</h1>
        </header>
        <main>
          <section>
            <h2>Section Title</h2>
            <p>Section content</p>
          </section>
        </main>
        <footer>
          <button>Action</button>
        </footer>
      </Card>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByText('Section content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('should maintain flex layout structure', () => {
    render(
      <Card>
        <div>Top content</div>
        <div>Bottom content</div>
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('flex', 'flex-col', 'justify-between');
  });
});

describe('SkeletonCard', () => {
  it('should render skeleton loading state', () => {
    render(<SkeletonCard />);

    const skeleton = screen.getByTestId('skeleton-card');
    expect(skeleton).toHaveClass(
      'bg-white',
      'rounded-lg',
      'shadow',
      'p-6',
      'mb-6',
      'animate-pulse',
      'space-y-4'
    );
  });

  it('should render skeleton elements', () => {
    render(<SkeletonCard />);

    const skeletonElements = screen.getAllByTestId(/skeleton-element/);
    expect(skeletonElements).toHaveLength(5);
  });

  it('should apply custom className to skeleton', () => {
    render(<SkeletonCard className="skeleton-custom" />);

    const skeleton = screen.getByTestId('skeleton-card');
    expect(skeleton).toHaveClass('skeleton-custom');
  });

  it('should render skeleton with correct element styling', () => {
    render(<SkeletonCard />);

    const skeletonElements = screen.getAllByTestId(/skeleton-element/);

    // Check first skeleton element (title)
    expect(skeletonElements[0]).toHaveClass('h-6', 'bg-gray-200', 'rounded', 'w-1/3');

    // Check second skeleton element (subtitle)
    expect(skeletonElements[1]).toHaveClass('h-4', 'bg-gray-200', 'rounded', 'w-2/3');

    // Check third skeleton element (image)
    expect(skeletonElements[2]).toHaveClass('h-48', 'bg-gray-200', 'rounded');

    // Check fourth skeleton element (text)
    expect(skeletonElements[3]).toHaveClass('h-4', 'bg-gray-200', 'rounded', 'w-full');

    // Check fifth skeleton element (text-2)
    expect(skeletonElements[4]).toHaveClass('h-4', 'bg-gray-200', 'rounded', 'w-5/6');
  });

  it('should render without custom className', () => {
    render(<SkeletonCard />);

    const skeleton = screen.getByTestId('skeleton-card');
    expect(skeleton).toBeInTheDocument();
  });
});
