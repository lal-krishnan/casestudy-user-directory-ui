import React, { useState, useEffect } from "react";
import Input from "../Input/Input";
import { User } from "../../types/common";
import { addUser, updateUser } from "../../services/UserService";
import { Box, Button, Stack } from "@mui/material";
import { AlertColor } from '@mui/material/Alert';
interface Props {
    toggleDrawer: (open: boolean, canRefresh: boolean, message?: string) => void;
    user?: User;
    showNotification: (message: string, severity: AlertColor | undefined) => void
}
const UserForm: React.FC<Props> = ({ user, toggleDrawer, showNotification }) => {
    const [userProfile, setUserProfile] = useState<User>({ firstName: "", lastName: "", email: "" });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        if (user && user._id !== "") {
            setUserProfile(user);
        }
    }, [user])
    const handleInput = (key: string, value: string): void => {
        validateProfile();
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [key]: value,
        }));
    };
    const validateProfile = (): void => {
        const errors: Record<string, string> = {};
        if (!userProfile.firstName.trim()) {
            errors.firstName = 'First Name is required.';
        }
        if (!userProfile.lastName.trim()) {
            errors.lastName = 'Last Name is required.';
        }
        if (!userProfile.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/.test(userProfile.email)) {
            errors.email = 'Invalid email format.';
        }
        setValidationErrors(errors);
    };

    const saveProfile = (e:React.FormEvent<HTMLFormElement>): boolean => {
        e.preventDefault();
        validateProfile();
        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true)
            if (userProfile._id) {
                updateUserProfile();
            } else {
                createUser();
            }
        }
        return false;
    };
    const createUser = () => {
        addUser(userProfile).then((response) => {
            toggleDrawer(false, true, response.data.message);
        }).catch((error) => {
            if (error.response && error.response.status === 400) {
                const errors: Record<string, string> = {};
                error.response.data.errors.forEach((item: { path: string, msg: string }) => {
                    errors[item.path] = item.msg;

                })
                setValidationErrors(errors);
            } else {
                showNotification("Failed update user", 'error');
            }
        }).finally(() => {
            setIsLoading(false);
        })
    }
    const updateUserProfile = () => {
        if (userProfile._id)
            updateUser(userProfile._id, userProfile).then((response) => {
                toggleDrawer(false, true, response.data.message);
            }).catch((error) => {
                if (error.response && error.response.status === 400) {
                    const errors: Record<string, string> = {};
                    error.response.data.errors.forEach((item: { path: string, msg: string }) => {
                        errors[item.path] = item.msg;

                    })
                    setValidationErrors(errors);
                } else {
                    showNotification("Failed update user", 'error');
                }
            }).finally(() => {
                setIsLoading(false);
            })
    }
    const handleCancel = () => toggleDrawer(false, false)
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={saveProfile} 
            data-testid="userForm"
        >
            <div style={{ width: "350px", paddingLeft: "50px" }}>
                <h2>Create User</h2>
                <Input
                    label="First Name"
                    type="text"
                    value={userProfile.firstName}
                    onChange={(value: string) => handleInput('firstName', value)}
                    error={validationErrors.firstName}
                    data-testid="user-form-firstName"
                />
                <Input
                    label="Last Name"
                    type="text"
                    value={userProfile.lastName}
                    onChange={(value: string) => handleInput('lastName', value)}
                    error={validationErrors.lastName}
                    data-testid="user-form-lastName"
                />
                <Input
                    label="Email"
                    type="text"
                    value={userProfile.email}
                    onChange={(value: string) => handleInput('email', value)}
                    error={validationErrors.email}
                    data-testid="user-form-email"
                />
                <Stack direction="row" spacing={2} >
                    <Button variant="contained" type="submit"   
                    id="user-form-save" 
                    disabled={isLoading} >
                        {isLoading ? "Saving..." : ((user && user.email) ? "Update" : "Create")}
                    </Button>

                    {!isLoading && <Button variant="text" id="user-form-cancel" type="button" onClick={handleCancel}>
                        Cancel
                    </Button>}
                </Stack>
            </div>
        </Box>
    );
};

export default UserForm;