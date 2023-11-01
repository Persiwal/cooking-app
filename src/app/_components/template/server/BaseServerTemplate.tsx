import styles from './BaseServerTemplate.module.css';

export type Props = {
  sampleTextProp: string;
}

const BaseServerTemplate: React.FC<Props> = ({
  sampleTextProp,
}) => {
  return <div className={styles.container}>{sampleTextProp}</div>;
};

export default BaseServerTemplate;
