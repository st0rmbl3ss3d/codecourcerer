import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/options";
import { PrismaClient } from "generated/prisma";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Get the logged-in user session
    const session = await getServerSession(authOptions);
    const user = session?.user?.name || session?.user?.email || "anonymous";

    // Parse the request body
    const body = await req.json();
    const { gitRepo, code, file } = body;

    // Generate a unique job ID
    const jobId = uuidv4();
    const timestamp = new Date();

    // Save the job in the database
    await prisma.job.create({
      data: {
        id: jobId,
        user,
        createdAt: new Date(),
        status: "created"
      },
    });

    // Forward the request to n8n webhook
    const n8nWebhookUrl = "http://localhost:5678/webhook-test/submit";

    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobId,
        gitRepo,
        code,
        file,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error("Error forwarding data to n8n");
    }

    // Update job status in DB
    await prisma.job.update({
      where: { id: jobId },
      data: { status: result.status || "started" },
    });

    // Respond back to frontend
    return NextResponse.json({ jobId, status: result.status || "started" });

  } catch (error) {
    console.error("Error in /api/submit:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// import { v4 as uuidv4 } from "uuid";
// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();


// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { gitRepo, code, file } = body;

//     // 1. Generate a job ID
//     // const jobId = uuidv4();


//     // 2. Prepare payload to send to n8n
//     const payload = {
//       jobId,
//       gitRepo,
//       code,
//       file,
//     };



//     // 3. Send it to the n8n webhook
//     const n8nWebhookUrl = "http://localhost:5678/webhook-test/submit";

//     const response = await fetch(n8nWebhookUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error("Error forwarding data to n8n");
//     }

//     // 4. Respond back to frontend with the job ID
//     return NextResponse.json({ jobId, status: "created" });
//   } catch (error) {
//     console.error("Error in /api/submit:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
