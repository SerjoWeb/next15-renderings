import { cn } from "@/utils/styles/cn";
import { type ButtonHTMLAttributes, type ReactElement, type FC, memo, PropsWithChildren } from "react";

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {};

const Button: FC<PropsWithChildren<TButton>> = ({ children, ...props }): ReactElement => {
  return (
    <button
      {...props}
      className={cn(`
        w-full max-w-max py-2 px-8 border border-amber-700 text-sm font-semibold 
        transition-all duration-300 hover:border-amber-800 hover:text-amber-800 
        rounded-md cursor-pointer
      `)}
    >
      {children}
    </button>
  );
};

export default memo(Button);
