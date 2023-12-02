import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { deleteUser, getUsers } from "../../services/UserService";
import { Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { User } from "../../types/common";
import { AlertColor } from '@mui/material/Alert';
import ConfirmDialog from "../DialogBox/ConfirmDialog";
import LinearProgress from '@mui/material/LinearProgress';

interface Props {
    handleEdit: (user: User) => void,
    doFetchUser?: number,
    showNotification: (message: string, severity: AlertColor | undefined) => void
}
const UserGrid: React.FC<Props> = ({ doFetchUser, handleEdit, showNotification }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [removableUser, setRemovableUser] = useState<User | null>(null);
    useEffect(() => {
        fetchUsers();
    }, [doFetchUser]);
    const fetchUsers = async () => {
        setIsFetching(true)
        try {
            getUsers().then((response) => {
                setUsers(response.data)
            }).catch((error) => {
                showNotification("Failed to fetch data", 'error');
            }).finally(() => setIsFetching(false))
        } catch (error) {
            showNotification("Failed to fetch data", 'error');
        }
    };
    const handleDelete = (user: User) => {
        setShowDeleteDialog(true);
        setRemovableUser(user);
    }
    const perforDelete = (user: User | null) => {
        if (user && user._id) {
            setIsFetching(true)
            deleteUser(user._id).then((response) => {
                fetchUsers();
                showNotification(response.data.message, 'success');
                setShowDeleteDialog(false);
            }).catch((error) => {
                showNotification("Failed to fetch data", 'error');
            }).finally(() => setIsFetching(false))
        }
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell >Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {isFetching && <TableRow data-testid="loading-spinner">
                            <TableCell colSpan={4} >
                                <LinearProgress />
                            </TableCell>
                        </TableRow>}

                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Stack direction={"row"} spacing={1}>
                                        <IconButton data-testid="user-edit-btn" title={"Edit user"} onClick={() => handleEdit(user)} color="secondary" aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton data-testid="user-delete-btn" onClick={() => handleDelete(user)} title={"Delete user"} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            {showDeleteDialog && <ConfirmDialog
                title="Confirm"
                message="Please confirm before delete the user"
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={() => perforDelete(removableUser)}
            />}
        </>
    );
};
export default UserGrid;
