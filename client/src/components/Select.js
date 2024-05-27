import clsx from "clsx";
const Select = ({ label, options1 = [], register, errors, id, validate, defaultValue }) => {
  return (
    <>
      <div className="flex flex-column gap-2 w-full">
        {label && <label htmlFor={id}>{label}</label>}
        <select defaultValue={defaultValue} className={clsx('text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round  outline-none focus:border-primary w-full')} id={id} {...register(id, validate)} >
          <option value={""}>--Choose--</option>
          {options1?.map(item => (
            <option value={item.code}>{item.value}</option>
          ))}
        </select>
        {errors[id] && <small className="text-xs text-red-500">{errors[id]?.message}</small>}
      </div>
    </>
  )
}

export default Select;