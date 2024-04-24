import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface Props {
  buttonTitle: string,
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, email: string, password: string) => void,
  setSignUpError: (param: string) => void,
};

const Form: React.FC<Props> = ({ buttonTitle, handleClick, setSignUpError}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpEmailOnChangeHandle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value);
    setSignUpError('');
  };

  const signUpPasswordOnChangeHandle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(event.target.value);
    setSignUpError('');
  };

  return (
    <form>
      <Stack spacing={2}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={signUpEmailOnChangeHandle}
          fullWidth
          required
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={signUpPasswordOnChangeHandle}
          fullWidth
          required
        />
        <Button variant="contained" type="submit" onClick={(event) => handleClick(event, email, password)}>
          {buttonTitle}
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
