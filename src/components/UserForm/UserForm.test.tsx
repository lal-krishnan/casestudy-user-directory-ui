import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserForm from './UserForm';
import { addUser, updateUser } from "../../services/UserService";
import axios from 'axios';
jest.mock('../../services/UserService');
describe('UserForm Component', () => {
  const mockToggleDrawer = jest.fn();
  const mockShowNotification = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders UserForm with correct inputs and buttons', () => {
    render(
      <UserForm toggleDrawer={mockToggleDrawer} showNotification={mockShowNotification} />
    );

    expect(screen.getByTestId('First_Name')).toBeInTheDocument();
    expect(screen.getByTestId('Last_Name')).toBeInTheDocument();
    expect(screen.getByTestId('Email')).toBeInTheDocument();
  });

  it('handles input changes and form submission for creating a user', async () => {
    const mockToggleDrawer = jest.fn();
    const mockShowNotification = jest.fn();
    (addUser as jest.Mock).mockImplementation(() => Promise.resolve({ data: { message: 'User added successfully' } }));
    render(
      <UserForm toggleDrawer={mockToggleDrawer} showNotification={mockShowNotification} />
    );
    const firstName = screen.getByTestId('First_Name');
    const lastName = screen.getByTestId('Last_Name');
    const Email = screen.getByTestId('Email');
    if (firstName && lastName && Email) {
      const fn = firstName.querySelector('input');
      const ln = lastName.querySelector('input');
      const em = Email.querySelector('input');
      if (fn && ln && em) {
        fireEvent.change(fn, { target: { value: 'John' } });
        fireEvent.change(ln, { target: { value: 'Doe' } });
        fireEvent.change(em, { target: { value: 'john@gmail.com' } });
      }

    }
    fireEvent.submit(screen.getByTestId("userForm"));
    expect(screen.queryByText('Email is required.')).toBeNull();

  });

  it('handles input changes and form submission for updating a user', async () => {
    const mockToggleDrawer = jest.fn();
    const mockShowNotification = jest.fn();
    const mockUser = {
      firstName: 'John',
      lastName: 'Done',
      email: 'test@gmail.com',
      _id: 'xcj',
    };
    (updateUser as jest.Mock).mockImplementation(() => Promise.resolve({ data: { message: 'User updated successfully' } }));
    render(
      <UserForm toggleDrawer={mockToggleDrawer} showNotification={mockShowNotification} user={mockUser} />
    );

    const firstName = screen.getByTestId('First_Name');
    const lastName = screen.getByTestId('Last_Name');
    const Email = screen.getByTestId('Email');
    if (firstName && lastName && Email) {
      const fn = firstName.querySelector('input');
      const ln = lastName.querySelector('input');
      const em = Email.querySelector('input');
      if (fn && ln && em) {
        fireEvent.change(fn, { target: { value: 'John' } });
        fireEvent.change(ln, { target: { value: 'Doe' } });
        fireEvent.change(em, { target: { value: 'john@gmail.com' } });
      }

    }
    fireEvent.submit(screen.getByTestId("userForm"));
    expect(screen.queryByText('Email is required.')).toBeNull();

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith('xcj', {
        _id: 'xcj',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
      });
    });
  });
  it('handles input changes and form submission for updating a user error', async () => {
    const mockToggleDrawer = jest.fn();
    const mockShowNotification = jest.fn();
    const mockUser = {
      firstName: 'John',
      lastName: 'Done',
      email: 'test@gmail.com',
      _id: 'xcj',
    };
    const errorResponse = {
      response: {
        status: 400,
        data: {
          errors: [
            { path: 'firstName', msg: 'Error message for field1' }
          ],
        },
      },
    };
    (updateUser as jest.Mock).mockRejectedValue(errorResponse);
    render(
      <UserForm toggleDrawer={mockToggleDrawer} showNotification={mockShowNotification} user={mockUser} />
    );

    const firstName = screen.getByTestId('First_Name');
    const lastName = screen.getByTestId('Last_Name');
    const Email = screen.getByTestId('Email');
    if (firstName && lastName && Email) {
      const fn = firstName.querySelector('input');
      const ln = lastName.querySelector('input');
      const em = Email.querySelector('input');
      if (fn && ln && em) {
        fireEvent.change(fn, { target: { value: 'John' } });
        fireEvent.change(ln, { target: { value: 'Doe' } });
        fireEvent.change(em, { target: { value: 'john@gmail.com' } });
      }

    }
    fireEvent.submit(screen.getByTestId("userForm"));
    expect(screen.queryByText('Email is required.')).toBeNull();

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith('xcj', {
        _id: 'xcj',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
      });
    });
    await waitFor(() => {
      expect(screen.queryByText('Saving...')).toBeNull();
    })
    expect(screen.queryByText('Error message for field1')).not.toBeNull();
  });
});