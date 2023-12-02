import axios from 'axios';
import { addUser, getUsers, updateUser, deleteUser } from './UserService';
import { User } from '../types/common';
import { _BASE_URL, _USER_URI } from '../config/config';

jest.mock('axios');

describe('UserService', () => {
  const mockUser: User = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should add a new user', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({ data: { message: 'User added successfully' } });

    const response = await addUser(mockUser);

    expect(axios.post).toHaveBeenCalledWith(`${_BASE_URL}${_USER_URI}`, mockUser);
    expect(response.data.message).toBe('User added successfully');
  });

  it('should get a list of users', async () => {
    const mockUsers = [{ id: '1', ...mockUser }];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockUsers });

    const response = await getUsers();

    expect(axios.get).toHaveBeenCalledWith(`${_BASE_URL}${_USER_URI}`);
    expect(response.data).toEqual(mockUsers);
  });

  it('should update a user', async () => {
    const userId = '123';

    (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValueOnce({ data: { message: `User ${userId} updated successfully` } });

    const response = await updateUser(userId, mockUser);

    expect(axios.put).toHaveBeenCalledWith(`${_BASE_URL}${_USER_URI}/${userId}`, mockUser);
    expect(response.data.message).toBe(`User ${userId} updated successfully`);
  });

  it('should delete a user', async () => {
    const userId = '123';

    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValueOnce({ data: { message: `User ${userId} deleted successfully` } });

    const response = await deleteUser(userId);

    expect(axios.delete).toHaveBeenCalledWith(`${_BASE_URL}${_USER_URI}/${userId}`);
    expect(response.data.message).toBe(`User ${userId} deleted successfully`);
  });
});