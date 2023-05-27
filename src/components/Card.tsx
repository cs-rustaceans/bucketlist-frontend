import { FC, PropsWithChildren } from "react";

const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 rounded-lg shadow-lg">{children}</div>
    </div>
  );
};

export default Card;
