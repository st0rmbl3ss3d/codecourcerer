"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function UserInfo() {
  const { data: session } = useSession();

  return (
    <Card className="absolute top-6 right-6 w-80 bg-gray-900 text-white shadow-lg border border-cyan-700">
      <CardContent className="p-6 text-center">
        {!session ? (
          <>
            <p className="text-lg mb-4 font-semibold text-cyan-300">
              You are not signed in.
            </p>
            <Button
              onClick={() => signIn("github")}
              className="bg-cyan-600 hover:bg-cyan-500"
            >
              Sign in with GitHub
            </Button>
          </>
        ) : (
          <>
            <p className="text-lg mb-4">
              Signed in as{" "}
              <span className="font-semibold text-cyan-400">
                {session.user?.name || session.user?.email}
              </span>
            </p>
            <Button
              variant="outline"
              onClick={() => signOut()}
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-800"
            >
              Sign out
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// components/UserInfo.tsx

// function UserInfo({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div>
//       <p>This is a test component</p>
//     </div>
//   );
// }

export { UserInfo }
