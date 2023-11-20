const Input = ({ placeholder, value, type, disabled = false, onChange }) => {
  return <input 
  disabled={disabled} 
  onChange={onChange} 
  value={value} 
  placeholder={placeholder} 
  type={type} 
  className="
     w-full
     p-4
     text-lg
     bg-black
     border-2
     border-neutral-800
     rounded-md
     outline-none
     text-white
     focus:border-sky-500
     focus:border-2
     transition
     disabled:bg-neutral-900
     disabled:opacity-70
     disabled:cursor-not-allowed 
  "
  />;
};

export default Input;
