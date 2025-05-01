import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

export default async function ReportPage({ params }: Params) {
  const report = await prisma.job.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!report) {
    notFound();
  }

  let parsedReport: any[] = [];

  try {
    if (typeof report.report === "string") {
      parsedReport = JSON.parse(report.report);
    } else if (Array.isArray(report.report)) {
      parsedReport = report.report;
    }
  } catch (err) {
    console.error("Failed to parse report JSON:", err);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Report: {params.id}</h1>

      {parsedReport.length === 0 && (
        <Card className="bg-yellow-800 text-white">
          <CardContent className="p-4">
            <p>No valid report data found or unable to parse report.</p>
          </CardContent>
        </Card>
      )}

      {parsedReport?.map((entry: any, index: number) => {
        let data;

        try {
          data =
            typeof entry.output === "string"
              ? JSON.parse(entry.output)
              : entry.output;
        } catch (err) {
          console.error("Error parsing entry.output:", err);
          return (
            <Card key={index} className="bg-red-900 text-white p-4 mb-4">
              <CardContent>
                <p>Error parsing report entry.</p>
              </CardContent>
            </Card>
          );
        }

        if (!data || !data.Filename) {
          return (
            <Card key={index} className="bg-yellow-800 text-white p-4 mb-4">
              <CardContent>
                <p>Malformed report entry. No filename found.</p>
              </CardContent>
            </Card>
          );
        }

        return (
          <Card key={index} className="bg-gray-900 border border-gray-700 text-gray-200 mb-6">
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-semibold text-cyan-300">{data.Filename}</h3>
              <p><strong>Language:</strong> {data.Language}</p>
              <p><strong>MD5:</strong> {data.Hash?.MD5}</p>

              <div className="mt-4 space-y-4">
                {data.Findings?.map((finding: any, i: number) => (
                  <div key={i} className="border-t border-gray-700 pt-2">
                    <p className="text-cyan-200 font-medium">{finding.Name}</p>
                    <p className="text-sm text-gray-400">Severity: {finding.Severity}</p>
                    <p className="text-sm text-gray-400">Location: {finding.Location}</p>
                    <pre className="bg-gray-800 p-2 rounded text-sm overflow-x-auto">
                      {finding["Code Snippet"]}
                    </pre>
                    <p className="text-sm text-gray-300"><strong>Description:</strong> {finding.Description}</p>
                    <p className="text-sm text-gray-300"><strong>Remediation:</strong> {finding.Remediation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
