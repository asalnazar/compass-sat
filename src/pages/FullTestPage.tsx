import { useState } from "react";
import { practiceTests, FullTest, TestModule } from "@/data/practiceTests";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Clock, BookOpen, Calculator, ArrowRight, CheckCircle, XCircle, Trophy, ArrowLeft } from "lucide-react";
import QuestionText from "@/components/QuestionText";

export default function FullTestPage() {
  const [activeTest, setActiveTest] = useState<FullTest | null>(null);
  const [activeModule, setActiveModule] = useState<TestModule | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [moduleScores, setModuleScores] = useState<Record<string, number>>({});

  const handleStartModule = (mod: TestModule) => {
    setActiveModule(mod);
    setCurrentIdx(0);
    setSelected(null);
    setRevealed(false);
    setCorrectCount(0);
    setFinished(false);
  };

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === activeModule!.questions[currentIdx].correctIndex) setCorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentIdx < activeModule!.questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setModuleScores(prev => ({ ...prev, [activeModule!.id]: correctCount }));
      setFinished(true);
    }
  };

  const handleBackToTest = () => {
    setActiveModule(null);
    setFinished(false);
  };

  // Module quiz view
  if (activeModule) {
    const q = activeModule.questions[currentIdx];
    const progress = ((currentIdx + (finished ? 1 : 0)) / activeModule.questions.length) * 100;
    const optionLetters = ["A", "B", "C", "D"];

    if (finished) {
      const pct = Math.round((correctCount / activeModule.questions.length) * 100);
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto space-y-6">
          <Card className="p-8 text-center space-y-4">
            <Trophy className="h-12 w-12 mx-auto text-warning" />
            <h2 className="text-2xl font-serif font-bold">{correctCount}/{activeModule.questions.length}</h2>
            <p className="text-sm text-muted-foreground">{activeModule.title}</p>
            <p className="text-muted-foreground">{pct >= 80 ? "Excellent! 🎉" : pct >= 60 ? "Good work! Keep practicing." : "Review this section."}</p>
            <Progress value={pct} className="h-3" />
          </Card>
          <Button onClick={handleBackToTest} variant="outline" className="w-full">Back to Test Overview</Button>
        </motion.div>
      );
    }

    return (
      <div className="max-w-lg mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={handleBackToTest} className="text-sm text-muted-foreground hover:text-foreground">← Back</button>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{activeModule.timeMinutes} min</span>
            <span className="text-xs text-muted-foreground">• {currentIdx + 1}/{activeModule.questions.length}</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        <h2 className="font-serif font-bold text-sm text-muted-foreground">{activeModule.title}</h2>

        <AnimatePresence mode="wait">
          <motion.div key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
            <Card className="p-5 space-y-4">
              <p className="font-medium text-sm leading-relaxed">{q.text}</p>
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  let cls = "border rounded-lg p-3 cursor-pointer transition-all text-sm flex items-center gap-3 ";
                  if (revealed) {
                    if (i === q.correctIndex) cls += "border-success bg-success/10 ";
                    else if (i === selected) cls += "border-destructive bg-destructive/10 ";
                    else cls += "border-border opacity-50 ";
                  } else if (i === selected) cls += "border-primary bg-primary/5 ";
                  else cls += "border-border hover:border-primary/40 ";
                  return (
                    <button key={i} onClick={() => handleSelect(i)} className={cls} disabled={revealed}>
                      <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">{optionLetters[i]}</span>
                      <span className="text-left">{opt}</span>
                      {revealed && i === q.correctIndex && <CheckCircle className="ml-auto h-4 w-4 text-success shrink-0" />}
                      {revealed && i === selected && i !== q.correctIndex && <XCircle className="ml-auto h-4 w-4 text-destructive shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {revealed && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-muted rounded-lg p-3 text-sm text-muted-foreground">
                  <strong>Explanation:</strong> {q.explanation}
                </motion.div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {revealed && (
          <Button onClick={handleNext} className="w-full gap-2">
            {currentIdx < activeModule.questions.length - 1 ? "Next Question" : "See Results"} <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  // Test overview (modules list)
  if (activeTest) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setActiveTest(null)} className="text-sm text-muted-foreground hover:text-foreground">← Back</button>
          <h1 className="text-2xl font-serif font-bold">{activeTest.title}</h1>
        </div>
        <p className="text-sm text-muted-foreground">4 modules • 98 questions total • ~134 minutes</p>
        <div className="grid gap-3">
          {activeTest.modules.map((mod, i) => {
            const score = moduleScores[mod.id];
            const Icon = mod.section === "math" ? Calculator : BookOpen;
            return (
              <motion.div key={mod.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleStartModule(mod)}>
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{mod.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{mod.questions.length} questions</span>
                      <span>•</span>
                      <span>{mod.timeMinutes} min</span>
                      <Badge variant="outline" className="text-xs capitalize">{mod.difficulty}</Badge>
                    </div>
                  </div>
                  {score !== undefined ? (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{score}/{mod.questions.length}</Badge>
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                  ) : (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Test list
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold">Full Practice Tests</h1>
        <p className="text-sm text-muted-foreground">5 complete SAT simulations • $15.99 each</p>
      </div>
      <div className="grid gap-3">
        {practiceTests.map((test, i) => (
          <motion.div key={test.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card
              className={`p-5 flex items-center gap-4 ${i === 0 ? "cursor-pointer hover:shadow-md" : "opacity-60"} transition-shadow`}
              onClick={() => i === 0 && setActiveTest(test)}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-serif font-bold text-primary">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium">{test.title}</h3>
                <p className="text-xs text-muted-foreground">4 modules • 98 questions • ~134 min</p>
              </div>
              {i === 0 ? (
                <Badge className="text-xs">Free Preview</Badge>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline" className="text-xs">$15.99</Badge>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
