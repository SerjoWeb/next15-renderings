"use client";

import { type FormEvent, type ReactElement, memo, useState } from "react";
import Input from "../../ui/form/input/Input";
import File from "../../ui/form/input/File";
import Button from "@/components/ui/form/button/Button";
import postRequest from "@/api/local/post";
import { usePathname, useRouter } from "next/navigation";

const ModalForm = (): ReactElement => {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const onformSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (name !== "" && file) {
      const formData = new FormData();

      formData.append("user", name);
      formData.append("file", file);

      const request = await postRequest(formData);

      if (request) {
        alert(`File "${file.name}" has been successfully uploaded by ${name}`);
        setName("");
        setFile(null);
        router.push(pathname);
      }
    }
  };

  return (
    <div>
      <h6 className="text-lg">Form</h6>
      <form className="w-full flex flex-col gap-y-6 mt-2" onSubmit={(e => onformSubmitHandler(e))}>
        <Input
          type="text"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error=""
          required
        />
        <File
          inputName="FileUpload"
          inputId="fileupload"
          buttonContext="Choose file..."
          file={file}
          setFile={setFile}
          accept="image/png, image/jpeg"
          required
        />
        <div className="w-full flex justify-end items-center">
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
};

export default memo(ModalForm);
