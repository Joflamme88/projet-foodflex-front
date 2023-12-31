import React, { ChangeEvent, useId } from 'react';

interface FieldProps {
  value: string;
  type?: string;
  label: string;
  onChange: (value: string) => void;
}
// == Composant
function Field({ value, type, label, onChange }: FieldProps) {
  const inputId = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div className="flex flex-col font-bold gap-2 bg-thirdff-opacity-80">
      <label htmlFor={inputId}>{label}</label>
      <input
        // React - state
        value={value}
        onChange={handleChange}
        // infos de base
        required
        id={inputId}
        type={type}
        className="mb-4 bg-bgff  border-titleff font-bold rounded-lg border-2 h-8 shadow-md hover:shadow-xl focus:outline-none focus:border-fourthff ease-in duration-150 p-2"
      />
    </div>
  );
}

// Valeurs par défaut pour les props
Field.defaultProps = {
  type: 'text',
};

// == Export
export default Field;
