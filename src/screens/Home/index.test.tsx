import { render, screen } from '@testing-library/react';

import HomeScreen from '.';

describe('HomeScreen', () => {
  test('renders learn react link', () => {
    render(<HomeScreen />);

    const surveyLoadingElement = screen.getByTestId('loading-surveys');

    expect(surveyLoadingElement).toBeInTheDocument();
    expect(surveyLoadingElement).toHaveTextContent('Loading Surveys');
  });
});
