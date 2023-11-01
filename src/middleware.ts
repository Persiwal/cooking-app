import { withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { LOCALES } from './app/_types/locales';
import { ROUTES } from './app/_types/routes';

const locales = [LOCALES.ENGLISH, LOCALES.POLISH]
const publicPages = [ROUTES.HOME_PAGE, ROUTES.REGISTER_PAGE, ROUTES.LOGIN_PAGE]

const intlMiddleware =  createMiddleware({
  // A list of all locales that are supported
  locales: [LOCALES.ENGLISH, LOCALES.POLISH],
  // localeDetection: false,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: LOCALES.ENGLISH
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {callbacks: {
    authorized: ({token}) => token != null
  },
  pages: {
    signIn: ROUTES.LOGIN_PAGE
  }
}
)

export default function middleware (req: NextRequest) {
   const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
 
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
