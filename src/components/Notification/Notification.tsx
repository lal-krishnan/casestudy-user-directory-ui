import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface Props {
  handleClose: (event: React.SyntheticEvent<Element, Event>, reason?: string) => void;
  open: boolean;
  severity: AlertColor | undefined;
  message: string
}
const Notification: React.FC<Props> = ({ handleClose, open, severity, message }) => {
  return (

    <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={(event, reason) => handleClose(event as React.SyntheticEvent<Element, Event>, reason)}>
      <div data-testid="notificationAlert">
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        <span data-testid="notificationAlertMsg">  {message}</span>
        </Alert>
      </div>
    </Snackbar>
  );
}
export default Notification;