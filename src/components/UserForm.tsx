import { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "./Button";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

interface UserFormProps {
  title: string;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  role?: string;
  setRole?: Dispatch<SetStateAction<string>>;
  onClick: () => Promise<void>;
  buttonText: string;
  children?: React.ReactNode;
}

const UserForm: FC<UserFormProps> = ({
  title,
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
  onClick,
  buttonText,
  children,
}) => {
  const [error, setError] = useState("");
  const buttonHandler = () => {
    onClick().catch((error: any) => {
      console.log(error);
      setError(error.message);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <EmailInput email={email} onChange={setEmail} />
        <PasswordInput password={password} onChange={setPassword} />
        {setRole && (
          <select
            className="w-full border-gray-300 mb-4 py-2 px-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 ring-2 ring-gray-300"
            value={role}
            onChange={event => setRole(event.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        )}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <Button onClick={buttonHandler}>{buttonText}</Button>
        {children}
      </div>
    </div>
  );
};

export default UserForm;
