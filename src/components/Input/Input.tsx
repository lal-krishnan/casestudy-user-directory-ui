import { TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';

interface InputProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    error?: string,
    helperText?: string
}

const Input: React.FC<InputProps> = ({
    label,
    type,
    value,
    onChange,
    error
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
    };

    return (
        <div data-testid="inputField">
            <TextField
                error={Boolean(error && error.length)}
                helperText={Boolean(error) ? error : ""}
                required
                id={label.replace(" ", "_")}
                data-testid={label.replace(" ", "_")}
                label={label}
                value={value}
                InputProps={{
                    id: label.replace(" ", "_")
                }
                }
                onChange={handleChange}
                type={type}
            />
        </div>
    );
};

export default Input;