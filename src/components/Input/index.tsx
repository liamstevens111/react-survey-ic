import { HTMLInputTypeAttribute } from 'react';

import styles from './Input.module.scss';

type InputProps = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function Input({ name, label, type, className, onInputChange }: InputProps) {
  return (
    <>
      <label className="text-white text-left block my-5">
        {label}
        <input name={name} type={type} className={`${styles.input} ${className}`} onChange={onInputChange} />
      </label>
    </>
  );
}

export default Input;
