import { render, screen } from '@testing-library/react';

import HomeScreen from '.';

describe('HomeScreen', () => {
  test('renders learn react link', () => {
    render(<HomeScreen />);

    const mainHeadingElement = screen.getByTestId('app-main-heading');

    expect(mainHeadingElement).toBeInTheDocument();
    expect(mainHeadingElement).toHaveTextContent('Home Screen');
  });
});
