'use client';

import { SessionProvider } from 'next-auth/react';

export type Props = {
  session: any,
  children: React.ReactNode
}

const ClientSessionProvider: React.FC<Props> = ({
  session, children
}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
};

export default ClientSessionProvider;
