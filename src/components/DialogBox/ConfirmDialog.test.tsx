import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmDialog from './ConfirmDialog';

describe('ConfirmDialog Component', () => {
  test('renders ConfirmDialog and triggers actions', async () => {
    const mockOnClose = jest.fn();
    const mockOnConfirm = jest.fn();
    const { getByText,queryByText } = render(
      <ConfirmDialog
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test Title"
        message="Test Message"
      />
    );
    const dialogTitle = getByText('Test Title');
    const dialogMessage = getByText('Test Message');
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogMessage).toBeInTheDocument();
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    const confirmButton = getByText('Confirm');
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
   
  });
});