import styles from './layout.module.scss'
import registerBgImage from '@/../public/images/register-page-bg-img.jpg';
import BackgroundImage from '@/app/_components/ui/BackgroundImage/BackgroundImage';
import { Container as ContentContainer } from '@radix-ui/themes';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className={styles.container}>
      <BackgroundImage img={registerBgImage} />
      <ContentContainer>
        {children}
      </ContentContainer>
    </main >
  );
}
