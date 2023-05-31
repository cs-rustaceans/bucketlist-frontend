import { FC } from "react";

const Error: FC<{ error?: string }> = ({ error }) => {
  return <>{error && <p className="text-red-500 mb-2">{error}</p>}</>;
};

export default Error;
