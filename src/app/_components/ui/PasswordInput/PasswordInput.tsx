'use client';
import {
  EyeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
} from '@radix-ui/react-icons';
import { IconButton, TextField } from '@radix-ui/themes';
import { useState } from 'react';

export type Props = {
  onChange: () => void;
  value: string
};

const PasswordInput: React.FC<Props> = ({ onChange, value }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <TextField.Root>
      <TextField.Slot>
        <LockClosedIcon />
      </TextField.Slot>
      <TextField.Input
        size="3"
        onChange={onChange}
        value={value}
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder="Type a password..."
      />
      <TextField.Slot>
        <IconButton type='button' variant="ghost" onClick={handleTogglePasswordVisibility}>
          {isPasswordVisible ? (
            <EyeOpenIcon
              data-testid="open-eye-icon"
              color="black"
              width={20}
              height={20}
            />
          ) : (
            <EyeClosedIcon
              data-testid="closed-eye-icon"
              color="black"
              width={20}
              height={20}
            />
          )}
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  );
};

export default PasswordInput;
