import Random from 'random-js'

const random = Random()

export const createQuestion = (text, answers, correctAnswer = 0) => ({
  text,
  answers,
  correctAnswer,
  selectedAnswer: undefined,
})

export const allQuestions = [
  createQuestion("Kuka on Suomen presidentti",
    ["Sauli Niinistö", "Ville Valo", "Kimmo Heikkilä", "Antti Pelkonen"]),
  createQuestion("What's your mother's maiden name?",
    ["Iron Maiden", "Esa", "Pasi", "Jorma"]),
  createQuestion("Mikä on Kirkasta ja haisee pahalta?",
    ["Koskenkorva", "Jaloviina", "Olut", "Ei mikään näistä"]),
  createQuestion("\"Kun Mustanaamio liikkuu, on salamakin hidas kuin ____.\"",
    ["etana", "gaselli", "kilpikonna", "Norton Antivirus"]),
  createQuestion("\"Mustanaamiolla on kymmenen ____ voimat.\"",
    ["tiikerin", "koiran", "leijonan", "karhun"]),
]


export const pickRandomQuestion = () => {
  const question = random.pick(allQuestions);
  const correctAnswerStr = question.answers[question.correctAnswer];
  let answers = question.answers.slice();
  random.shuffle(answers);
  return {
    ...question,
    answers,
    correctAnswer: answers.indexOf(correctAnswerStr),
  }
}
