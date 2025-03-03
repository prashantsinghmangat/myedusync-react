
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { ArrowRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
    const navigate = useNavigate();
    const [subject, setSubject] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    const handleSearch = () => {
        const searchQuery = subject || selectedSubject;
        if (searchQuery) {
            navigate(`/find-tutor-steps?subject=${searchQuery}`);
        }
    };

    return (
        <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full">
                            <span className="text-accent dark:text-accent"># eLearning Platform</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            <span className="text-orange-500 dark:text-secondary">#Syncing</span><br />
                            Knowledge <br />
                            Empowering Future <br />
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-lg">
                            Unlock your potential with our expert-led courses. Learn at your own pace and achieve your goals with MyEduSync.
                        </p>

                        <div className="flex flex-col space-y-4 w-full max-w-md">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="relative flex-1">
                                    <Input
                                        type="text"
                                        placeholder="Search for subjects..."
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="pr-10"
                                    />
                                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                                <div className="w-full sm:w-48">
                                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="mathematics">Mathematics</SelectItem>
                                            <SelectItem value="science">Science</SelectItem>
                                            <SelectItem value="biology">Biology</SelectItem>
                                            <SelectItem value="chemistry">Chemistry</SelectItem>
                                            <SelectItem value="physics">Physics</SelectItem>
                                            <SelectItem value="english">English</SelectItem>
                                            <SelectItem value="hindi">Hindi</SelectItem>
                                            <SelectItem value="history">History</SelectItem>
                                            <SelectItem value="geography">Geography</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button 
                                className="bg-accent hover:bg-accent-hover text-white w-full"
                                onClick={handleSearch}
                            >
                                Get Started
                            </Button>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Button variant="ghost" className="text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                                <span>How it Works</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" />
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" />
                                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" />
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-semibold text-gray-900 dark:text-gray-200">5k+</span> happy students
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <img
                           src="/lovable-uploads/studentone.jpg"
                            alt="MyEduSync Logo"
                            className="relative w-full max-w-md mx-auto object-contain rounded-lg shadow-xl" />
                    </div>
                </div>
            </div>
        </section>
    );
};
