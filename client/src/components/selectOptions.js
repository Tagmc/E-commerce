function SelectionOptions({icon}) {
  return (
    <div className="w-2rem h-2rem surface-300 border-round-2xl flex align-items-center justify-content-center hover:bg-bluegray-900 hover:text-white cursor-pointer">
     {icon}
    </div>
  )
}

export default SelectionOptions;