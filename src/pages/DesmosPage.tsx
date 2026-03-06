import { desmosTips } from "@/data/desmosTips";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function DesmosPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold">Desmos Calculator Tips</h1>
        <p className="text-sm text-muted-foreground">Master the digital SAT calculator</p>
      </div>
      <div className="grid gap-4">
        {desmosTips.map((tip, i) => (
          <motion.div key={tip.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tip.icon}</span>
                <h3 className="font-serif font-bold">{tip.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{tip.explanation}</p>
              <div className="bg-secondary/40 rounded-lg p-3 space-y-2">
                <p className="text-sm font-medium">📝 Example</p>
                <p className="text-sm text-muted-foreground">{tip.example}</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-3 space-y-2">
                <p className="text-sm font-medium">🖥️ How to Use</p>
                <p className="text-sm text-muted-foreground">{tip.howToUse}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
