"use client"
import { EyeClosedIcon, EyeOpenIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { IconButton, TextField } from '@radix-ui/themes';
import { useState } from 'react';

export type Props = {
  onChange: () => void
}

const PasswordInput: React.FC<Props> = ({
  onChange
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return <TextField.Root>
    <TextField.Slot>
      <LockClosedIcon />
    </TextField.Slot>
    <TextField.Input
      size="3"
      onChange={onChange}
      type={isPasswordVisible ? 'text' : 'password'}
      placeholder='Type a password...'
    />
    <TextField.Slot>
      <IconButton variant="ghost">
        {isPasswordVisible ?
          <EyeOpenIcon data-testid='open-eye-icon' color='black' width={20} height={20} onClick={() => setIsPasswordVisible(false)} />
          :
          <EyeClosedIcon data-testid='closed-eye-icon' color='black' width={20} height={20} onClick={() => setIsPasswordVisible(true)} />}
      </IconButton>
    </TextField.Slot>
  </TextField.Root>
};

export default PasswordInput;
