import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-6 pt-12 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <div className="inline-block px-4 py-2 bg-orange-100 rounded-full">
                        <span className="text-orange-500">eLearning Platform</span>
                    </div>
                    <h1 className="text-5xl font-bold leading-tight">
                        <span className="text-orange-500">Syncing</span><br />
                        Knowledge <br />
                        Empowering Future <br />

                    </h1>
                    <p className="text-gray-600 max-w-lg">
                        Productionrectly deeply unique intellectual capital without enterprise drive brands & clicks synergy. Enthusiastically revolutionize intuitive.
                    </p>
                    <div className="flex items-center space-x-4">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6">
                            Start Free Trial
                        </Button>
                        <Button variant="ghost" className="text-black flex items-center space-x-2">
                            <span>How it Work</span>
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                {/* <div className="relative" style={{ width: "70%", height: "70%" }}>
                    <img
                        src="/lovable-uploads/studentone.jpg"
                        alt="Student with books"
                        className="w-full"
                    />
                </div> */}

                <div className="flex justify-center md">
                    <img
                        src="/lovable-uploads/studentone.jpg"
                        alt="Student with books"
                        className="w-[80%] md:w-[90%] lg:w-[100%] max-w-md object-cover rounded-lg "
                    />
                </div>
            </div>
        </div>
        
    );
};