import { ROUTES } from '@/types/routes';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={ROUTES.HOME_PAGE}>
      <p>Cooking app</p>
    </Link>
  );
};

export default Logo;
