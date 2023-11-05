import { ROUTES } from '@/app/_types/routes';
import Link from 'next-intl/link';

const Header = () => {
  return (
    <header>
      <Link href={ROUTES.HOME_PAGE}>Home</Link>
      <Link href={ROUTES.LOGIN_PAGE}>Login</Link>
      <Link href={ROUTES.REGISTER_PAGE}>Register</Link>
      <Link href="/" locale="pl">
        Switch to pl
      </Link>
      <Link href="/" locale="en">
        Switch to en
      </Link>
    </header>
  );
};

export default Header;
