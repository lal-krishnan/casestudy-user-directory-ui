import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input Component', () => {
  test('renders Input and handles change', () => {
    const mockOnChange = jest.fn();
    render(
      <Input
        label="Test Label"
        type="text"
        value="initialValue"
        onChange={mockOnChange}
      />
    );

    const inputElement = screen.getByTestId('inputField').querySelector('#Test_Label');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('initialValue');
    if (inputElement)
      fireEvent.change(inputElement, { target: { value: 'newValue' } });
    expect(mockOnChange).toHaveBeenCalledWith('newValue');
  });

  test('renders Input with error and helper text', () => {
    render(
      <Input
        label="Test Label"
        type="text"
        value=""
        onChange={() => { }}
        error="Test error"
        helperText="Test helper text"
      />
    );

    const inputElement = screen.getByTestId('inputField').querySelector('#Test_Label');
    const errorText = screen.getByText('Test error');

    expect(inputElement).toHaveAttribute('aria-invalid', 'true');
    expect(errorText).toBeInTheDocument();
  });

  test('renders Input without error and helper text', () => {
    render(
      <Input
        label="Test Label"
        type="text"
        value=""
        onChange={() => { }}
      />
    );
    const errorText = screen.queryByText('Test error');
    expect(errorText).toBeNull();
  });

});