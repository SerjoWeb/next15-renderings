import { type ReactElement, memo } from "react";
import { type SearchParamProps } from "@/types/searchParams";
import { cn } from "@/utils/styles/cn";
import Link from "next/link";
import Modal from "@/components/ui/modal/Modal";
import ModalForm from "@/components/content/modal/ModalForm";

const HomePage = ({ searchParams }: { searchParams: SearchParamProps }): ReactElement => {
  //@ts-expect-error Search params is "any" type by default, to avoid any building errors
  const show = searchParams?.show;

  return (
    <div className="p-5">
      <h4 className="mb-4">--- SSG Render ---</h4>
      <Link
        href="/?show=true"
        className={cn(`
          border border-amber-500 text-lg text-amber-700 transition-colors 
          duration-300 hover:border-amber-800 hover:text-amber-800 py-2 px-4 rounded-md
        `)}
      >
        Open Modal
      </Link>
      <div className="mt-3.5">
        <h4 className="font-semibold">Menu</h4>
        <ul className="mt-2">
          <li><Link href="/users">• User List</Link></li>
        </ul>
      </div>
      <Modal
        content={<ModalForm />}
        title="Test Modal"
        show={show}
        width={26}
      />
    </div>
  );
};

export default memo(HomePage);
