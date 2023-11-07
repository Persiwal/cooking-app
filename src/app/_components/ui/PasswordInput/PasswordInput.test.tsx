import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import PasswordInput from './PasswordInput';
import { mockPasswordInputProps } from './PasswordInput.mocks';

describe('PasswordInput Component', () => {
  it('should render properly', () => {
    render(<PasswordInput {...mockPasswordInputProps.base} />);

    const passwordField = screen.getByPlaceholderText('Type a password...');
    const closedEyeIcon = screen.getByTestId('closed-eye-icon');

    expect(passwordField).toBeInTheDocument();
    expect(closedEyeIcon).toBeInTheDocument();
  });

  it('should toggle password visibility', () => {
    render(<PasswordInput {...mockPasswordInputProps.base} />);

    const closedEyeIcon = screen.getByTestId('closed-eye-icon');
    const passwordField = screen.getByPlaceholderText('Type a password...');

    expect(passwordField.getAttribute('type')).toBe('password');
    expect(closedEyeIcon).toBeInTheDocument();

    fireEvent.click(closedEyeIcon);
    expect(passwordField.getAttribute('type')).toBe('text');

    const openEyeIcon = screen.getByTestId('open-eye-icon');
    expect(openEyeIcon).toBeInTheDocument();

    fireEvent.click(openEyeIcon);
    expect(passwordField.getAttribute('type')).toBe('password');
  });
});
