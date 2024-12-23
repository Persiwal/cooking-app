'use client';

import { ROUTES } from '@/types/routes';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const useRoutes = () => {
    const session = useSession();
    const isAuthenticated = Boolean(session && session.data)
    const pathname = usePathname();
    const pathnameWithoutLocale = pathname.replace(/\/pl$/, '/');

    const unauthenticatedRoutes = [
        {
            path: ROUTES.HOME_PAGE,
            label: 'Home',
            active: pathnameWithoutLocale === ROUTES.HOME_PAGE,
        },
    ];

    const authenticatedRoutes = [
        {
            path: ROUTES.HOME_PAGE,
            label: 'Home',
            active: pathnameWithoutLocale === ROUTES.HOME_PAGE,
        },
    ];

    const routes =
        isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes


    return routes;
}

export default useRoutes;