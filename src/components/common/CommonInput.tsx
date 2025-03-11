interface InputFieldProps {
    type: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ type, name, value, placeholder, onChange }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            className="w-full p-2 mb-3 border border-black placeholder:text-black text-black rounded"
        />
    );
};

export default InputField;
