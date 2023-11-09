import registerBgImage from '@/../public/images/register-page-bg-img.jpg';
import BackgroundImage from '@/app/_components/ui/BackgroundImage/BackgroundImage';
import { Container as ContentContainer } from '@radix-ui/themes';
import RegisterForm from '../../../../_components/pages/register/RegisterForm/RegisterForm';
import styles from './page.module.scss';

export default function Register() {
  return (
    <main className={styles.container}>
      <BackgroundImage img={registerBgImage} />
      <ContentContainer px={{ sm: '5' }}>
        <RegisterForm />
      </ContentContainer>
    </main>
  );
}
