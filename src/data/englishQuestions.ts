import { Question, Unit } from "./mathQuestions";

export interface EnglishCategory {
  id: string;
  title: string;
  units: Unit[];
}

export const englishCategories: EnglishCategory[] = [
  {
    id: "conventions",
    title: "Standard English Conventions",
    units: [
      {
        id: "punctuation",
        title: "Punctuation",
        icon: "✏️",
        tip: "Semicolons connect two independent clauses. Commas separate items in a list or set off non-essential info.",
        questions: [
          { id: "p1", text: "Choose the correct sentence:", options: ["The dog, ran quickly.", "The dog ran quickly.", "The dog ran, quickly.", "The, dog ran quickly."], correctIndex: 1, explanation: "No comma needed between subject and verb." },
          { id: "p2", text: "Which uses a semicolon correctly?", options: ["I like cats; and dogs.", "I like cats; dogs are great too.", "I like; cats and dogs.", "I; like cats and dogs."], correctIndex: 1, explanation: "Semicolons join two complete sentences." },
          { id: "p3", text: "Select the correct use of an apostrophe:", options: ["Its a nice day.", "It's a nice day.", "Its' a nice day.", "I'ts a nice day."], correctIndex: 1, explanation: "It's = it is. Its = possessive." },
          { id: "p4", text: "Which sentence needs a comma?", options: ["I went to the store and bought milk.", "After the game we went home.", "She is tall.", "He ran fast."], correctIndex: 1, explanation: "Introductory phrase needs a comma: 'After the game, we went home.'" },
          { id: "p5", text: "Choose the correctly punctuated sentence:", options: ["However she left early.", "However, she left early.", "However; she left early.", "However: she left early."], correctIndex: 1, explanation: "Conjunctive adverbs at the start need a comma after them." },
          { id: "p6", text: "Which is correct?", options: ["The students books were lost.", "The student's books were lost.", "The students' book's were lost.", "The students book's were lost."], correctIndex: 1, explanation: "Student's = one student's books." },
          { id: "p7", text: "Identify the correct colon usage:", options: ["She bought: eggs and milk.", "She bought the following: eggs and milk.", "She: bought eggs and milk.", "She bought the following eggs: and milk."], correctIndex: 1, explanation: "Colons follow a complete clause before a list." },
          { id: "p8", text: "Which sentence is punctuated correctly?", options: ["\"Let's go\" she said.", "\"Let's go,\" she said.", "\"Let's go\", she said.", "\"Let's go;\" she said."], correctIndex: 1, explanation: "Comma goes inside the quotation marks before the dialogue tag." },
          { id: "p9", text: "Select the correct dash usage:", options: ["The winner—a freshman—was surprised.", "The winner a freshman—was surprised.", "The winner—a freshman was surprised.", "The—winner a freshman—was surprised."], correctIndex: 0, explanation: "Em dashes set off non-essential information in pairs." },
          { id: "p10", text: "Which has correct comma placement?", options: ["Red blue and green.", "Red, blue, and green.", "Red, blue and, green.", "Red blue, and green."], correctIndex: 1, explanation: "Use commas to separate items in a list (Oxford comma)." },
        ],
      },
      {
        id: "verb-tense",
        title: "Verb Tense",
        icon: "⏰",
        tip: "Stay consistent with verb tense in a passage. If the context is past, keep it past throughout unless there's a clear shift.",
        questions: [
          { id: "vt1", text: "She ___ to the store yesterday.", options: ["goes", "went", "going", "gone"], correctIndex: 1, explanation: "'Yesterday' signals past tense: went." },
          { id: "vt2", text: "By next year, he ___ his degree.", options: ["completed", "completes", "will have completed", "completing"], correctIndex: 2, explanation: "Future perfect for action completed before a future time." },
          { id: "vt3", text: "They ___ for two hours when the bus arrived.", options: ["waited", "had been waiting", "wait", "are waiting"], correctIndex: 1, explanation: "Past perfect continuous for ongoing past action before another past event." },
          { id: "vt4", text: "Right now, she ___ a book.", options: ["reads", "is reading", "read", "has read"], correctIndex: 1, explanation: "'Right now' signals present continuous." },
          { id: "vt5", text: "He ___ in New York since 2010.", options: ["lives", "lived", "has lived", "is living"], correctIndex: 2, explanation: "'Since 2010' requires present perfect." },
          { id: "vt6", text: "The teacher ___ the lesson before the bell rang.", options: ["finishes", "had finished", "will finish", "finishing"], correctIndex: 1, explanation: "Past perfect for action completed before another past action." },
          { id: "vt7", text: "Every morning, she ___ at 6 AM.", options: ["wakes", "woke", "waking", "will wake"], correctIndex: 0, explanation: "'Every morning' = habitual action = simple present." },
          { id: "vt8", text: "If I ___ harder, I would have passed.", options: ["study", "studied", "had studied", "studying"], correctIndex: 2, explanation: "Past unreal conditional uses past perfect." },
          { id: "vt9", text: "The concert ___ at 8 PM tonight.", options: ["started", "starts", "starting", "has started"], correctIndex: 1, explanation: "Scheduled future events use simple present." },
          { id: "vt10", text: "She realized she ___ her keys at home.", options: ["leaves", "left", "had left", "is leaving"], correctIndex: 2, explanation: "Past perfect: leaving happened before realizing." },
        ],
      },
      {
        id: "subject-verb",
        title: "Subject-Verb Agreement",
        icon: "🤝",
        tip: "Ignore words between the subject and verb. 'The list of items IS long' — 'list' is the subject, not 'items'.",
        questions: [
          { id: "sv1", text: "The group of students ___ ready.", options: ["are", "is", "were", "be"], correctIndex: 1, explanation: "'Group' is singular, so use 'is'." },
          { id: "sv2", text: "Neither the cats nor the dog ___ hungry.", options: ["are", "is", "were", "be"], correctIndex: 1, explanation: "With 'neither...nor', verb agrees with the nearest subject (dog = singular)." },
          { id: "sv3", text: "Everyone ___ a chance to speak.", options: ["get", "gets", "getting", "have gotten"], correctIndex: 1, explanation: "'Everyone' is singular." },
          { id: "sv4", text: "The news ___ surprising.", options: ["are", "is", "were", "have been"], correctIndex: 1, explanation: "'News' is singular despite ending in 's'." },
          { id: "sv5", text: "Each of the players ___ a uniform.", options: ["have", "has", "having", "had have"], correctIndex: 1, explanation: "'Each' is singular." },
          { id: "sv6", text: "The team ___ their best performance.", options: ["give", "gives", "giving", "gave given"], correctIndex: 1, explanation: "Collective nouns are typically singular: 'gives'." },
          { id: "sv7", text: "Mathematics ___ my favorite subject.", options: ["are", "is", "were", "be"], correctIndex: 1, explanation: "Subjects like 'mathematics' are singular." },
          { id: "sv8", text: "Either she or her friends ___ coming.", options: ["is", "are", "was", "be"], correctIndex: 1, explanation: "Verb agrees with nearest subject: 'friends' = plural = 'are'." },
          { id: "sv9", text: "A number of students ___ absent.", options: ["was", "were", "is", "has been"], correctIndex: 1, explanation: "'A number of' = plural meaning." },
          { id: "sv10", text: "The scissors ___ on the table.", options: ["is", "are", "was", "has"], correctIndex: 1, explanation: "'Scissors' is always plural." },
        ],
      },
    ],
  },
  {
    id: "expression",
    title: "Expression of Ideas",
    units: [
      {
        id: "transitions",
        title: "Transitions",
        icon: "🔄",
        tip: "Transitions must match the logical relationship. Contrast → however/nevertheless. Cause → therefore/consequently. Addition → furthermore/moreover.",
        questions: [
          { id: "t1", text: "She studied hard. ___, she got an A.", options: ["However", "Therefore", "Meanwhile", "Instead"], correctIndex: 1, explanation: "Cause and effect: studying led to the A." },
          { id: "t2", text: "He was tired. ___, he kept working.", options: ["Therefore", "Furthermore", "Nevertheless", "Similarly"], correctIndex: 2, explanation: "Contrast: tired BUT kept working." },
          { id: "t3", text: "The price increased. ___, demand dropped.", options: ["Similarly", "Consequently", "Meanwhile", "For instance"], correctIndex: 1, explanation: "Cause and effect: price ↑ → demand ↓." },
          { id: "t4", text: "She enjoys reading. ___, she likes writing.", options: ["However", "In addition", "Instead", "Nevertheless"], correctIndex: 1, explanation: "Adding similar information." },
          { id: "t5", text: "The road was icy. ___, the driver slowed down.", options: ["In contrast", "For this reason", "Regardless", "Similarly"], correctIndex: 1, explanation: "Cause and effect." },
          { id: "t6", text: "Some prefer coffee. ___, others prefer tea.", options: ["Therefore", "In contrast", "Consequently", "Furthermore"], correctIndex: 1, explanation: "Contrasting two groups' preferences." },
          { id: "t7", text: "First, mix the dry ingredients. ___, add the wet ones.", options: ["However", "Next", "Instead", "Nevertheless"], correctIndex: 1, explanation: "Sequential steps use 'next'." },
          { id: "t8", text: "The experiment failed. ___, the team tried a new approach.", options: ["Similarly", "As a result", "In addition", "Meanwhile"], correctIndex: 1, explanation: "The failure caused the new approach." },
          { id: "t9", text: "Cats are independent. ___, dogs tend to be loyal companions.", options: ["In contrast", "Therefore", "Likewise", "Furthermore"], correctIndex: 0, explanation: "Contrasting characteristics." },
          { id: "t10", text: "The museum is free. ___, it attracts many visitors.", options: ["Nevertheless", "Thus", "However", "Instead"], correctIndex: 1, explanation: "Free admission causes many visitors." },
        ],
      },
      {
        id: "concision",
        title: "Concision",
        icon: "✂️",
        tip: "The SAT rewards clear, concise writing. Cut redundant words. 'In order to' → 'to'. 'Due to the fact that' → 'because'.",
        questions: [
          { id: "c1", text: "Choose the most concise version:", options: ["Due to the fact that it rained", "Because it rained", "On account of the rain happening", "It was because of rain"], correctIndex: 1, explanation: "'Because' is the most concise." },
          { id: "c2", text: "Select the most concise option:", options: ["She is a person who is very kind", "She is kind", "She is the kind of person who is kind", "Being a kind person is what she is"], correctIndex: 1, explanation: "Remove unnecessary words." },
          { id: "c3", text: "Which is most concise?", options: ["At this point in time", "Currently", "At the present moment in time", "During this current time period"], correctIndex: 1, explanation: "'Currently' says it all." },
          { id: "c4", text: "Choose the best revision:", options: ["The reason why is because he left", "He left because", "The reason for which he left was because", "It was for the reason that he left"], correctIndex: 1, explanation: "Avoid 'the reason why is because' — redundant." },
          { id: "c5", text: "Most concise?", options: ["In order to succeed", "To succeed", "For the purpose of succeeding", "So that one can succeed"], correctIndex: 1, explanation: "'To succeed' = simplest infinitive form." },
          { id: "c6", text: "Which eliminates wordiness?", options: ["He made a decision to go", "He decided to go", "He came to the decision to go", "A decision was made by him to go"], correctIndex: 1, explanation: "'Decided' replaces 'made a decision'." },
          { id: "c7", text: "Select the most concise:", options: ["Despite the fact that she was sick", "Although she was sick", "Notwithstanding the fact of her being sick", "In spite of her being sick"], correctIndex: 1, explanation: "'Although' is the most direct." },
          { id: "c8", text: "Most concise option?", options: ["She has the ability to sing", "She can sing", "She is able to sing well", "Singing is something she is able to do"], correctIndex: 1, explanation: "'Can' replaces 'has the ability to'." },
          { id: "c9", text: "Which is best?", options: ["They are in agreement with each other", "They agree", "Both of them agree with each other", "They are both in agreement"], correctIndex: 1, explanation: "'They agree' — no redundancy." },
          { id: "c10", text: "Choose the most concise:", options: ["It is important to note that the data shows", "The data shows", "What should be noted is that the data shows", "Importantly, the data shows that"], correctIndex: 1, explanation: "Go straight to the point." },
        ],
      },
    ],
  },
  {
    id: "information",
    title: "Information & Ideas",
    units: [
      {
        id: "main-idea",
        title: "Main Idea",
        icon: "💡",
        tip: "The main idea is the central point the author wants to convey. It's often in the first or last sentence of a passage.",
        questions: [
          { id: "mi1", text: "A passage about declining bee populations focuses on pesticide use. The main idea is:", options: ["Bees make honey", "Pesticides harm bee populations", "Farming is important", "Bees are insects"], correctIndex: 1, explanation: "The focus (pesticide use + declining bees) = main idea." },
          { id: "mi2", text: "The best title for a passage about exercise benefits would be:", options: ["Types of Exercise", "Why Exercise Matters for Health", "Gym Memberships", "Running Shoes"], correctIndex: 1, explanation: "Title should capture the main argument." },
          { id: "mi3", text: "A topic sentence typically:", options: ["Ends the paragraph", "Introduces the main idea", "Provides a detail", "Asks a question"], correctIndex: 1, explanation: "Topic sentences state the paragraph's main point." },
          { id: "mi4", text: "Which is a main idea vs. a detail? 'Solar energy is sustainable' vs. 'Solar panels cost $X'", options: ["Both are main ideas", "Both are details", "First is main idea", "Second is main idea"], correctIndex: 2, explanation: "The broad claim is the main idea; cost is a supporting detail." },
          { id: "mi5", text: "A passage argues for school start times being later. The main idea is:", options: ["Schools exist", "Students are tired", "Later start times benefit students", "Clocks should change"], correctIndex: 2, explanation: "The argument (later starts = better) is the main idea." },
          { id: "mi6", text: "The main idea is different from the theme because:", options: ["They're the same", "Main idea is specific; theme is broad", "Theme is only in fiction", "Main idea is only in nonfiction"], correctIndex: 1, explanation: "Main idea = specific claim. Theme = universal message." },
          { id: "mi7", text: "To find the main idea, you should:", options: ["Read only the first word", "Look at pictures only", "Identify what most sentences support", "Count the paragraphs"], correctIndex: 2, explanation: "The main idea is what most of the passage supports." },
          { id: "mi8", text: "A summary should include:", options: ["Every detail", "The main idea and key points", "Your opinion", "Direct quotes only"], correctIndex: 1, explanation: "Summaries capture the essence, not every detail." },
          { id: "mi9", text: "An implied main idea is one that:", options: ["Is stated directly", "Must be inferred", "Is in the title", "Is in bold"], correctIndex: 1, explanation: "Implied = not directly stated; you figure it out from context." },
          { id: "mi10", text: "Which question helps identify the main idea?", options: ["How long is the passage?", "What is the author's central point?", "How many paragraphs are there?", "Who is the author?"], correctIndex: 1, explanation: "The central point question targets the main idea directly." },
        ],
      },
    ],
  },
  {
    id: "craft",
    title: "Craft & Structure",
    units: [
      {
        id: "word-context",
        title: "Words in Context",
        icon: "📖",
        tip: "For vocabulary-in-context, replace the word with each answer choice and see which makes the most sense in the sentence.",
        questions: [
          { id: "wc1", text: "'The findings were striking.' 'Striking' most nearly means:", options: ["Hitting", "Remarkable", "Attractive", "Frightening"], correctIndex: 1, explanation: "In context of findings, striking = remarkable/notable." },
          { id: "wc2", text: "'She addressed the crowd.' 'Addressed' means:", options: ["Wrote to", "Spoke to", "Lived at", "Decorated"], correctIndex: 1, explanation: "Addressed a crowd = spoke to them." },
          { id: "wc3", text: "'The novel approach worked.' 'Novel' means:", options: ["Book-like", "New and original", "Simple", "Traditional"], correctIndex: 1, explanation: "Novel = new/original (not a book here)." },
          { id: "wc4", text: "'He was reserved during the meeting.' 'Reserved' means:", options: ["Booked ahead", "Quiet and restrained", "Angry", "Prepared"], correctIndex: 1, explanation: "Reserved = quiet, not outspoken." },
          { id: "wc5", text: "'The gravity of the situation was clear.' 'Gravity' means:", options: ["Physics force", "Seriousness", "Weight", "Speed"], correctIndex: 1, explanation: "Gravity of a situation = its seriousness." },
          { id: "wc6", text: "'She cultivated a good reputation.' 'Cultivated' means:", options: ["Farmed", "Developed carefully", "Destroyed", "Inherited"], correctIndex: 1, explanation: "Cultivated = carefully developed over time." },
          { id: "wc7", text: "'The article was objective.' 'Objective' means:", options: ["Goal-oriented", "Unbiased", "Short", "Interesting"], correctIndex: 1, explanation: "Objective reporting = unbiased, neutral." },
          { id: "wc8", text: "'He sustained injuries.' 'Sustained' means:", options: ["Maintained", "Suffered", "Avoided", "Healed"], correctIndex: 1, explanation: "Sustained injuries = suffered/received them." },
          { id: "wc9", text: "'The plan was sound.' 'Sound' means:", options: ["Noisy", "Reliable and good", "Quick", "Heard"], correctIndex: 1, explanation: "Sound plan = solid, well-reasoned." },
          { id: "wc10", text: "'She exercised caution.' 'Exercised' means:", options: ["Worked out", "Used/applied", "Ignored", "Created"], correctIndex: 1, explanation: "Exercised caution = applied/used caution." },
        ],
      },
    ],
  },
];
