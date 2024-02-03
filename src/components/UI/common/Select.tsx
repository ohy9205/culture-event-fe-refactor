import { ChangeEvent } from "react";

type SelectProps = {
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  children: React.ReactNode;
};

type OptionProps = {
  text: string;
  value: string;
};

const Select = ({ name, onChange, children, value }: SelectProps) => {
  return (
    <select
      onChange={onChange}
      name={name}
      value={value}
      className="w-full h-full px-4 py-2 rounded-md bg-slate-100"
    >
      {children}
    </select>
  );
};

const Option = ({ text, value }: OptionProps) => {
  return <option value={value}>{text}</option>;
};

export default Select;
Select.Option = Option;
