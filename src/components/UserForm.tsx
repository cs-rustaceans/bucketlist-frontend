import { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "./Button";
import EmailInput from "./EmailInput";
import Error from "./Error";
import PasswordInput from "./PasswordInput";
import Select from "./Select";

interface UserFormProps {
  title: string;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  role?: string;
  setRole?: Dispatch<SetStateAction<string>>;
  status?: string;
  setStatus?: Dispatch<SetStateAction<string>>;
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
  status,
  setStatus,
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
          <Select value={role} onChange={event => setRole(event.target.value)}>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </Select>
        )}
        {setStatus && (
          <Select
            value={status}
            onChange={event => setStatus(event.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="deleted" disabled>
              Deleted
            </option>
          </Select>
        )}
        <Error error={error} />
        <Button onClick={buttonHandler}>{buttonText}</Button>
        {children}
      </div>
    </div>
  );
};

export default UserForm;
