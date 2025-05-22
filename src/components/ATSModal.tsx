
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Lightbulb, Target, FileText, Share2, Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface ATSModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
}

export function ATSModal({ isOpen, onClose, fileName }: ATSModalProps) {
  const handleRedirect = () => {
    window.open('https://greecode.in', '_blank');
  };

  const analysisData = {
    score: 78,
    keywordMatch: 85,
    formatting: 72,
    improvements: [
      "Add more technical keywords relevant to your field",
      "Use standard section headings (Experience, Education, Skills)",
      "Include quantifiable achievements with numbers",
      "Optimize for ATS by using standard fonts"
    ],
    mistakes: [
      "Missing contact information in header",
      "Using tables or columns that ATS can't read",
      "Inconsistent date formatting"
    ],
    keywords: {
      matched: ["javascript", "react", "frontend", "development", "html", "css"],
      missing: ["typescript", "node.js", "api", "testing"]
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-2xl border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b bg-background/95 backdrop-blur-sm">
              <div>
                <h2 className="text-2xl font-bold">ATS Analysis Results</h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-muted-foreground">{fileName}</p>
                  <Badge variant="outline" className="text-xs">Premium Analysis</Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Overall Score */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="overflow-hidden border-2">
                  <CardHeader className="bg-muted/50">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      ATS Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-4xl font-bold">{analysisData.score}%</span>
                      <div className="text-right">
                        <span className="inline-block px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 text-sm font-medium">
                          Good Match
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">Your resume is well-structured for ATS</p>
                      </div>
                    </div>
                    <Progress value={analysisData.score} className="h-2 mt-4" />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tabs for different sections */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Tabs defaultValue="metrics" className="w-full">
                  <TabsList className="w-full justify-start mb-4 overflow-x-auto">
                    <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                    <TabsTrigger value="improvements">Improvement Suggestions</TabsTrigger>
                    <TabsTrigger value="keywords">Keywords Analysis</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="metrics" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <CheckCircle className="h-4 w-4" />
                            Keyword Matching
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xl font-semibold">{analysisData.keywordMatch}%</span>
                          </div>
                          <Progress value={analysisData.keywordMatch} className="h-1.5" />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            <FileText className="h-4 w-4" />
                            Formatting
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xl font-semibold">{analysisData.formatting}%</span>
                          </div>
                          <Progress value={analysisData.formatting} className="h-1.5" />
                        </CardContent>
                      </Card>
                    </div>
                  
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5" />
                          Common Mistakes Detected
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysisData.mistakes.map((mistake, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="improvements">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lightbulb className="h-5 w-5" />
                          Improvement Suggestions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {analysisData.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                {index + 1}
                              </div>
                              <div>
                                <p className="text-sm">{improvement}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {index === 0 && "Keywords ensure your resume gets through initial ATS filtering."}
                                  {index === 1 && "Standard sections help ATS correctly categorize your information."}
                                  {index === 2 && "Numbers make your achievements stand out and quantifiable."}
                                  {index === 3 && "Simple fonts prevent parsing errors in most ATS systems."}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="keywords">
                    <Card>
                      <CardHeader>
                        <CardTitle>Keyword Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Matched Keywords</h4>
                            <div className="flex flex-wrap gap-2">
                              {analysisData.keywords.matched.map((keyword, i) => (
                                <Badge key={i} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Missing Important Keywords</h4>
                            <div className="flex flex-wrap gap-2">
                              {analysisData.keywords.missing.map((keyword, i) => (
                                <Badge key={i} variant="outline" className="text-muted-foreground">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 p-6 border-t bg-background/95 backdrop-blur-sm">
              <div className="flex flex-wrap gap-3 justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </Button>
                </div>
                <Button onClick={handleRedirect} size="default" className="gap-1">
                  ← Go back to Greecode.in
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
