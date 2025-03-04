
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ProfileInfoItem } from "../../shared/ProfileInfoItem";

interface AcademicsTabProps {
  formData: {
    school: string;
    grade: string;
  };
}

export const AcademicsTab = ({ formData }: AcademicsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ProfileInfoItem label="School" value={formData.school} />
          <ProfileInfoItem label="Grade" value={formData.grade} />
        </div>
        
        <h3 className="font-semibold text-lg mt-6 mb-4">Enrolled Courses</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="h-14 w-14 bg-gray-200 rounded-lg mr-3 flex-shrink-0 overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${i+60}/200/200`} 
                  alt="Course thumbnail"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{["Advanced Physics", "Calculus II", "Organic Chemistry"][i-1]}</h4>
                <p className="text-sm text-gray-500">Prof. {["Robert Johnson", "Emily Chen", "David Wilson"][i-1]}</p>
                <div className="mt-1 flex space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                    {["Physics", "Mathematics", "Chemistry"][i-1]}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                    Grade 11
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
