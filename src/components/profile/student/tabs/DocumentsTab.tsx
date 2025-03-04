
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Pencil } from "lucide-react";

export const DocumentsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Documents</CardTitle>
        <CardDescription>Access and manage your academic documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="h-10 w-10 bg-blue-100 rounded-lg mr-3 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{["Report Card - Fall 2023", "Certificate - Science Olympiad", "Recommendation Letter"][i-1]}</h4>
                <p className="text-xs text-gray-500">Uploaded on {["May 10, 2024", "April 22, 2024", "March 15, 2024"][i-1]}</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          ))}
        </div>
        <Button className="mt-4">
          <Pencil className="h-4 w-4 mr-2" />
          Upload New Document
        </Button>
      </CardContent>
    </Card>
  );
};
