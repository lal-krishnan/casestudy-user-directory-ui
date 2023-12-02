import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserGrid from './UserGrid';
import { getUsers, deleteUser } from '../../services/UserService';

jest.mock('../../services/UserService');
const mockShowNotification = jest.fn();
describe('UserGrid Component', () => {
  const mockHandleEdit = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders the UserGrid component', async () => {
    const mockUsers = [
      { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { _id: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' },
    ];
    (getUsers as jest.Mock).mockImplementation(() => Promise.resolve(mockUsers));
    render(<UserGrid handleEdit={mockHandleEdit} showNotification={mockShowNotification} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByTestId('loading-spinner')).toBeNull());
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  test('handles user deletion', async () => {
    const mockUsers = [
      { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    ];
    (getUsers as jest.Mock).mockImplementation(() => Promise.resolve(mockUsers));
    (deleteUser as jest.Mock).mockImplementation(() => Promise.resolve({ data: { message: 'User deleted successfully' } }));
    
    render(<UserGrid handleEdit={mockHandleEdit} showNotification={mockShowNotification} />);
    await waitFor(() => expect(screen.queryByTestId('loading-spinner')).toBeNull());
    fireEvent.click(screen.getByTestId('user-delete-btn'));
    expect(screen.findByText('Please confirm before delete the user')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('confirm-dialog-confirm-btn'));
    (getUsers as jest.Mock).mockImplementation(() => Promise.resolve({ data: [] }));
    expect(deleteUser).toHaveBeenCalledWith('1');

  });

});