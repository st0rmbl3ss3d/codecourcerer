import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "generated/prisma";

const prisma = new PrismaClient();



export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const jobId = params.id;
  const body = await req.json();

  try {
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        status: body.status,
        report: body.report,
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    return NextResponse.json({ error: "Update failed", details: error }, { status: 500 });
  }
}
