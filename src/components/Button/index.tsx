import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export const Button = (props: ButtonProps) => {
  return (
    <button className="bg-blue-500 text-white p-2 rounded-md" {...props} />
  );
};
