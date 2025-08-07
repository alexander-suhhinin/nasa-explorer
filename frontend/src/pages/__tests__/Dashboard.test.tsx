import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from '../Dashboard';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Dashboard', () => {
  it('should render all dashboard cards', () => {
    renderWithRouter(<Dashboard />);

    expect(screen.getByText('Astronomy Picture of the Day')).toBeInTheDocument();
    expect(screen.getByText('Mars Rover Photos')).toBeInTheDocument();
    expect(screen.getByText('Near-Earth Objects (NeoWs)')).toBeInTheDocument();
    expect(screen.getByText('NeoWs 3D Visualization')).toBeInTheDocument();
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });

  it('should render card descriptions', () => {
    renderWithRouter(<Dashboard />);

    expect(screen.getByText('Explore daily astronomy images with explanations from NASA.')).toBeInTheDocument();
    expect(screen.getByText("Browse photos captured by NASA's rovers on the Red Planet.")).toBeInTheDocument();
    expect(screen.getByText('Track near-Earth asteroids and check which are potentially hazardous.')).toBeInTheDocument();
    expect(screen.getByText('Interactive 3D view of near-Earth asteroids orbiting our planet.')).toBeInTheDocument();
    expect(screen.getByText('More exciting NASA features on the way!')).toBeInTheDocument();
  });

  it('should render all Explore buttons', () => {
    renderWithRouter(<Dashboard />);

    const exploreButtons = screen.getAllByText('Explore');
    expect(exploreButtons).toHaveLength(5);
  });

  it('should render card images with correct alt text', () => {
    renderWithRouter(<Dashboard />);

    expect(screen.getByAltText('Astronomy Picture of the Day')).toBeInTheDocument();
    expect(screen.getByAltText('Mars Rover Photos')).toBeInTheDocument();
    expect(screen.getByAltText('Near-Earth Objects (NeoWs)')).toBeInTheDocument();
    expect(screen.getByAltText('NeoWs 3D Visualization')).toBeInTheDocument();
    expect(screen.getByAltText('Coming Soon')).toBeInTheDocument();
  });

  it('should render card images with correct src attributes', () => {
    renderWithRouter(<Dashboard />);

    const apodImage = screen.getByAltText('Astronomy Picture of the Day');
    const marsImage = screen.getByAltText('Mars Rover Photos');
    const neowsImage = screen.getByAltText('Near-Earth Objects (NeoWs)');
    const neows3dImage = screen.getByAltText('NeoWs 3D Visualization');
    const comingSoonImage = screen.getByAltText('Coming Soon');

    expect(apodImage).toHaveAttribute('src', '/previews/apod.jpg');
    expect(marsImage).toHaveAttribute('src', '/previews/mars.jpg');
    expect(neowsImage).toHaveAttribute('src', '/previews/neows.jpg');
    expect(neows3dImage).toHaveAttribute('src', '/previews/3d.jpg');
    expect(comingSoonImage).toHaveAttribute('src', '/previews/coming-soon.jpg');
  });

  it('should have correct navigation links for each card', () => {
    renderWithRouter(<Dashboard />);

    // Find all links by looking for Link components
    const links = screen.getAllByRole('link');

    // Find the specific links by looking for the "Explore" buttons within each card
    const apodCard = screen.getByText('Astronomy Picture of the Day').closest('[data-testid="card"]');
    const marsCard = screen.getByText('Mars Rover Photos').closest('[data-testid="card"]');
    const neowsCard = screen.getByText('Near-Earth Objects (NeoWs)').closest('[data-testid="card"]');
    const neows3dCard = screen.getByText('NeoWs 3D Visualization').closest('[data-testid="card"]');
    const comingSoonCard = screen.getByText('Coming Soon').closest('[data-testid="card"]');

    // Find the Explore buttons within each card
    const apodLink = apodCard?.querySelector('a[href="/apod"]');
    const marsLink = marsCard?.querySelector('a[href="/mars"]');
    const neowsLink = neowsCard?.querySelector('a[href="/neows"]');
    const neows3dLink = neows3dCard?.querySelector('a[href="/3d-neows"]');
    const comingSoonLink = comingSoonCard?.querySelector('a');

    expect(apodLink).toBeTruthy();
    expect(marsLink).toBeTruthy();
    expect(neowsLink).toBeTruthy();
    expect(neows3dLink).toBeTruthy();
    expect(comingSoonLink).toBeTruthy();

    expect(apodLink).toHaveAttribute('href', '/apod');
    expect(marsLink).toHaveAttribute('href', '/mars');
    expect(neowsLink).toHaveAttribute('href', '/neows');
    expect(neows3dLink).toHaveAttribute('href', '/3d-neows');
    expect(comingSoonLink).toHaveAttribute('href', '/');
  });

  it('should render cards with correct grid layout classes', () => {
    renderWithRouter(<Dashboard />);

    const gridContainer = screen.getByText('Astronomy Picture of the Day').closest('[class*="grid"]');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4', 'gap-4', 'sm:gap-6', 'auto-rows-fr');
  });

  it('should render cards with hover effects', () => {
    renderWithRouter(<Dashboard />);

    const cards = screen.getAllByText(/Explore/).map(button => button.closest('[class*="hover:scale"]'));

    cards.forEach(card => {
      expect(card).toHaveClass('hover:scale-[1.02]', 'hover:shadow-xl', 'cursor-pointer');
    });
  });

  it('should render cards with correct responsive sizing', () => {
    renderWithRouter(<Dashboard />);

    // Check that cards have responsive column span classes
    const apodCard = screen.getByText('Astronomy Picture of the Day').closest('[class*="col-span"]');
    const marsCard = screen.getByText('Mars Rover Photos').closest('[class*="col-span"]');
    const neowsCard = screen.getByText('Near-Earth Objects (NeoWs)').closest('[class*="col-span"]');
    const neows3dCard = screen.getByText('NeoWs 3D Visualization').closest('[class*="col-span"]');
    const comingSoonCard = screen.getByText('Coming Soon').closest('[class*="col-span"]');

    expect(apodCard).toHaveClass('col-span-1', 'sm:col-span-2');
    expect(marsCard).toHaveClass('col-span-1');
    expect(neowsCard).toHaveClass('col-span-1');
    expect(neows3dCard).toHaveClass('col-span-1', 'sm:col-span-2');
    expect(comingSoonCard).toHaveClass('col-span-1', 'sm:col-span-2');
  });

  it('should render images with correct responsive sizing', () => {
    renderWithRouter(<Dashboard />);

    const images = screen.getAllByRole('img');

    images.forEach(image => {
      expect(image).toHaveClass('h-32', 'sm:h-40', 'object-cover', 'rounded-lg');
    });
  });

  it('should render with motion animation container', () => {
    renderWithRouter(<Dashboard />);

    const motionContainer = screen.getByText('Astronomy Picture of the Day').closest('[class*="grid"]');
    expect(motionContainer).toBeInTheDocument();
  });

  it('should render hidden registration button', () => {
    renderWithRouter(<Dashboard />);

    const registerButton = screen.getByText('Register for more');
    expect(registerButton).toHaveClass('hidden');
  });
});
