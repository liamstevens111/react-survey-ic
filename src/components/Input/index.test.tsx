import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '.';

const handleInputChange = jest.fn();

describe('Input', () => {
  test('renders an Input of type Text on the page with the correct class', () => {
    render(<Input name="email" label="email" type="text" className="input-class" onInputChange={handleInputChange} />);

    const inputComponent = screen.getByRole('textbox', { name: 'email' });

    expect(inputComponent).toBeInTheDocument();
    expect(inputComponent).toHaveAttribute('type', 'text');
    expect(inputComponent).toHaveClass('input-class');
  });

  test('renders an Input of type Text on the page with a label element', () => {
    render(<Input name="email" label="email-label" type="text" onInputChange={handleInputChange} />);

    const inputComponent = screen.getByRole('textbox', { name: 'email-label' });
    const labelElement = screen.getByLabelText('email-label');

    expect(inputComponent).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(inputComponent).toHaveAttribute('type', 'text');
  });

  test('when text has changed, calls onInputChange handler', async () => {
    render(<Input name="email" label="email-label" type="text" className="input-class" onInputChange={handleInputChange} />);

    const user = userEvent.setup();

    const inputComponent = screen.getByRole('textbox', { name: 'email-label' });

    await user.type(inputComponent, 'test');

    expect(handleInputChange).toBeCalledTimes(4);
  });
});
