import React from 'react';

import { render, screen } from '@testing-library/react';

import HomeScreen from '.';

describe('HomeScreen', () => {
  it('renders learn react link', () => {
    render(<HomeScreen />);

    const mainHeadingElement = screen.getByTestId('app-main-heading');

    expect(mainHeadingElement).toBeInTheDocument();
    expect(mainHeadingElement).toHaveTextContent('React Survey Application');
  });
});
