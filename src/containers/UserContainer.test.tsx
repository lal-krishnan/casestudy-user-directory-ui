import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserContainer from './UserContainer';
describe('UserContainer Component', () => {
  test('renders UserContainer and UserForm render', async () => {
    render(<UserContainer />);
    const newUserButton = screen.getByText('New User');
    fireEvent.click(newUserButton);
    const drawer = screen.getByTestId('user-form-drawer');
    expect(drawer).toBeInTheDocument();
    fireEvent.click(screen.getByText('Cancel'));
    await waitFor(() => {
      expect(drawer).not.toBeInTheDocument();
    });
  });
});