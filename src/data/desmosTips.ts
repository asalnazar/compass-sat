export interface DesmosTip {
  id: string;
  title: string;
  icon: string;
  explanation: string;
  example: string;
  howToUse: string;
}

export const desmosTips: DesmosTip[] = [
  {
    id: "graphing-equations",
    title: "Graphing Equations",
    icon: "📈",
    explanation: "Type any equation directly into Desmos to see its graph instantly. This helps you visualize linear, quadratic, and other functions.",
    example: "To graph y = 2x + 3, simply type 'y = 2x + 3' into the expression line. The line appears immediately.",
    howToUse: "Open Desmos on the digital SAT → Click the expression line → Type your equation → The graph appears automatically. Use this to check your algebra by seeing if the graph matches what you expect.",
  },
  {
    id: "solving-systems",
    title: "Solving Systems with Intersections",
    icon: "🔗",
    explanation: "Graph both equations and find their intersection point. The intersection gives you the solution (x, y) to the system.",
    example: "For the system y = 2x + 1 and y = -x + 7: graph both lines. They intersect at (2, 5), so x = 2 and y = 5.",
    howToUse: "Type equation 1 on line 1 → Type equation 2 on line 2 → Click on the intersection point → Desmos shows the coordinates. This is faster than solving algebraically!",
  },
  {
    id: "checking-answers",
    title: "Checking Multiple Choice Answers",
    icon: "✅",
    explanation: "Plug answer choices back into equations using Desmos to verify which one works. This is a powerful test-taking strategy.",
    example: "If asked 'Which value of x satisfies 3x² - 12 = 0?', graph y = 3x² - 12 and see where it crosses the x-axis. The x-intercepts are your answers.",
    howToUse: "Graph the equation → Look at x-intercepts or use a table → Match with answer choices. You can also type each answer choice and check if the equation equals the expected value.",
  },
  {
    id: "using-tables",
    title: "Using Tables to Find Solutions",
    icon: "📋",
    explanation: "Desmos can generate a table of values for any function. This helps you find specific outputs or identify patterns.",
    example: "For f(x) = x² - 4x + 3, open the table to see values: f(0)=3, f(1)=0, f(2)=-1, f(3)=0. The zeros are x=1 and x=3.",
    howToUse: "Type your function → Click the table icon (grid) next to the expression → Scroll through values to find where the output equals what you need. You can also type specific x-values.",
  },
  {
    id: "graphing-quadratics",
    title: "Graphing Quadratics",
    icon: "🏔️",
    explanation: "Quadratics form parabolas. Desmos instantly shows the vertex, intercepts, and direction. Use this to answer questions about max/min values.",
    example: "Graph y = -x² + 4x - 3. Desmos shows a downward parabola with vertex at (2, 1). The maximum value is 1.",
    howToUse: "Type the quadratic → Click on the vertex point to see coordinates → Click on x-intercepts for roots. For vertex form questions, compare your graph with answer choices.",
  },
  {
    id: "finding-intercepts",
    title: "Finding Intercepts",
    icon: "🎯",
    explanation: "X-intercepts are where y = 0 (roots/zeros). Y-intercepts are where x = 0. Desmos highlights these when you click on the graph.",
    example: "For y = x² - 5x + 6: the graph crosses x-axis at (2, 0) and (3, 0), and the y-axis at (0, 6).",
    howToUse: "Graph the function → Click where the curve crosses the x-axis for x-intercepts → Click where it crosses the y-axis for the y-intercept. Desmos displays exact coordinates.",
  },
];
