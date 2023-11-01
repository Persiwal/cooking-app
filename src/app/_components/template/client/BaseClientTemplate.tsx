'use client';
import styles from './BaseClientTemplate.module.css';

export type Props = {
  sampleTextProp: string;
}

const BaseClientTemplate: React.FC<Props> = ({
  sampleTextProp,
}) => {
  return <div className={styles.container}>{sampleTextProp}</div>;
};

export default BaseClientTemplate;
