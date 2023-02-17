import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onButtonClick?: () => void;
};

function Button({ text, type, className, onButtonClick }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className}`} type={type} onClick={onButtonClick}>
      {text}
    </button>
  );
}

export default Button;
