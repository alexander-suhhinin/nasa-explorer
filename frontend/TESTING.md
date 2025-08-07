# Frontend Testing Guide

This document describes the testing setup and how to run tests for the NASA Explorer frontend application.

## Testing Stack

- **Vitest** - Fast unit test runner
- **React Testing Library** - Testing utilities for React components
- **jsdom** - DOM environment for testing
- **@testing-library/jest-dom** - Custom matchers for DOM testing

## Test Structure

```
frontend/src/
├── components/
│   ├── __tests__/
│   │   ├── Card.test.tsx
│   │   ├── Hero.test.tsx
│   │   ├── Lightbox.test.tsx
│   │   ├── Sidebar.test.tsx
│   │   ├── Topbar.test.tsx
│   │   └── Layout.test.tsx
│   └── ...
├── pages/
│   ├── __tests__/
│   │   ├── Dashboard.test.tsx
│   │   └── Home.test.tsx
│   └── ...
└── test/
    └── setup.ts
```

## Running Tests

### Install Dependencies

First, install the testing dependencies:

```bash
npm install
```

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:ui
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

## Test Coverage

### Components with Interactive Functionality

#### 1. **Lightbox Component** (`components/Lightbox.tsx`)
- **Tests**: `components/__tests__/Lightbox.test.tsx`
- **Coverage**:
  - Modal rendering when open/closed
  - Close button functionality
  - Image display with correct attributes
  - Portal rendering
  - Styling and accessibility

#### 2. **Sidebar Component** (`components/Sidebar.tsx`)
- **Tests**: `components/__tests__/Sidebar.test.tsx`
- **Coverage**:
  - Navigation link rendering
  - Active state highlighting
  - Route-based styling
  - Logo and branding
  - Responsive behavior

#### 3. **Topbar Component** (`components/Topbar.tsx`)
- **Tests**: `components/__tests__/Topbar.test.tsx`
- **Coverage**:
  - Mobile menu button functionality
  - Desktop navigation links
  - User avatar and dropdown
  - Responsive design
  - Click handlers

#### 4. **Layout Component** (`components/Layout.tsx`)
- **Tests**: `components/__tests__/Layout.test.tsx`
- **Coverage**:
  - Sidebar toggle functionality
  - Mobile overlay behavior
  - Responsive layout structure
  - Footer rendering
  - Content area management

#### 5. **Card Component** (`components/Card.tsx`)
- **Tests**: `components/__tests__/Card.test.tsx`
- **Coverage**:
  - Content rendering
  - Custom styling
  - Skeleton loading states
  - Flex layout behavior
  - Component composition

#### 6. **Hero Component** (`components/Hero.tsx`)
- **Tests**: `components/__tests__/Hero.test.tsx`
- **Coverage**:
  - Content rendering
  - Navigation functionality
  - Styling and responsiveness
  - Accessibility features

### Pages with Interactive Features

#### 1. **Dashboard Page** (`pages/Dashboard.tsx`)
- **Tests**: `pages/__tests__/Dashboard.test.tsx`
- **Coverage**:
  - Card grid rendering
  - Navigation links
  - Responsive design
  - Image display
  - Hover effects
  - Motion animations

#### 2. **Home Page** (`pages/Home.tsx`)
- **Tests**: `pages/__tests__/Home.test.tsx`
- **Coverage**:
  - Hero component integration
  - Navigation functionality
  - Layout structure
  - Styling and responsiveness

## Test Patterns

### Component Testing Patterns

1. **Render Testing**: Verify components render correctly
2. **Interaction Testing**: Test user interactions (clicks, hovers)
3. **State Testing**: Verify component state changes
4. **Styling Testing**: Check CSS classes and styling
5. **Accessibility Testing**: Ensure proper ARIA attributes
6. **Navigation Testing**: Test routing functionality

### Mocking Strategy

- **React Router**: Mocked for navigation testing
- **Framer Motion**: Mocked for animation components
- **Three.js**: Mocked for 3D components
- **React Three Fiber**: Mocked for 3D rendering
- **External APIs**: Mocked for data fetching

### Test Utilities

- **renderWithRouter**: Helper for testing components with routing
- **Mock Components**: Simplified versions for testing
- **Custom Matchers**: Enhanced assertions for DOM testing

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what users see and do
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test Accessibility**: Ensure components are accessible
4. **Mock External Dependencies**: Don't test third-party libraries
5. **Keep Tests Simple**: One assertion per test when possible
6. **Use Descriptive Test Names**: Clear test descriptions

## Adding New Tests

When adding new interactive components:

1. Create test file in appropriate `__tests__` directory
2. Import necessary testing utilities
3. Mock external dependencies
4. Test user interactions
5. Verify styling and accessibility
6. Add to test coverage

## Continuous Integration

Tests are automatically run in CI/CD pipeline to ensure:
- All tests pass before deployment
- Code coverage is maintained
- No regressions are introduced

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure all dependencies are properly mocked
2. **DOM Errors**: Check jsdom configuration in setup
3. **Async Issues**: Use proper async/await patterns
4. **Mock Issues**: Verify mock implementations match real components

### Debugging Tests

```bash
# Run specific test file
npm test -- Lightbox.test.tsx

# Run tests with verbose output
npm test -- --verbose

# Run tests in debug mode
npm test -- --debug
```
