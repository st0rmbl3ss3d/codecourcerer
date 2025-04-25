"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GitHubForm } from "@/components/GitHubForm";
import { CodeForm } from "@/components/CodeForm";
import { FileForm } from "@/components/FileForm";

export function SubmissionForm() {
  const [submissionType, setSubmissionType] = useState<string>("");
  const [code, setCode] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jobStatus, setJobStatus] = useState<{ jobId: string; status: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (type: string, data: any) => {
    setIsLoading(true);
    setJobStatus(null);
    setError(null);

    let payload = {};

    if (type === "github") {
      payload = { gitRepo: data };
    } else if (type === "code") {
      payload = { code: data };
    } else if (type === "file") {
      payload = { file: data };
    }

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.jobId) {
        setJobStatus({ jobId: result.jobId, status: result.status });
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 rounded-xl bg-zinc-900 shadow-md border border-cyan-600/20">
      <div className="flex justify-center space-x-4 mb-6">
      <Button
  variant="outline"
  className={`border border-cyan-400 text-white bg-cyan-900 hover:bg-cyan-700 hover:text-cyan-300 transition duration-200 ${
    submissionType === "github" ? "bg-cyan-900 text-white" : ""
  }`}
  onClick={() => setSubmissionType("github")}
>
  GitHub Repo
</Button>

<Button
  variant="outline"
  className={`border border-cyan-400 text-white bg-cyan-900 hover:bg-cyan-700 hover:text-cyan-300 transition duration-200 ${
    submissionType === "code" ? "bg-white text-cyan-300" : ""
  }`}
  onClick={() => setSubmissionType("code")}
>
  Raw Code
</Button>
<Button
  variant="outline"
  className={`border border-cyan-400 text-cyan-300 bg-cyan-900 hover:bg-cyan-700 hover:text-cyan-300 transition duration-200 ${
    submissionType === "file" ? "bg-cyan-900 text-white" : ""
  }`}
  onClick={() => setSubmissionType("file")}
>
  File Upload
</Button>
      </div>

      {submissionType === "github" && <GitHubForm handleSubmit={(data) => handleSubmit("github", data)} />}
      {submissionType === "code" && <CodeForm handleSubmit={(data) => handleSubmit("code", data)} />}
      {submissionType === "file" && <FileForm handleSubmit={(data) => handleSubmit("file", data)} />}

      {isLoading && (
        <div className="flex flex-col items-center mt-6">
          <svg
            className="animate-spin h-10 w-10 text-cyan-400 drop-shadow-glow"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-cyan-400 mt-2 font-mono text-sm">Initializing analysis...</p>
        </div>
      )}

      {jobStatus && (
        <div className="mt-4 text-green-400 text-center font-mono border border-green-600/40 p-2 rounded">
          ? Job created! ID: {jobStatus.jobId} | Status: {jobStatus.status}
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-400 text-center font-mono border border-red-600/40 p-2 rounded">
          ? Error: {error}
        </div>
      )}
    </div>
  );
}


// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { GitHubForm } from "@/components/GitHubForm";
// import { CodeForm } from "@/components/CodeForm";
// import { FileForm } from "@/components/FileForm";

// export function SubmissionForm() {
//   const [submissionType, setSubmissionType] = useState<string>("");
//   const [code, setCode] = useState("");
//   const [file, setFile] = useState(null);


//   // Handle submission to the backend
//   const handleSubmit = async (type: string, data: any) => {
//     let payload = {};
  
//     if (type === "github") {
//       payload = { gitRepo: data }; // data is a string
//     } else if (type === "code") {
//       payload = { code: data }; // still fine
//     } else if (type === "file") {
//       payload = { file: data }; // still fine
//     }
  
//     // POST request to API route
//     const res = await fetch("/api/submit", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });
  
//     const result = await res.json();
  
//     if (res.ok && result.jobId) {
//       alert(`Job created! ID: ${result.jobId}`);
//     } else {
//       alert(`Error: ${result.error}`);
//     }
//   };
