import styles from './BaseServerTemplate.module.css';

export interface IBaseServerTemplate {
  sampleTextProp: string;
}

const BaseServerTemplate: React.FC<IBaseServerTemplate> = ({
  sampleTextProp,
}) => {
  return <div className={styles.container}>{sampleTextProp}</div>;
};

export default BaseServerTemplate;
