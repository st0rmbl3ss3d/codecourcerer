import { useState } from "react";
import { Button } from "@/components/ui/button";

type FileFormProps = {
  handleSubmit: (type: string, data: File) => void;
};

export function FileForm({ handleSubmit }: FileFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      handleSubmit("file", file);
    } else {
      alert("Please select a file before submitting.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label
        htmlFor="file-upload"
        className="inline-block cursor-pointer border border-cyan-400 bg-cyan-900 text-white hover:bg-cyan-700 hover:text-cyan-300 px-4 py-2 rounded-md transition duration-200"
      >
        Browse...
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={onFileChange}
        className="hidden"
      />
      {file && (
        <p className="text-sm text-cyan-300">
          Selected File: <span className="font-medium">{file.name}</span>
        </p>
      )}
      <Button type="submit" className="bg-cyan-600 hover:bg-cyan-500">Submit</Button>
    </form>
  );
}

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// type FileFormProps = {
//   handleSubmit: (data: string) => void;
// };

// export function FileForm({ handleSubmit }: FileFormProps) {
//   const [fileData, setFileData] = useState<string>("");

//   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (typeof reader.result === "string") {
//           setFileData(reader.result);
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   const onSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (fileData) {
//       handleSubmit(fileData);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} className="space-y-4">
//       <input
//         type="file"
//         accept=".txt,.js,.py,.ts,.java,.rb,.go"
//         onChange={onFileChange}
//         className="text-white"
//       />
//       <Button type="submit" className="bg-cyan-600 hover:bg-cyan-500">
//         Submit
//       </Button>
//     </form>
//   );
// }
