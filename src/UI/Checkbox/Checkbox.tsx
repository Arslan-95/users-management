import React from 'react';

interface ICheckboxProps {
  title: string;
  value: boolean;
  onChange(checked: boolean): void;
}

const Checkbox: React.FC<ICheckboxProps> = ({ title, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label style={{ userSelect: 'none' }}>
      <input type="checkbox" checked={value} onChange={handleChange} />
      {title}
    </label>
  );
};

export default Checkbox;
