import { ChangeEvent } from "react";

type SelectProps = {
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  children: React.ReactNode;
  "data-testid"?: string;
};

type OptionProps = {
  text: string;
  value: string;
};

const Select = ({
  name,
  onChange,
  children,
  value,
  "data-testid": testId,
}: SelectProps) => {
  return (
    <select
      onChange={onChange}
      name={name}
      value={value}
      className="w-full h-full px-4 py-2 rounded-md bg-slate-100"
      data-testid={testId}>
      {children}
    </select>
  );
};

const Option = ({ text, value }: OptionProps) => {
  return <option value={value}>{text}</option>;
};

export default Select;
Select.Option = Option;
