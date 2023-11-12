'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const CredentialsSingIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username);
    console.log(password);

    signIn('credentials', {
      username: username,
      password: password,
      redirect: false,
    })
      .then(() => {
        console.log('sucessfully logged in');
      })
      .catch(() => {
        console.log('wrong credentials');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default CredentialsSingIn;
