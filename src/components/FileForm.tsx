"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FileForm({ handleSubmit }: { handleSubmit: any }) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const submit = () => {
    if (file) {
      // Convert file to Base64 or FormData to send to the backend
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileData = reader.result;
        handleSubmit("file", fileData); // Send file data to the parent component
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  return (
    <div>
      <Input
        type="file"
        accept=".zip,.js,.ts,.py,.txt" // Adjust according to the file types you expect
        onChange={handleFileChange}
        className="w-full mt-4"
      />
      <Button
        onClick={submit}
        className="mt-4 bg-cyan-600 hover:bg-cyan-500"
        disabled={!file}
      >
        Submit File
      </Button>
    </div>
  );
}
