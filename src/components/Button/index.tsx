import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  onButtonClick?: () => void;
};

function Button({ text, type, className, disabled, onButtonClick }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className}`} disabled={disabled || false} type={type} onClick={onButtonClick}>
      {text}
    </button>
  );
}

export default Button;
