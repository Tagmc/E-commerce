import { memo } from "react";

const InputSelect = ({ value, changeValue, options }) => {
  return (
    <select className="w-full text-sm text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary"  value={value} onChange={e => changeValue(e.target.value)}>
      <option value="">Choose</option>
      {options?.map(item => (
        <option key={item.id} value={item.value}>{item.text}</option>
      ))}
    </select>
  )
}

export default InputSelect;