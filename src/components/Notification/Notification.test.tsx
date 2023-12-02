import React from 'react';
import { render, screen} from '@testing-library/react';
import Notification from './Notification';
describe('Notification Component', () => {
  test('renders notification with correct message and severity', () => {
    render(
      <Notification
      handleClose={() => {}}
      open={true}
      severity="success"
      message="Test message"
    />
    );

    expect(screen.getByTestId('notificationAlert')).toHaveTextContent('Test message');
  });
});