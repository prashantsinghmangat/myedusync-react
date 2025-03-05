
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

const FindTutorSteps = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSubject = queryParams.get('subject') || '';
  
  const [step, setStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    subject: initialSubject,
    class: '',
    board: ''
  });

  // Define available options
  const classOptions = [
    { id: 'Class 8', label: 'Class 8' },
    { id: 'Class 9', label: 'Class 9' },
    { id: 'Class 10', label: 'Class 10' },
    { id: 'Class 11', label: 'Class 11' },
    { id: 'Class 12', label: 'Class 12' },
    { id: 'B.Tech', label: 'B.Tech' },
    { id: 'B.Sc', label: 'B.Sc' },
    { id: 'M.Sc', label: 'M.Sc' },
  ];

  const boardOptions = [
    { id: 'CBSE', label: 'CBSE' },
    { id: 'ICSE', label: 'ICSE' },
    { id: 'IGCSE', label: 'IGCSE' },
    { id: 'IB', label: 'IB' },
    { id: 'State Board', label: 'State Board' },
  ];

  const handleOptionSelect = (category, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [category]: value
    });
  };

  const handleNextStep = () => {
    if (step === 1 && selectedOptions.class) {
      setStep(2);
    } else if (step === 2 && selectedOptions.board) {
      // Navigate to find tutor page with all params
      navigate(`/find-tutor?subject=${selectedOptions.subject}&class=${selectedOptions.class}&board=${selectedOptions.board}`);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <SEO 
        title="Find Your Perfect Tutor - MyEduSync" 
        description="Select your preferences to find the best tutors for your educational needs."
      />
      <Header />
      <main className="flex-grow py-20 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find Your Perfect Tutor</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Tell us what you're looking for</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-accent text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-accent' : 'bg-gray-200'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-accent text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Which level are you looking for?</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {classOptions.map(option => (
                        <div 
                          key={option.id}
                          className={`border rounded-lg p-4 text-center cursor-pointer hover:border-accent transition ${selectedOptions.class === option.id ? 'border-accent bg-accent/10' : 'border-gray-200'}`}
                          onClick={() => handleOptionSelect('class', option.id)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Select your board</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {boardOptions.map(option => (
                        <div 
                          key={option.id}
                          className={`border rounded-lg p-4 text-center cursor-pointer hover:border-accent transition ${selectedOptions.board === option.id ? 'border-accent bg-accent/10' : 'border-gray-200'}`}
                          onClick={() => handleOptionSelect('board', option.id)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handleBackStep}>
                  {step === 1 ? 'Cancel' : 'Back'}
                </Button>
                <Button 
                  variant="orange"
                  onClick={handleNextStep}
                  disabled={(step === 1 && !selectedOptions.class) || (step === 2 && !selectedOptions.board)}
                >
                  {step === 2 ? 'Find Tutors' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FindTutorSteps;
