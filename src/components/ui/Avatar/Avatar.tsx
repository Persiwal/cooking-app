import * as RadixAvatar from '@radix-ui/react-avatar';
import styles from './Avatar.module.scss';

type Props = RadixAvatar.AvatarImageProps &
  RadixAvatar.AvatarProps &
  RadixAvatar.AvatarFallbackProps & {
    fallback: string;
    size?: 'small' | 'medium' | 'large';
  };

const Avatar: React.FC<Props> = ({ src, alt, fallback, size = 'medium' }) => {
  return (
    <RadixAvatar.Root className={`${styles.avatarRoot} ${styles[size]}`}>
      <RadixAvatar.Image src={src} alt={alt} className={styles.avatarImage} />
      <RadixAvatar.Fallback className={styles.avatarFallback} delayMs={600}>
        {fallback}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

export default Avatar;
