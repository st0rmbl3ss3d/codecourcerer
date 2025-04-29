// // "use client";
// import { Input } from "@/components/ui/input";
// // import { UserInfo } from "@/components/UserInfo";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { UserInfoSection } from "@/components/UserInfoSection";

// // export function UserInfo() {
// //   const { data: session } = useSession();

// //   if (!session) {
// //     return (
// //       <button onClick={() => signIn("github")}>Sign in with GitHub</button>
// //     );
// //   }

// //   return (
// //     <div>
// //       <p>Signed in as {session.user.name}</p>
// //       <button onClick={() => signOut()}>Sign out</button>
// //     </div>
// //   );
// // }



// export default function Home() {
//   return (
//     <main className="min-h-screen bg-black text-white p-6 font-mono">
//       <UserInfoSection />
//       <div className="max-w-3xl mx-auto">
      
//         <h1 className="text-4xl font-bold mb-8 text-cyan-400 text-center">CodeSourcerer</h1>

//         <div className="space-y-6">
//           {/* GitHub Repo URL Submission */}
//           <div className="bg-zinc-900 p-4 rounded-2xl shadow-md">
//             <label htmlFor="repo" className="block text-lg mb-2 text-cyan-300">GitHub Repository URL</label>
//             <Input
//               id="repo"
//               type="url"
//               placeholder="https://github.com/username/repo"
//               className="bg-zinc-800 border-zinc-700 focus:ring-cyan-400"
//             />
//             <Button className="mt-3 bg-cyan-600 hover:bg-cyan-700 text-white">Analyze Repo</Button>
//           </div>

//           {/* Raw Code Submission */}
//           <div className="bg-zinc-900 p-4 rounded-2xl shadow-md">
//             <label htmlFor="rawcode" className="block text-lg mb-2 text-cyan-300">Paste Raw Code</label>
//             <Textarea
//               id="rawcode"
//               rows={6}
//               placeholder="Paste your code here..."
//               className="bg-zinc-800 border-zinc-700 focus:ring-cyan-400"
//             />
//             <Button className="mt-3 bg-cyan-600 hover:bg-cyan-700 text-white">Analyze Code</Button>
//           </div>

//           {/* File Upload Submission */}
//           <div className="bg-zinc-900 p-4 rounded-2xl shadow-md">
//             <label htmlFor="file" className="block text-lg mb-2 text-cyan-300">Upload Code File</label>
//             <Input
//               id="file"
//               type="file"
//               className="bg-zinc-800 border-zinc-700 focus:ring-cyan-400"
//             />
//             <Button className="mt-3 bg-cyan-600 hover:bg-cyan-700 text-white">Upload & Analyze</Button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";

import { SubmissionForm } from "@/components/SubmissionForm";
import { UserInfoSection } from "@/components/UserInfoSection";
import Link from "next/link";


// Adjust the path based on your structure

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-semibold mb-6">Submit Code for Analysis</h1>
      <div>
      <UserInfoSection />
      <Link href="/reports" className="text-cyan-400 hover:underline">
      View Reports
      </Link>

      </div>
      
      {/* Here we are rendering the SubmissionForm component */}
      <SubmissionForm />
    </main>
  );
}
