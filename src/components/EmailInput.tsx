import TextInput from "./TextInput";

const EmailInput = ({
  email,
  onChange,
}: {
  email: string;
  onChange: (email: string) => void;
}) => {
  return (
    <>
      <label className="block mb-2" htmlFor="email">
        Email
      </label>
      <TextInput
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={event => onChange(event.target.value)}
        required
      />
    </>
  );
};

export default EmailInput;
