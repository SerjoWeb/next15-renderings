"use client";

import { type ReactElement, type ReactNode, memo } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { cn } from "@/utils/styles/cn";
import useOutsideClick from "@/hooks/useOutsideClick";
import Image from "next/image";
import CloseIcon from "../../../../public/images/icons/close.svg";

const Modal = ({
  title,
  content,
  show,
  width
}: {
  title: string,
  content: ReactNode,
  show: boolean,
  width?: number
}): ReactElement => {
  const router = useRouter();
  const pathname = usePathname();
  
  const closeModal = (): void => {
    router.push(pathname);
  };

  const outsideClickModalRef = useOutsideClick(() => {
    closeModal();
  });

  return (
    <div
      className={cn(
        "h-svh w-full flex justify-center items-center fixed top-0 left-0 bg-black/15 backdrop-blur-xs transition-all duration-700",
        show ? "opacity-100 z-10" : "opacity-0 -z-50"
      )}
    >
      <div
        className={cn(
          "w-full h-auto bg-white rounded-md",
          width ? `max-w-[${width}rem]` : "max-w-[40rem]"
        )}
        style={{
          maxWidth: width ? `${width}rem` : "40rem"
        }}
        ref={outsideClickModalRef}
      >
        <header className="w-full p-4 flex justify-between items-center">
          <h4>{title} (CSR Render)</h4>
          <button
            type="button"
            className="border-0 bg-none m-0 p-0 transition-opacity duration-500 cursor-pointer hover:opacity-85"
            onClick={closeModal}
          >
            <Image
              alt="Close Modal"
              src={CloseIcon}
              height={18}
              width={18}
              priority
            />
          </button>
        </header>
        <div className="p-4 border-t border-t-gray-200">
          {content}
        </div>
      </div>
    </div>
  );
};

export default memo(Modal);
