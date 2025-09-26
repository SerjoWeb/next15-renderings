"use client";

import { cn } from "@/utils/styles/cn";
import {
  type ReactElement,
  type FC,
  memo,
  useState,
  useRef,
  type InputHTMLAttributes,
  type Dispatch,
  type SetStateAction,
  ChangeEvent,
  useEffect
} from "react";

type TFile = InputHTMLAttributes<HTMLInputElement> & {
  inputName: string,
  inputId: string,
  required: boolean,
  buttonContext: string,
  file: File | null,
  setFile: Dispatch<SetStateAction<File | null>>
};

const File: FC<TFile> = ({ inputName, inputId, required, buttonContext, file, setFile, ...props }): ReactElement => {
  const [buttonContextValue, setButtonContextValue] = useState<string>(buttonContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const onFileuploadHandler = (): void => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
		  setFile(event.target.files[0]);
    }
	};

  useEffect(() => {
    if (file) {
      setButtonContextValue(file.name);
    }
  }, [file]);

  return (
    <div className="w-full flex flex-col gap-y-1">
      {required ? (<label className="text-sm text-amber-600">Required *</label>) : null}
      <button
        type="button"
        className={cn(`
          w-full py-2 px-4 border border-black text-base text-black bg-transparent 
          outline-0 rounded-md transition-all duration-300 focus:border-amber-700 
          hover:border-amber-700 hover:text-amber-700 cursor-pointer
        `)}
        onClick={onFileuploadHandler}
      >
        {buttonContextValue}
      </button>
      <input
        ref={inputRef}
        type="file"
        name={inputName}
        id={inputId}
        required={required}
        className="hidden invisible"
        onChange={onFileChange}
        {...props}
      />
    </div>
  );
};

export default memo(File);
