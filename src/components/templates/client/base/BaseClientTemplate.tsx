'use client';
import styles from './BaseClientTemplate.module.css';

export interface IBaseClientTemplate {
  sampleTextProp: string;
}

const BaseClientTemplate: React.FC<IBaseClientTemplate> = ({
  sampleTextProp,
}) => {
  return <div className={styles.container}>{sampleTextProp}</div>;
};

export default BaseClientTemplate;
