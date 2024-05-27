import Select from 'react-select';
import clsx from 'clsx';
const CustomSelect = ({label, placeholder, onChange, options = [], value, classname}) => {
  return (
    <div>
      {label &&  <h3 className="font-medium">{label}</h3>}
      <Select 
        placeholder={placeholder}
        options={options}
        value={value}
        isSearchable
        onChange={val => onChange(val)}
        formatOptionLabel={(option) => 
          <div className='flex text-900 align-items-center gap-2'>
            <span>{option.label}</span>
          </div>
        }
        className={{control: () => clsx('border-1 py-1', classname)}}
      />
    </div>
  )
}

export default CustomSelect;