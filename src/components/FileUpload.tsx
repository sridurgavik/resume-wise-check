
import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      
      const files = Array.from(e.dataTransfer.files);
      const pdfFile = files.find(file => file.type === 'application/pdf');
      
      if (pdfFile) {
        handleFileUpload(pdfFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file only.",
          variant: "destructive",
        });
      }
    },
    [onFileUpload]
  );

  const handleFileUpload = (file: File) => {
    setIsLoading(true);
    // Simulate processing time
    setTimeout(() => {
      setIsLoading(false);
      onFileUpload(file);
    }, 1500);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      handleFileUpload(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg bg-muted/10"
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
        <p className="mt-4 text-sm text-muted-foreground">Analyzing your resume...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg transition-all duration-300 cursor-pointer group ${
        isDragOver
          ? 'border-foreground bg-muted/20'
          : 'border-muted hover:border-foreground/50 hover:bg-muted/10'
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept=".pdf"
        onChange={handleFileInput}
        className="hidden"
      />
      
      <motion.div
        animate={{ scale: isDragOver ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center space-y-4"
      >
        {isDragOver ? (
          <FileText className="h-12 w-12 text-foreground" />
        ) : (
          <Upload className="h-12 w-12 text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
        
        <div className="text-center">
          <p className="text-lg font-medium text-foreground mb-2">
            {isDragOver ? 'Drop your resume here' : 'Upload your resume'}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your PDF file or click to browse
          </p>
          <Button variant="outline" size="sm">
            Choose File
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
