import React, { useState } from "react";
import UserForm from "../components/UserForm/UserForm";
import UserGrid from "../components/UserGrid/UserGrid";
import Layout from "../components/Layout/Layout";
import { Button, Grid, Drawer } from "@mui/material";
import { AlertColor } from '@mui/material/Alert';
import Notification from "../components/Notification/Notification";
import { User } from "../types/common";
const UserContainer: React.FC = () => {
    const [doFetchUser, setDoFetchUser] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [editUser, setEditUser] = useState<User | undefined>(undefined);
    const [notification, setNotification] = useState({ message: "", open: false, severity: "success" as AlertColor | undefined, })
    const toggleDrawer = (open: boolean, canRefresh: boolean = false, message: string = "") => {
        if (canRefresh) {
            setDoFetchUser(doFetchUser + 1);
            showNotification(message, "success");
        }
        setOpenDrawer(open);
    };
    const handleNotification = () => {
        setNotification({ ...notification, open: false })
    }
    const handleEdit = (user: User) => {
        setEditUser(user);
        setOpenDrawer(true);
    }
    const showNotification = (message: string, severity: AlertColor | undefined) => {
        setNotification({ ...notification, open: true, message: message, severity })
    }
    return <Layout>
        <div data-testid="user-container">

            {openDrawer && <Drawer
                anchor={"right"}
                open={openDrawer}
                data-testid="user-form-drawer"
            >
                <UserForm
                    toggleDrawer={toggleDrawer}
                    user={editUser}
                    showNotification={showNotification} />
            </Drawer>}
            <Grid container>
                <Grid item sm={8}>
                    <h2>User List</h2>
                </Grid>
                <Grid sm={4} item style={{ textAlign: "right", paddingTop: "20px" }}>
                    <Button variant="outlined" color="success" onClick={() => setOpenDrawer(true)} >New User</Button>
                </Grid>
            </Grid>
            <UserGrid doFetchUser={doFetchUser} handleEdit={handleEdit} showNotification={showNotification} />
            {notification.open && <Notification {...notification} handleClose={handleNotification} />}
        </div>
    </Layout>
}

export default UserContainer;