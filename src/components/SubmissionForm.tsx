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

  // Handle submission to the backend
  const handleSubmit = async (type: string, data: any) => {
    let payload = {};
  
    if (type === "github") {
      payload = { gitRepo: data }; // data is a string
    } else if (type === "code") {
      payload = { code: data }; // still fine
    } else if (type === "file") {
      payload = { file: data }; // still fine
    }
  
    // POST request to API route
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    const result = await res.json();
  
    if (res.ok) {
      alert(`Job created! ID: ${result.jobId}`);
    } else {
      alert(`Error: ${result.error}`);
    }
  };


  // const handleSubmit = async (type: string, data: any) => {
  //   try {
  //     // Determine which type of submission we have and create the body accordingly
  //     let body: any;

  //     if (type === "github") {
  //       body = { gitRepo: data }; // GitHub URL
  //     } else if (type === "code") {
  //       body = { code: data }; // Raw code
  //     } else if (type === "file") {
  //       body = { file: data }; // File object (could be Base64 or FormData)
  //     }

  //     // Make the API request to the backend (Next.js API route)
  //     const response = await fetch("/api/submit", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     });

  //     // Handle the response (e.g., show a success message or handle errors)
  //     if (!response.ok) {
  //       throw new Error("Submission failed");
  //     }

  //     const result = await response.json();
  //     console.log("Job created:", result); // Handle the job ID, status, etc.
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  return (
    <div className="my-6">
      <div className="mb-4">
        <Button onClick={() => setSubmissionType("github")}>GitHub Repo</Button>
        <Button onClick={() => setSubmissionType("code")}>Raw Code</Button>
        <Button onClick={() => setSubmissionType("file")}>File Upload</Button>
      </div>

      {/* Render the appropriate form based on submission type */}
      {submissionType === "github" && <GitHubForm handleSubmit={handleSubmit}/>}
      {submissionType === "code" && <CodeForm handleSubmit={handleSubmit}/>}
      {submissionType === "file" && <FileForm handleSubmit={handleSubmit}/>}
    </div>
  );
}
