"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CodeForm({ handleSubmit }: { handleSubmit: any }) {
  const [code, setCode] = useState("");

  const submit = () => {
    // Call the parent handleSubmit function with the submission type and data
    handleSubmit("code", code);
  };

  return (
    <div>
      <Textarea
        placeholder="Enter raw code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        className="w-full p-4 mt-4 bg-gray-800 text-white border border-cyan-700"
      />
      <Button onClick={submit} className="mt-4 bg-cyan-600 hover:bg-cyan-500">
        Submit Code
      </Button>
    </div>
  );
}
