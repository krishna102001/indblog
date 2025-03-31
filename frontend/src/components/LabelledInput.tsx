import React from "react";

interface LabelledInputType {
  label: string;
  type?: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({
  label,
  type,
  placeholder,
  onChange,
  value,
}: LabelledInputType) => {
  return (
    <div className='flex flex-col my-4'>
      <label
        htmlFor='input-field'
        className='block mb-1 text-sm font-medium text-gray-900 '
      >
        {label}
      </label>

      <input
        id='input-field'
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='bg-gray-50 border border-[#ff7000] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        required
      />
    </div>
  );
};

export default LabelledInput;
