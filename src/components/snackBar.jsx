
import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert  elevation={6} ref={ref} variant="filled" {...props} />;
  });
export default function AlertDialog(props) {
    const {
        color = "success",
        open = false,
        handleClose = () => { },
        label = "ເກີດຂໍ້ຜິດພາດ, ກາລຸນາກວດສອບ!"
    } = props

    return <Snackbar anchorOrigin={
        {
            vertical: "top",
            horizontal: "right"
        }
    } open={open} autoHideDuration={8000} onClose={handleClose}>
        <Alert color={color} onClose={handleClose} severity={color} sx={{ width: '100%' , "&.MuiAlert-root": {
            color: 'white'
        }}}>
            {label}
        </Alert>
    </Snackbar>

}