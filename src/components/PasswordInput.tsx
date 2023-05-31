import TextInput from "./TextInput";

const PasswordInput = ({
  password,
  onChange,
}: {
  password: string;
  onChange: (password: string) => void;
}) => {
  return (
    <>
      <label className="block mb-2" htmlFor="password">
        Password
      </label>
      <TextInput
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={event => onChange(event.target.value)}
        required
      />
    </>
  );
};

export default PasswordInput;
