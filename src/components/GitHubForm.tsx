"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// type GitHubFormProps = {
//   handleSubmit: (type: string, data: any) => Promise<void>;
// };
type GitHubFormProps = {
  handleSubmit: (data: string) => void;
};

export function GitHubForm({ handleSubmit }: GitHubFormProps) {
  const [gitRepo, setGitRepo] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(gitRepo);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Enter GitHub repo URL"
        value={gitRepo}
        onChange={(e) => setGitRepo(e.target.value)}
      />
      <Button type="submit" className="bg-cyan-600 hover:bg-cyan-500">
        Submit GitHub Repo
      </Button>
    </form>
  );
}

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export function GitHubForm({ handleSubmit }: { handleSubmit: any }) {
//   const [githubLink, setGithubLink] = useState("");

//   const submit = () => {
//     // Call the parent handleSubmit function with the submission type and data
//     handleSubmit("github", githubLink);
//   };
    

//   return (
//     <div>
//       <Input
//         type="text"
//         placeholder="Enter GitHub Repo URL"
//         value={githubLink}
//         onChange={(e) => setGithubLink(e.target.value)}
//       />
//       <Button onClick={submit}>Submit</Button>
//     </div>
//   );
// }
