import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { gitRepo, code, file } = body;

    // 1. Generate a job ID
    const jobId = uuidv4();

    // 2. Prepare payload to send to n8n
    const payload = {
      jobId,
      gitRepo,
      code,
      file,
    };

    // 3. Send it to the n8n webhook
    const n8nWebhookUrl = "http://localhost:5678/webhook-test/submit";

    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error("Error forwarding data to n8n");
    }

    // 4. Respond back to frontend with the job ID
    return NextResponse.json({ jobId, status: "created" });
  } catch (error) {
    console.error("Error in /api/submit:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
