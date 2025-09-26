import { cn } from "@/utils/styles/cn";
import { type ReactElement, type FC, memo, type InputHTMLAttributes } from "react";

export type TInput = InputHTMLAttributes<HTMLInputElement> & {
  label: string,
  error: string
};

const Input: FC<TInput> = ({ label, error, ...props }): ReactElement => {
  return (
    <div className="w-full flex-col gap-y-1">
      <label htmlFor={props.id} className="text-sm">
        {label}&nbsp;{props.required ? (<sup className="text-amber-600">*</sup>) : null}
      </label>
      <input
        className={cn(`
          w-full py-2 px-4 border border-black text-base text-black bg-transparent 
          outline-0 rounded-md transition-all duration-300 focus:border-amber-700
        `)}
        {...props}
      />
      {error ? (<small className="error-message">{error}</small>) : null}
    </div>
  );
};

export default memo(Input);
