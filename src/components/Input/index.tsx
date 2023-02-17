import { HTMLInputTypeAttribute } from 'react';

import styles from './Input.module.scss';

type InputProps = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  className?: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({ name, label, type, value, className, onInputChange }: InputProps) {
  return (
    <>
      <label className="text-white text-left block my-5">
        {label}
        <input name={name} type={type} value={value} className={`${styles.input} ${className}`} onChange={onInputChange} />
      </label>
    </>
  );
}

export default Input;
