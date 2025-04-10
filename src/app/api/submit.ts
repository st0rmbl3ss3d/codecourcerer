// pages/api/submit.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { gitRepo, code, file } = req.body;

    // Logic to forward the data to n8n, depending on the submission type
    const n8nWebhookUrl = "http://localhost:5678/webhook-test/submit"; // Replace with your actual n8n webhook URL

    try {
      const response = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gitRepo,
          code,
          file,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error("Error forwarding data to n8n");
      }

      // Respond back to the frontend with the result (e.g., job ID or status)
      res.status(200).json({ jobId: result.jobId, status: "created" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
