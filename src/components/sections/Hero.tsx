
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
            {/* Decorative elements matching logo colors */}
            <div className="absolute top-20 right-1/4 w-4 h-4 rounded-full bg-primary animate-pulse"></div>
            <div className="absolute bottom-40 right-1/3 w-6 h-6 rounded-full bg-highlight animate-pulse"></div>
            <div className="absolute top-40 left-1/5 w-10 h-10 rounded-full bg-secondary animate-pulse opacity-70"></div>

            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-block px-4 py-2 bg-accent/20 rounded-full">
                            <span className="text-accent dark:text-accent">eLearning Platform</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            <span className="text-secondary dark:text-secondary">Syncing</span><br />
                            Knowledge <br />
                            Empowering Future <br />
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-lg">
                            Unlock your potential with our expert-led courses. Learn at your own pace and achieve your goals with MyEduSync.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Button className="bg-accent hover:bg-accent-hover text-white px-8 py-6">
                                Start Free Trial
                            </Button>

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
                        <div className="absolute -z-10 w-full h-full bg-gradient-to-br from-highlight/60 -right-5 top-5 rounded-2xl transform rotate-3 dark:from-highlight/30"></div>
                        <img
                            src="/lovable-uploads/studentone.jpg"
                            alt="Students learning"
                            className="relative z-10 w-full rounded-2xl shadow-xl" />
                    </div>
                </div>
            </div>
        </section>
    );
};
