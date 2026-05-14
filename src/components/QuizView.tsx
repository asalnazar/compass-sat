import { useState, useEffect, useRef } from "react";
import { Question } from "@/data/mathQuestions";
import { useProgress } from "@/contexts/ProgressContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, Trophy, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionText from "@/components/QuestionText";

interface Props {
  unitId: string;
  unitTitle: string;
  questions: Question[];
  section: "math" | "english";
  tip: string;
  onBack: () => void;
}

function generateSimilarQuestions(original: Question): Question[] {
  const similar: Question[] = [];
  for (let i = 1; i <= 2; i++) {
    const shuffled = [...original.options];
    const correct = shuffled[original.correctIndex];
    const rotated = [...shuffled.slice(i % 4), ...shuffled.slice(0, i % 4)] as [string, string, string, string];
    const newCorrectIndex = rotated.indexOf(correct);
    similar.push({
      id: `${original.id}-similar-${i}`,
      text: `Similar Practice ${i}: ${original.text}`,
      options: rotated,
      correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
      explanation: `This mirrors the structure of the previous problem. ${original.explanation}`,
    });
  }
  return similar;
}

function buildAIExplanation(q: Question, picked: number): string {
  const wrong = q.options[picked];
  const right = q.options[q.correctIndex];
  return `You picked "${wrong}". The concept you missed is in the setup of this problem — once you correctly model what's being asked, the answer is "${right}". Here's the breakdown: ${q.explanation} The mistake students usually make on questions like this is jumping to the arithmetic before fully translating the words. Slow that step down and the trap answers disappear.`;
}

function TypingExplanation({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  const [thinking, setThinking] = useState(true);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const timer = setTimeout(() => {
      setThinking(false);
      let i = 0;
      const interval = setInterval(() => {
        i += 3;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 15);
    }, 1500);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className="bg-accent/40 border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI Explanation</span>
      </div>
      {thinking ? (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "150ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "300ms" }} />
          <span className="ml-2">Analyzing your answer…</span>
        </div>
      ) : (
        <p className={`text-sm text-foreground/85 leading-relaxed ${shown.length < text.length ? "typing-cursor" : ""}`}>{shown}</p>
      )}
    </div>
  );
}

export default function QuizView({ unitId, unitTitle, questions, section, tip, onBack }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const { saveScore } = useProgress();

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
    } else setWrongOnCurrent(true);
  };

  const handleStartSimilar = () => {
    setSimilarQuestions(generateSimilarQuestions(q));
    setSimilarIdx(0);
    setSimilarSelected(null);
    setSimilarRevealed(false);
    setShowingSimilar(true);
  };

  const handleSimilarNext = () => {
    if (similarIdx < similarQuestions.length - 1) {
      setSimilarIdx((i) => i + 1);
      setSimilarSelected(null);
      setSimilarRevealed(false);
    } else {
      setShowingSimilar(false);
      goToNext();
    }
  };

  const goToNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setRevealed(false);
      setWrongOnCurrent(false);
    } else {
      saveScore({ unitId, section, questionsAnswered: questions.length, correctAnswers: correctCount, completed: true });
      setFinished(true);
    }
  };

  const optionLetters = ["A", "B", "C", "D"];

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto space-y-6">
        <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-4">
          <Trophy className="h-12 w-12 mx-auto text-warning" />
          <h2 className="font-serif text-4xl">{correctCount}/{questions.length}</h2>
          <p className="text-muted-foreground">{pct >= 80 ? "Strong work." : pct >= 60 ? "Good effort — keep pushing." : "Review this topic and try again."}</p>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="bg-accent/40 border border-border rounded-2xl p-5">
          <h3 className="font-serif text-base mb-1">SAT Tip</h3>
          <p className="text-sm text-muted-foreground">{tip}</p>
        </div>
        <Button onClick={onBack} variant="outline" className="w-full">Back to topics</Button>
      </motion.div>
    );
  }

  if (showingSimilar) {
    const sq = similarQuestions[similarIdx];
    return (
      <div className="max-w-lg mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Similar Practice</span>
          </div>
          <span className="text-xs text-muted-foreground">{similarIdx + 1} / {similarQuestions.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={sq.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <div className="border-l-4 border-primary pl-4 py-1">
                <QuestionText text={sq.text} />
              </div>
              <div className="space-y-2">
                {sq.options.map((opt, i) => {
                  const isCorrect = i === sq.correctIndex;
                  const isPicked = i === similarSelected;
                  let cls = "w-full text-left bg-card border rounded-xl p-3 flex items-center gap-3 text-sm transition-all ";
                  if (similarRevealed) {
                    if (isCorrect) cls += "border-success bg-success/10 ";
                    else if (isPicked) cls += "border-primary bg-primary/10 ";
                    else cls += "border-border opacity-60 ";
                  } else if (isPicked) cls += "border-primary ";
                  else cls += "border-border hover:border-primary/40 ";
                  return (
                    <button key={i} disabled={similarRevealed} onClick={() => { if (!similarRevealed) { setSimilarSelected(i); setSimilarRevealed(true); } }} className={cls}>
                      <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">{optionLetters[i]}</span>
                      <span>{opt}</span>
                      {similarRevealed && isCorrect && <CheckCircle className="ml-auto h-4 w-4 text-success" />}
                      {similarRevealed && isPicked && !isCorrect && <XCircle className="ml-auto h-4 w-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
              {similarRevealed && similarSelected !== null && (
                <TypingExplanation text={buildAIExplanation(sq, similarSelected)} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {similarRevealed && (
          <Button onClick={handleSimilarNext} className="w-full gap-2">
            {similarIdx < similarQuestions.length - 1 ? "Next similar" : "Continue"} <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground">← Back</button>
        <span className="text-xs text-muted-foreground">{currentIdx + 1} / {questions.length}</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>
      <h2 className="font-serif text-xl">{unitTitle}</h2>

      <AnimatePresence mode="wait">
        <motion.div key={q.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="border-l-4 border-primary pl-4 py-1">
              <QuestionText text={q.text} />
            </div>
            <div className="space-y-2">
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correctIndex;
                const isPicked = i === selected;
                let cls = "w-full text-left bg-card border rounded-xl p-3 flex items-center gap-3 text-sm transition-all ";
                if (revealed) {
                  if (isCorrect) cls += "border-success bg-success/10 ";
                  else if (isPicked) cls += "border-primary bg-primary/10 ";
                  else cls += "border-border opacity-60 ";
                } else if (isPicked) cls += "border-primary ";
                else cls += "border-border hover:border-primary/40 ";
                return (
                  <button key={i} disabled={revealed} onClick={() => handleSelect(i)} className={cls}>
                    <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">{optionLetters[i]}</span>
                    <span>{opt}</span>
                    {revealed && isCorrect && <CheckCircle className="ml-auto h-4 w-4 text-success" />}
                    {revealed && isPicked && !isCorrect && <XCircle className="ml-auto h-4 w-4 text-primary" />}
                  </button>
                );
              })}
            </div>
            {revealed && selected !== null && (
              <TypingExplanation text={buildAIExplanation(q, selected)} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {revealed && (
        <div className="space-y-2">
          {wrongOnCurrent && (
            <Button onClick={handleStartSimilar} variant="secondary" className="w-full gap-2">
              <RefreshCw className="h-4 w-4" /> Practice 2 similar questions
            </Button>
          )}
          <Button onClick={goToNext} className="w-full gap-2">
            {currentIdx < questions.length - 1 ? "Next question" : "See results"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
