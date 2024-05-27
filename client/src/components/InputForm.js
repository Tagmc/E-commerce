import { memo } from "react"
import clsx from 'clsx';
const InputForm = ({ label, disabled, register, errors, id, validate, type = 'text', placeholder, defaultValue, style, readOnly }) => {
  return (
    <>
      <div className={style} >
        {label && <label className="font-medium" htmlFor={id}>{label + ':'}</label>}
        <input 
          type={type}
          // id={id}
          {...register(id, validate)}
          disabled={disabled}
          placeholder={placeholder}
          className={clsx('text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full')}
          defaultValue={defaultValue}
          readOnly={readOnly}
        />
        {errors[id] && <small className="text-xs text-red-500">{errors[id]?.message}</small>}
      </div>
    </>
  )
}

export default memo(InputForm);