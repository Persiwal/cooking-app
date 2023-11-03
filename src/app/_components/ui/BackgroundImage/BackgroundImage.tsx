import Image, { StaticImageData } from 'next/image';
import styles from './BackgroundImage.module.scss'

export type Props = {
  img: StaticImageData;
}

const BackgroundImage: React.FC<Props> = ({
  img,
}) => {
  return (
    <div className={styles.container}>
      <Image
        alt=""
        src={img}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  )
};

export default BackgroundImage;
