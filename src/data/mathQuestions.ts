export interface Question {
  id: string;
  text: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface Unit {
  id: string;
  title: string;
  icon: string;
  questions: Question[];
  tip: string;
}

export const mathUnits: Unit[] = [
  {
    id: "linear-equations",
    title: "Linear Equations",
    icon: "📐",
    tip: "When solving linear equations on the SAT, isolate the variable step by step. Watch for trap answers that result from sign errors.",
    questions: [
      { id: "le1", text: "If 3x + 7 = 22, what is the value of x?", options: ["3", "4", "5", "6"], correctIndex: 2, explanation: "3x + 7 = 22 → 3x = 15 → x = 5" },
      { id: "le2", text: "What is the slope of the line 2y = 6x - 4?", options: ["2", "3", "6", "-4"], correctIndex: 1, explanation: "Divide both sides by 2: y = 3x - 2. The slope is 3." },
      { id: "le3", text: "If 5(x - 2) = 15, what is x?", options: ["3", "5", "7", "1"], correctIndex: 1, explanation: "5x - 10 = 15 → 5x = 25 → x = 5" },
      { id: "le4", text: "The line y = -2x + b passes through (3, 1). What is b?", options: ["5", "7", "-5", "1"], correctIndex: 1, explanation: "1 = -2(3) + b → 1 = -6 + b → b = 7" },
      { id: "le5", text: "Which equation is parallel to y = 4x + 1?", options: ["y = 4x - 3", "y = -4x + 1", "y = x/4 + 1", "y = -x + 4"], correctIndex: 0, explanation: "Parallel lines have the same slope. y = 4x - 3 has slope 4." },
      { id: "le6", text: "If 2x - 3 = x + 5, what is x?", options: ["2", "8", "5", "3"], correctIndex: 1, explanation: "2x - 3 = x + 5 → x = 8" },
      { id: "le7", text: "What is the y-intercept of 3x + 2y = 12?", options: ["4", "6", "3", "12"], correctIndex: 1, explanation: "Set x = 0: 2y = 12 → y = 6" },
      { id: "le8", text: "If f(x) = 2x + 3, what is f(4)?", options: ["8", "11", "14", "7"], correctIndex: 1, explanation: "f(4) = 2(4) + 3 = 11" },
      { id: "le9", text: "A line passes through (0, 5) and (2, 9). What is the slope?", options: ["1", "2", "3", "4"], correctIndex: 1, explanation: "Slope = (9-5)/(2-0) = 4/2 = 2" },
      { id: "le10", text: "If 4x + 8 = 0, what is x?", options: ["-2", "2", "-4", "0"], correctIndex: 0, explanation: "4x = -8 → x = -2" },
    ],
  },
  {
    id: "systems-of-equations",
    title: "Systems of Equations",
    icon: "🔗",
    tip: "For systems, substitution works best when one variable is already isolated. Elimination is faster when coefficients align.",
    questions: [
      { id: "se1", text: "Solve: x + y = 10 and x - y = 2. What is x?", options: ["4", "6", "8", "5"], correctIndex: 1, explanation: "Add both: 2x = 12 → x = 6" },
      { id: "se2", text: "If 2x + y = 7 and x = 3, what is y?", options: ["1", "2", "3", "4"], correctIndex: 0, explanation: "2(3) + y = 7 → y = 1" },
      { id: "se3", text: "How many solutions does y = 2x + 1 and y = 2x + 5 have?", options: ["0", "1", "2", "Infinite"], correctIndex: 0, explanation: "Parallel lines (same slope, different intercepts) never intersect." },
      { id: "se4", text: "Solve: 3x + 2y = 12 and x = 2. What is y?", options: ["3", "2", "4", "1"], correctIndex: 0, explanation: "3(2) + 2y = 12 → 2y = 6 → y = 3" },
      { id: "se5", text: "If x + 2y = 8 and x + y = 5, what is y?", options: ["1", "2", "3", "4"], correctIndex: 2, explanation: "Subtract: y = 3" },
      { id: "se6", text: "A system has infinite solutions when the equations are:", options: ["Perpendicular", "Identical", "Parallel", "Opposite"], correctIndex: 1, explanation: "Identical equations represent the same line, giving infinite solutions." },
      { id: "se7", text: "Solve: y = x + 1 and y = -x + 5. What is x?", options: ["1", "2", "3", "4"], correctIndex: 1, explanation: "x + 1 = -x + 5 → 2x = 4 → x = 2" },
      { id: "se8", text: "If 2x - y = 1 and x + y = 5, what is x?", options: ["1", "2", "3", "4"], correctIndex: 1, explanation: "Add: 3x = 6 → x = 2" },
      { id: "se9", text: "Which method is best when one equation is y = 3x?", options: ["Elimination", "Substitution", "Graphing", "Guessing"], correctIndex: 1, explanation: "Since y is already isolated, substitute directly." },
      { id: "se10", text: "Solve: x - y = 1 and x + y = 7. What is y?", options: ["2", "3", "4", "5"], correctIndex: 1, explanation: "Add: 2x = 8 → x = 4; y = 3" },
    ],
  },
  {
    id: "inequalities",
    title: "Inequalities",
    icon: "⚖️",
    tip: "Remember: when you multiply or divide by a negative number, flip the inequality sign! This is the #1 trap on SAT inequality questions.",
    questions: [
      { id: "iq1", text: "Solve: 2x + 3 > 11", options: ["x > 4", "x > 3", "x < 4", "x > 7"], correctIndex: 0, explanation: "2x > 8 → x > 4" },
      { id: "iq2", text: "If -3x < 12, what is x?", options: ["x < -4", "x > -4", "x < 4", "x > 4"], correctIndex: 1, explanation: "Divide by -3 and flip: x > -4" },
      { id: "iq3", text: "Which value satisfies x + 5 ≤ 8?", options: ["4", "5", "3", "10"], correctIndex: 2, explanation: "x ≤ 3, so x = 3 works." },
      { id: "iq4", text: "Solve: 4x - 1 ≥ 15", options: ["x ≥ 4", "x ≥ 3", "x ≤ 4", "x ≥ 5"], correctIndex: 0, explanation: "4x ≥ 16 → x ≥ 4" },
      { id: "iq5", text: "If 2 < x < 6, which is a possible value of 2x?", options: ["2", "8", "14", "1"], correctIndex: 1, explanation: "If x can be 4, then 2x = 8." },
      { id: "iq6", text: "Solve: -2(x + 1) > 6", options: ["x < -4", "x > -4", "x < 4", "x > 4"], correctIndex: 0, explanation: "-2x - 2 > 6 → -2x > 8 → x < -4" },
      { id: "iq7", text: "Which inequality represents 'x is at most 10'?", options: ["x ≤ 10", "x < 10", "x ≥ 10", "x > 10"], correctIndex: 0, explanation: "'At most' means less than or equal to." },
      { id: "iq8", text: "If 3x + 2 < 20 and x is a positive integer, what's the largest x?", options: ["5", "6", "4", "7"], correctIndex: 0, explanation: "3x < 18 → x < 6 → largest integer is 5" },
      { id: "iq9", text: "Solve: |x| ≤ 3. Which is NOT a solution?", options: ["0", "3", "-3", "4"], correctIndex: 3, explanation: "|4| = 4 > 3, so 4 is not a solution." },
      { id: "iq10", text: "If x > 2 and x < 8, x is in the interval:", options: ["(2, 8)", "[2, 8]", "(2, 8]", "[2, 8)"], correctIndex: 0, explanation: "Strict inequalities use open parentheses: (2, 8)" },
    ],
  },
  {
    id: "ratios-percentages",
    title: "Ratios & Percentages",
    icon: "📊",
    tip: "For percentage problems, translate words to math: 'is' means =, 'of' means ×, 'percent' means /100.",
    questions: [
      { id: "rp1", text: "If 40% of x is 20, what is x?", options: ["40", "50", "60", "80"], correctIndex: 1, explanation: "0.4x = 20 → x = 50" },
      { id: "rp2", text: "The ratio of boys to girls is 3:5. If there are 24 students, how many boys?", options: ["6", "9", "12", "15"], correctIndex: 1, explanation: "3/(3+5) × 24 = 3/8 × 24 = 9" },
      { id: "rp3", text: "A shirt is $60 after a 25% discount. What was the original price?", options: ["$75", "$80", "$85", "$72"], correctIndex: 1, explanation: "0.75 × original = 60 → original = 80" },
      { id: "rp4", text: "What is 15% of 200?", options: ["25", "30", "35", "20"], correctIndex: 1, explanation: "0.15 × 200 = 30" },
      { id: "rp5", text: "A value increases from 50 to 65. What is the percent increase?", options: ["15%", "23%", "30%", "25%"], correctIndex: 2, explanation: "(65-50)/50 × 100 = 30%" },
      { id: "rp6", text: "If a:b = 2:3 and b:c = 3:4, what is a:c?", options: ["2:4", "1:2", "3:4", "2:3"], correctIndex: 1, explanation: "a:b:c = 2:3:4, so a:c = 2:4 = 1:2" },
      { id: "rp7", text: "30 is what percent of 120?", options: ["20%", "25%", "30%", "15%"], correctIndex: 1, explanation: "30/120 × 100 = 25%" },
      { id: "rp8", text: "A population doubles every 5 years. After 15 years, it's multiplied by:", options: ["6", "8", "10", "4"], correctIndex: 1, explanation: "Doubles 3 times: 2³ = 8" },
      { id: "rp9", text: "If x is 20% more than y, and y = 50, what is x?", options: ["55", "60", "70", "65"], correctIndex: 1, explanation: "x = 1.2 × 50 = 60" },
      { id: "rp10", text: "A recipe uses flour to sugar in a 5:2 ratio. With 10 cups of flour, how much sugar?", options: ["2", "3", "4", "5"], correctIndex: 2, explanation: "5/2 = 10/x → x = 4 cups" },
    ],
  },
  {
    id: "statistics",
    title: "Statistics & Data",
    icon: "📈",
    tip: "On data interpretation questions, always read axis labels and units carefully. The SAT loves to test whether you misread a graph.",
    questions: [
      { id: "st1", text: "The mean of 3, 7, 8, 10, 12 is:", options: ["7", "8", "9", "10"], correctIndex: 1, explanation: "(3+7+8+10+12)/5 = 40/5 = 8" },
      { id: "st2", text: "What is the median of 2, 5, 7, 9, 11?", options: ["5", "7", "9", "6"], correctIndex: 1, explanation: "The middle value is 7." },
      { id: "st3", text: "The range of 4, 8, 15, 3, 10 is:", options: ["10", "11", "12", "7"], correctIndex: 2, explanation: "15 - 3 = 12" },
      { id: "st4", text: "In a dataset, the mode is the value that:", options: ["Is in the middle", "Appears most often", "Is the average", "Is the largest"], correctIndex: 1, explanation: "Mode = most frequent value." },
      { id: "st5", text: "If adding 20 to a dataset of mean 10, the mean will:", options: ["Stay 10", "Increase", "Decrease", "Double"], correctIndex: 1, explanation: "Adding a value above the mean increases it." },
      { id: "st6", text: "A standard deviation of 0 means:", options: ["All values are the same", "Mean is 0", "No data", "Negative values"], correctIndex: 0, explanation: "Zero spread means all values are identical." },
      { id: "st7", text: "Which measure is most affected by outliers?", options: ["Median", "Mode", "Mean", "Range"], correctIndex: 2, explanation: "The mean is pulled toward extreme values." },
      { id: "st8", text: "A scatter plot shows a negative correlation when:", options: ["Points go up-right", "Points go down-right", "Points form a circle", "No pattern"], correctIndex: 1, explanation: "Negative correlation: as x increases, y decreases." },
      { id: "st9", text: "The median of 2, 4, 6, 8 is:", options: ["4", "5", "6", "3"], correctIndex: 1, explanation: "Even count: average middle two: (4+6)/2 = 5" },
      { id: "st10", text: "A survey of 100 people found 35 prefer tea. What fraction prefer tea?", options: ["1/3", "7/20", "35/100", "Both B and C"], correctIndex: 3, explanation: "35/100 = 7/20. Both are correct." },
    ],
  },
  {
    id: "quadratics",
    title: "Quadratic Equations",
    icon: "📉",
    tip: "For quadratics, know three forms: standard (ax²+bx+c), vertex (a(x-h)²+k), and factored (a(x-r)(x-s)). Each reveals different info.",
    questions: [
      { id: "qd1", text: "What are the solutions of x² - 5x + 6 = 0?", options: ["2 and 3", "1 and 6", "-2 and -3", "2 and -3"], correctIndex: 0, explanation: "Factor: (x-2)(x-3) = 0 → x = 2, 3" },
      { id: "qd2", text: "The vertex of y = (x-3)² + 2 is:", options: ["(3, 2)", "(-3, 2)", "(3, -2)", "(2, 3)"], correctIndex: 0, explanation: "Vertex form y = (x-h)² + k gives vertex (h, k) = (3, 2)" },
      { id: "qd3", text: "If x² = 49, what are the solutions?", options: ["7 only", "-7 only", "7 and -7", "0 and 7"], correctIndex: 2, explanation: "x = ±7" },
      { id: "qd4", text: "The discriminant of x² + 4x + 4 = 0 is:", options: ["0", "4", "8", "16"], correctIndex: 0, explanation: "b² - 4ac = 16 - 16 = 0" },
      { id: "qd5", text: "A parabola opens downward when:", options: ["a > 0", "a < 0", "b > 0", "c < 0"], correctIndex: 1, explanation: "Negative leading coefficient means downward opening." },
      { id: "qd6", text: "What is the axis of symmetry of y = x² - 6x + 5?", options: ["x = 3", "x = -3", "x = 5", "x = 1"], correctIndex: 0, explanation: "x = -b/(2a) = 6/2 = 3" },
      { id: "qd7", text: "Factor: x² - 9", options: ["(x-3)(x+3)", "(x-9)(x+1)", "(x-3)²", "(x+9)(x-1)"], correctIndex: 0, explanation: "Difference of squares: a² - b² = (a-b)(a+b)" },
      { id: "qd8", text: "If the roots are -1 and 5, the equation is:", options: ["x²-4x-5=0", "x²+4x-5=0", "x²-4x+5=0", "x²+4x+5=0"], correctIndex: 0, explanation: "(x+1)(x-5) = x² - 4x - 5 = 0" },
      { id: "qd9", text: "The y-intercept of y = 2x² - 3x + 7 is:", options: ["2", "-3", "7", "0"], correctIndex: 2, explanation: "Set x = 0: y = 7" },
      { id: "qd10", text: "How many real solutions does x² + 1 = 0 have?", options: ["0", "1", "2", "Infinite"], correctIndex: 0, explanation: "x² = -1 has no real solutions." },
    ],
  },
  {
    id: "exponential",
    title: "Exponential Functions",
    icon: "🚀",
    tip: "Look for growth/decay keywords. Growth: multiply by (1 + rate). Decay: multiply by (1 - rate). The base tells you the rate.",
    questions: [
      { id: "ex1", text: "If f(x) = 2^x, what is f(5)?", options: ["10", "25", "32", "64"], correctIndex: 2, explanation: "2^5 = 32" },
      { id: "ex2", text: "A population grows by 10% yearly from 1000. After 1 year:", options: ["1010", "1100", "1200", "1001"], correctIndex: 1, explanation: "1000 × 1.10 = 1100" },
      { id: "ex3", text: "Which represents exponential decay?", options: ["y = 2^x", "y = (0.5)^x", "y = 3x", "y = x²"], correctIndex: 1, explanation: "Base between 0 and 1 means decay." },
      { id: "ex4", text: "If 3^x = 81, what is x?", options: ["2", "3", "4", "5"], correctIndex: 2, explanation: "3^4 = 81" },
      { id: "ex5", text: "A car depreciates 20% per year from $25,000. Value after 1 year?", options: ["$20,000", "$22,500", "$23,000", "$21,000"], correctIndex: 0, explanation: "25000 × 0.80 = 20000" },
      { id: "ex6", text: "The half-life formula models:", options: ["Linear growth", "Exponential decay", "Quadratic growth", "Constant rate"], correctIndex: 1, explanation: "Half-life is exponential decay." },
      { id: "ex7", text: "Simplify: 2^3 × 2^4", options: ["2^7", "2^12", "4^7", "8^4"], correctIndex: 0, explanation: "Same base: add exponents: 2^(3+4) = 2^7" },
      { id: "ex8", text: "If f(x) = 5(2)^x, what is f(0)?", options: ["0", "2", "5", "10"], correctIndex: 2, explanation: "f(0) = 5(2)^0 = 5(1) = 5" },
      { id: "ex9", text: "An exponential function always has which feature?", options: ["Constant slope", "Horizontal asymptote", "Vertex", "Axis of symmetry"], correctIndex: 1, explanation: "Exponential functions approach but never reach a horizontal line." },
      { id: "ex10", text: "Bacteria double every hour from 100. After 3 hours:", options: ["300", "400", "600", "800"], correctIndex: 3, explanation: "100 × 2^3 = 800" },
    ],
  },
  {
    id: "geometry",
    title: "Geometry",
    icon: "📐",
    tip: "Memorize key formulas: area of triangle = ½bh, circle area = πr², Pythagorean theorem a²+b²=c². Draw diagrams!",
    questions: [
      { id: "ge1", text: "A triangle has sides 3, 4, 5. Is it a right triangle?", options: ["Yes", "No", "Not enough info", "Only if isosceles"], correctIndex: 0, explanation: "3² + 4² = 9 + 16 = 25 = 5². Yes!" },
      { id: "ge2", text: "The area of a circle with radius 5 is:", options: ["25π", "10π", "50π", "5π"], correctIndex: 0, explanation: "A = πr² = π(25) = 25π" },
      { id: "ge3", text: "Angles in a triangle sum to:", options: ["90°", "180°", "270°", "360°"], correctIndex: 1, explanation: "Triangle angles always sum to 180°." },
      { id: "ge4", text: "The circumference of a circle with diameter 10 is:", options: ["5π", "10π", "20π", "100π"], correctIndex: 1, explanation: "C = πd = 10π" },
      { id: "ge5", text: "A square has area 64. What is its perimeter?", options: ["16", "32", "24", "64"], correctIndex: 1, explanation: "Side = √64 = 8. Perimeter = 4(8) = 32" },
      { id: "ge6", text: "In a 30-60-90 triangle, if the shortest side is 5, the hypotenuse is:", options: ["5√2", "5√3", "10", "15"], correctIndex: 2, explanation: "Hypotenuse = 2 × shortest side = 10" },
      { id: "ge7", text: "Vertical angles are:", options: ["Supplementary", "Equal", "Complementary", "Adjacent"], correctIndex: 1, explanation: "Vertical angles are always equal." },
      { id: "ge8", text: "The volume of a cube with side 3 is:", options: ["9", "18", "27", "81"], correctIndex: 2, explanation: "V = s³ = 27" },
      { id: "ge9", text: "An arc of 90° in a circle with radius 4 has length:", options: ["π", "2π", "4π", "8π"], correctIndex: 1, explanation: "Arc = (90/360)(2π)(4) = 2π" },
      { id: "ge10", text: "Two similar triangles have sides in ratio 2:5. If the smaller has area 12, the larger has area:", options: ["30", "60", "75", "120"], correctIndex: 2, explanation: "Area ratio = (2/5)² = 4/25. Larger = 12(25/4) = 75" },
    ],
  },
  {
    id: "trigonometry",
    title: "Basic Trigonometry",
    icon: "🔺",
    tip: "Remember SOH-CAH-TOA: Sine = Opposite/Hypotenuse, Cosine = Adjacent/Hypotenuse, Tangent = Opposite/Adjacent.",
    questions: [
      { id: "tr1", text: "In a right triangle, sin(θ) = opposite/hypotenuse. If opp = 3 and hyp = 5, sin(θ) =", options: ["3/5", "4/5", "5/3", "3/4"], correctIndex: 0, explanation: "sin(θ) = 3/5" },
      { id: "tr2", text: "cos(60°) =", options: ["1/2", "√3/2", "√2/2", "1"], correctIndex: 0, explanation: "cos(60°) = 1/2 is a standard value." },
      { id: "tr3", text: "If tan(θ) = 1, what could θ be?", options: ["30°", "45°", "60°", "90°"], correctIndex: 1, explanation: "tan(45°) = 1" },
      { id: "tr4", text: "sin(30°) =", options: ["1/2", "√3/2", "√2/2", "1"], correctIndex: 0, explanation: "sin(30°) = 1/2" },
      { id: "tr5", text: "In a right triangle with legs 5 and 12, the hypotenuse is:", options: ["13", "17", "7", "15"], correctIndex: 0, explanation: "5² + 12² = 25 + 144 = 169 = 13²" },
      { id: "tr6", text: "sin²(θ) + cos²(θ) =", options: ["0", "1", "2", "θ"], correctIndex: 1, explanation: "This is the Pythagorean identity. Always equals 1." },
      { id: "tr7", text: "If sin(θ) = 4/5, and the triangle is right, cos(θ) =", options: ["3/5", "4/5", "5/4", "4/3"], correctIndex: 0, explanation: "adj = √(25-16) = 3. cos(θ) = 3/5" },
      { id: "tr8", text: "tan(θ) can also be written as:", options: ["sin(θ)/cos(θ)", "cos(θ)/sin(θ)", "1/sin(θ)", "1/cos(θ)"], correctIndex: 0, explanation: "tan(θ) = sin(θ)/cos(θ)" },
      { id: "tr9", text: "In a 45-45-90 triangle with leg 1, the hypotenuse is:", options: ["1", "√2", "2", "√3"], correctIndex: 1, explanation: "Hypotenuse = leg × √2 = √2" },
      { id: "tr10", text: "The angle of elevation from ground to a 20m building at 50m distance is found using:", options: ["sin", "cos", "tan", "cot"], correctIndex: 2, explanation: "tan(θ) = opposite/adjacent = 20/50" },
    ],
  },
];
