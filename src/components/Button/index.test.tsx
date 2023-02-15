import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '.';

const handleButtonClick = jest.fn();

describe('Button', () => {
  test('renders a button on the page', () => {
    render(<Button text="Click me" type="button" onButtonClick={handleButtonClick} />);

    const buttonComponent = screen.getByRole('button', { name: 'Click me' });

    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveAttribute('type', 'button');
  });

  test('renders a button with the given class', () => {
    render(<Button text="Click me" type="button" className="primary" onButtonClick={handleButtonClick} />);

    const buttonComponent = screen.getByRole('button', { name: 'Click me' });

    expect(buttonComponent).toHaveClass('primary');
  });

  test('when clicked, calls onButtonClick handler', async () => {
    render(<Button text="Click me" type="button" onButtonClick={handleButtonClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'Click me' }));

    expect(handleButtonClick).toBeCalledTimes(1);
  });
});
