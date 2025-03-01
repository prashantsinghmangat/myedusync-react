import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export const Hero = () => {
    return (

        <><section className="py-16 md:py-24 px-6 bg-gradient-to-br to-indigo-50 relative overflow-hidden">
            {/* Decorative elements */}
            {/* <div className="absolute top-20 right-1/4 w-4 h-4 rounded-full bg-blue-300 animate-pulse"></div>
            <div className="absolute bottom-40 right-1/3 w-6 h-6 rounded-full bg-green-400 animate-pulse"></div>
            <div className="absolute top-40 left-1/5 w-10 h-10 rounded-full bg-yellow-300 animate-pulse"></div> */}

            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-block px-4 py-2 bg-orange-100 rounded-full">
                            <span className="text-orange-500">eLearning Platform</span>
                        </div>

                        <h1 className="text-5xl font-bold leading-tight">
                            <span className="text-orange-500">Syncing</span><br />
                            Knowledge <br />
                            Empowering Future <br />

                        </h1>

                        <p className="text-gray-600 text-lg max-w-lg">
                            Unlock your potential with our expert-led courses. Learn at your own pace and achieve your goals with Filearn.
                        </p>

                        <div className="flex items-center space-x-4 pt-2">
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6">
                                Start Free Trial
                            </Button>

                            {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl">
                                Get Started
                            </Button> */}

                            <Button variant="ghost" className="text-black flex items-center space-x-2">
                                <span>How it Work</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>

                            {/* <Button variant="ghost" className=" text-gray-800 flex items-center space-x-2">
                                <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                                    <Play className="w-4 h-4 text-orange-500 ml-0.5" />
                                </div>
                                <span>Watch Demo</span>
                            </Button> */}
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                            </div>
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold text-gray-900">5k+</span> happy students
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -z-10 w-full h-full bg-gradient-to-br from-green-400 -right-5 top-5 rounded-2xl transform rotate-3"></div>
                        <img
                            src="/lovable-uploads/studentone.jpg"
                            alt="Students learning"
                            className="relative z-10 w-full rounded-2xl shadow-xl" />
                    </div>
                </div>
            </div>
        </section>

            {/* <section className="py-16 px-6 bg-white">
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

                        <div className="flex justify-center md">
                            <img
                                src="/lovable-uploads/studentone.jpg"
                                alt="Student with books"
                                className="w-[80%] md:w-[90%] lg:w-[100%] max-w-md object-cover rounded-lg " />
                        </div>
                    </div>
                </div>
            </section> */}

        </>
    );
};