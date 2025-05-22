
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUpload } from '@/components/FileUpload';
import { ATSModal } from '@/components/ATSModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { toast } from '@/hooks/use-toast';
import { canScanToday, markScanCompleted, getNextScanDate } from '@/utils/storage';
import { Zap, User } from 'lucide-react';

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileUpload = (file: File) => {
    if (!canScanToday()) {
      toast({
        title: "Daily limit reached",
        description: `You can only upload one resume per day. Come back tomorrow (${getNextScanDate()}).`,
        variant: "destructive",
      });
      return;
    }

    setUploadedFileName(file.name);
    markScanCompleted();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6" />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold leading-none">GreecodeATS</h2>
            <span className="text-xs text-muted-foreground">by greecode.in</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-background/40 text-sm">
            <User className="h-4 w-4" />
            <span>Hello, User</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Free ATS Resume Checker
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            1 scan per day.
          </motion.p>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <FileUpload onFileUpload={handleFileUpload} />
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold">Instant Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get your ATS score and detailed feedback in seconds
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold">Smart Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Actionable suggestions to improve your resume's ATS compatibility
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                Your resume is never stored. Analysis happens locally and securely
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ATS Modal */}
      <ATSModal
        isOpen={showModal}
        onClose={handleCloseModal}
        fileName={uploadedFileName}
      />
    </div>
  );
};

export default Index;
