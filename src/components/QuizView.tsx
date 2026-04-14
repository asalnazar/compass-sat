import { useState, useMemo } from "react";
import { Question } from "@/data/mathQuestions";
import { useProgress } from "@/contexts/ProgressContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, Trophy, RefreshCw } from "lucide-react";
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

// Generate 2 similar practice questions based on the original question
function generateSimilarQuestions(original: Question): Question[] {
  const similar: Question[] = [];
  for (let i = 1; i <= 2; i++) {
    // Rearrange options to create a "similar" question feel
    const shuffledOptions = [...original.options];
    const correctAnswer = shuffledOptions[original.correctIndex];
    // Rotate the options
    const rotated = [...shuffledOptions.slice(i % 4), ...shuffledOptions.slice(0, i % 4)] as [string, string, string, string];
    const newCorrectIndex = rotated.indexOf(correctAnswer);
    
    similar.push({
      id: `${original.id}-similar-${i}`,
      text: `Similar Practice ${i}: ${original.text}`,
      options: rotated,
      correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
      explanation: `This is a similar question to help you practice. ${original.explanation}`,
    });
  }
  return similar;
}

export default function QuizView({ unitId, unitTitle, questions, section, tip, onBack }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const { saveScore } = useProgress();

  // Similar questions state
  const [showingSimilar, setShowingSimilar] = useState(false);
  const [similarQuestions, setSimilarQuestions] = useState<Question[]>([]);
  const [similarIdx, setSimilarIdx] = useState(0);
  const [similarSelected, setSimilarSelected] = useState<number | null>(null);
  const [similarRevealed, setSimilarRevealed] = useState(false);
  const [wrongOnCurrent, setWrongOnCurrent] = useState(false);

  const q = questions[currentIdx];
  const progress = ((currentIdx + (finished ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === q.correctIndex) {
      setCorrectCount((c) => c + 1);
      setWrongOnCurrent(false);
    } else {
      setWrongOnCurrent(true);
    }
  };

  const handleStartSimilar = () => {
    const similar = generateSimilarQuestions(q);
    setSimilarQuestions(similar);
    setSimilarIdx(0);
    setSimilarSelected(null);
    setSimilarRevealed(false);
    setShowingSimilar(true);
  };

  const handleSimilarSelect = (idx: number) => {
    if (similarRevealed) return;
    setSimilarSelected(idx);
    setSimilarRevealed(true);
  };

  const handleSimilarNext = () => {
    if (similarIdx < similarQuestions.length - 1) {
      setSimilarIdx((i) => i + 1);
      setSimilarSelected(null);
      setSimilarRevealed(false);
    } else {
      // Done with similar questions, continue to next main question
      setShowingSimilar(false);
      goToNextQuestion();
    }
  };

  const goToNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setRevealed(false);
      setWrongOnCurrent(false);
    } else {
      const finalCorrect = correctCount;
      saveScore({ unitId, section, questionsAnswered: questions.length, correctAnswers: finalCorrect, completed: true });
      setFinished(true);
    }
  };

  const handleNext = () => {
    goToNextQuestion();
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

  // Show similar practice questions
  if (showingSimilar) {
    const sq = similarQuestions[similarIdx];
    const optionLetters = ["A", "B", "C", "D"];
    return (
      <div className="max-w-lg mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Similar Practice</span>
          </div>
          <span className="text-xs text-muted-foreground">Practice {similarIdx + 1} / {similarQuestions.length}</span>
        </div>
        <Card className="p-2 bg-primary/5 border-primary/20">
          <p className="text-xs text-primary text-center">You got the previous question wrong. Practice similar questions to reinforce the concept.</p>
        </Card>

        <AnimatePresence mode="wait">
          <motion.div key={sq.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
            <Card className="p-5 space-y-4">
              <QuestionText text={sq.text} />
              <div className="space-y-2">
                {sq.options.map((opt, i) => {
                  let cls = "border rounded-lg p-3 cursor-pointer transition-all text-sm flex items-center gap-3 ";
                  if (similarRevealed) {
                    if (i === sq.correctIndex) cls += "border-success bg-success/10 ";
                    else if (i === similarSelected) cls += "border-destructive bg-destructive/10 ";
                    else cls += "border-border opacity-50 ";
                  } else if (i === similarSelected) {
                    cls += "border-primary bg-primary/5 ";
                  } else {
                    cls += "border-border hover:border-primary/40 ";
                  }
                  return (
                    <button key={i} onClick={() => handleSimilarSelect(i)} className={cls} disabled={similarRevealed}>
                      <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">{optionLetters[i]}</span>
                      <span>{opt}</span>
                      {similarRevealed && i === sq.correctIndex && <CheckCircle className="ml-auto h-4 w-4 text-success" />}
                      {similarRevealed && i === similarSelected && i !== sq.correctIndex && <XCircle className="ml-auto h-4 w-4 text-destructive" />}
                    </button>
                  );
                })}
              </div>
              {similarRevealed && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-muted rounded-lg p-3 text-sm text-muted-foreground">
                  <strong>Explanation:</strong> {sq.explanation}
                </motion.div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {similarRevealed && (
          <Button onClick={handleSimilarNext} className="w-full gap-2">
            {similarIdx < similarQuestions.length - 1 ? "Next Similar Question" : "Continue to Next Question"} <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
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
            <QuestionText text={q.text} />
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
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-muted rounded-lg p-4 text-sm text-muted-foreground space-y-3">
                <div>
                  <strong className="text-foreground">📖 Detailed Explanation:</strong>
                  <p className="mt-1">{q.explanation}</p>
                </div>
                <div>
                  <strong className="text-foreground">🔑 Key Concept:</strong>
                  <p className="mt-1">Understanding this concept is crucial for the SAT. When you encounter similar problems, always start by identifying what the question is really asking. Break it down step by step and eliminate obviously wrong answers first.</p>
                </div>
                <div>
                  <strong className="text-foreground">⚡ Strategy Tip:</strong>
                  <p className="mt-1">On the real SAT, you'll have about 1.5 minutes per question. Practice timing yourself and don't spend too long on any single question — mark it and come back if needed.</p>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {revealed && (
        <div className="space-y-2">
          {wrongOnCurrent && (
            <Button onClick={handleStartSimilar} variant="secondary" className="w-full gap-2">
              <RefreshCw className="h-4 w-4" /> Practice 2 Similar Questions
            </Button>
          )}
          <Button onClick={handleNext} className="w-full gap-2">
            {currentIdx < questions.length - 1 ? "Next Question" : "See Results"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
