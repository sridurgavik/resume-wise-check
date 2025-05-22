
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUpload } from '@/components/FileUpload';
import { ATSModal } from '@/components/ATSModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { toast } from '@/hooks/use-toast';
import { canScanToday, markScanCompleted, getNextScanDate } from '@/utils/storage';

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
      <ThemeToggle />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Free ATS Resume Checker
            <span className="block text-muted-foreground text-2xl lg:text-3xl font-normal mt-2">
              by Greecode
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            1 scan per day. No login needed.
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
