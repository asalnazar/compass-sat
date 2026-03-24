import { useState } from "react";
import { Question } from "@/data/mathQuestions";
import { useProgress } from "@/contexts/ProgressContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import QuestionText from "@/components/QuestionText";

interface Props {
  unitId: string;
  unitTitle: string;
  questions: Question[];
  section: "math" | "english";
  tip: string;
  onBack: () => void;
}

export default function QuizView({ unitId, unitTitle, questions, section, tip, onBack }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const { saveScore } = useProgress();

  const q = questions[currentIdx];
  const progress = ((currentIdx + (finished ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === q.correctIndex) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      const finalCorrect = correctCount;
      saveScore({ unitId, section, questionsAnswered: questions.length, correctAnswers: finalCorrect, completed: true });
      setFinished(true);
    }
  };

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto space-y-6">
        <Card className="p-8 text-center space-y-4">
          <Trophy className="h-12 w-12 mx-auto text-warning" />
          <h2 className="text-2xl font-serif font-bold">{correctCount}/{questions.length}</h2>
          <p className="text-muted-foreground">{pct >= 80 ? "Great job! 🎉" : pct >= 60 ? "Good effort! Keep practicing." : "Keep going! Review this topic."}</p>
          <Progress value={pct} className="h-3" />
        </Card>
        <Card className="p-6 bg-secondary/30 border-secondary">
          <h3 className="font-serif font-bold mb-2">💡 SAT Tip</h3>
          <p className="text-sm text-muted-foreground">{tip}</p>
        </Card>
        <Button onClick={onBack} variant="outline" className="w-full">Back to Topics</Button>
      </motion.div>
    );
  }

  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground">← Back</button>
        <span className="text-xs text-muted-foreground">{currentIdx + 1} / {questions.length}</span>
      </div>
      <Progress value={progress} className="h-2" />
      <h2 className="font-serif font-bold text-lg">{unitTitle}</h2>

      <AnimatePresence mode="wait">
        <motion.div key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
          <Card className="p-5 space-y-4">
            <p className="font-medium">{q.text}</p>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                let cls = "border rounded-lg p-3 cursor-pointer transition-all text-sm flex items-center gap-3 ";
                if (revealed) {
                  if (i === q.correctIndex) cls += "border-success bg-success/10 ";
                  else if (i === selected) cls += "border-destructive bg-destructive/10 ";
                  else cls += "border-border opacity-50 ";
                } else if (i === selected) {
                  cls += "border-primary bg-primary/5 ";
                } else {
                  cls += "border-border hover:border-primary/40 ";
                }
                return (
                  <button key={i} onClick={() => handleSelect(i)} className={cls} disabled={revealed}>
                    <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">{optionLetters[i]}</span>
                    <span>{opt}</span>
                    {revealed && i === q.correctIndex && <CheckCircle className="ml-auto h-4 w-4 text-success" />}
                    {revealed && i === selected && i !== q.correctIndex && <XCircle className="ml-auto h-4 w-4 text-destructive" />}
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
          {currentIdx < questions.length - 1 ? "Next Question" : "See Results"} <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
