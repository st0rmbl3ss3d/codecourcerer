// app/reports/page.tsx

import { prisma } from "@/lib/prisma"; // adjust if needed
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default async function ReportsPage() {
  const reports = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-10">Your Reports</h1>

        {reports.length === 0 ? (
          <p className="text-gray-400">No reports found.</p>
        ) : (
          <div className="grid gap-6">
            {reports.map((report) => (
              <Card
                key={report.id}
                className="bg-gray-900 border border-cyan-700 shadow-md hover:shadow-cyan-500/20 transition"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-cyan-300">
                        {report.id.slice(0, 8)}...
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">
                        Status:{" "}
                        <span
                          className={`font-medium ${
                            report.status === "finished"
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {report.status}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Created: {new Date(report.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0">
                      <Link
                        href={`/reports/${report.id}`}
                        className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                      >
                        View Report
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
