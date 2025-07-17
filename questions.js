export const questions = [
    {
        question: "When you think about a large sum of money, what's your immediate feeling?",
        answers: [
            { text: "Excitement and possibility.", category: "abundance" },
            { text: "Anxiety about managing it.", category: "fear" },
            { text: "Guilt, like I don't deserve it.", category: "worthiness" },
            { text: "Suspicion or distrust.", category: "blockage" }
        ]
    },
    {
        question: "How do you feel about spending money on self-care or personal growth?",
        answers: [
            { text: "It's a necessary and joyful investment.", category: "abundance" },
            { text: "I feel guilty and selfish.", category: "worthiness" },
            { text: "I worry I can't afford it, even if I can.", category: "scarcity" },
            { text: "It feels frivolous and wasteful.", category: "blockage" }
        ]
    },
    {
        question: "What was the most common message about money you heard growing up?",
        answers: [
            { text: "'Money is a tool for freedom and impact.'", category: "abundance" },
            { text: "'Money is the root of all evil.'", category: "blockage" },
            { text: "'We can't afford that.'", category: "scarcity" },
            { text: "'You have to work hard for every penny.'", category: "fear" }
        ]
    },
    {
        question: "An unexpected expense appears. Your first reaction is:",
        answers: [
            { text: "Panic about where the money will come from.", category: "scarcity" },
            { text: "Frustration, but I know I can handle it.", category: "abundance" },
            { text: "Fear that this is the start of a financial crisis.", category: "fear" },
            { text: "Resignation, as if bad luck always finds me.", category: "blockage" }
        ]
    },
     {
        question: "How do you feel about wealthy people?",
        answers: [
            { text: "Inspired and curious about their journey.", category: "abundance" },
            { text: "They probably got lucky or were unethical.", category: "blockage" },
            { text: "Jealous and resentful.", category: "scarcity" },
            { text: "Distant, like they are a different species.", category: "worthiness" }
        ]
    }
];

export const beliefs = [
    { id: 'b1', limiting: "I'm not good with money.", empowering: "I am a wise and capable steward of my finances." },
    { id: 'b2', limiting: "Money is hard to come by.", empowering: "Money flows to me easily, frequently, and abundantly." },
    { id: 'b3', limiting: "I don't deserve to be wealthy.", empowering: "I am worthy of all the wealth and happiness life has to offer." },
    { id: 'b4', limiting: "Rich people are greedy or evil.", empowering: "People can create wealth through value, and I can too." },
    { id: 'b5', limiting: "Wanting money is not spiritual.", empowering: "Money is a form of energy that I can use for good in the world." },
    { id: 'b6', limiting: "I'll never have enough money.", empowering: "I release the fear of lack and embrace my abundant reality." },
    { id: 'b7', limiting: "It's selfish to want a lot of money.", empowering: "Having more than enough allows me to be generous with others." },
    { id: 'b8', limiting: "I'm afraid of losing money.", empowering: "I trust my ability to manage money wisely and create more." },
    { id: 'b9', limiting: "I have to work hard for every dollar.", empowering: "I can create wealth with joy, ease, and inspiration." },
    { id: 'b10', limiting: "My family has always struggled with money.", empowering: "I am creating a new legacy of prosperity for myself and my family." },
    { id: 'b11', limiting: "I can't afford the things I truly want.", empowering: "I attract the resources needed to live the life I desire." },
    { id: 'b12', limiting: "Talking about money is taboo.", empowering: "I discuss money with confidence and clarity." },
    { id: 'b13', limiting: "Investing is too risky for me.", empowering: "I am learning and growing my financial intelligence every day." },
    { id: 'b14', limiting: "If I become wealthy, I will change for the worse.", empowering: "Wealth amplifies my positive qualities and my capacity for good." },
    { id: 'b15', limiting: "Someone else is responsible for my finances.", empowering: "I take full ownership of my financial destiny." }
];

export function getDiagnosis(answers) {
    const counts = answers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    const primaryBlockage = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, 'abundance');

    const diagnoses = {
        abundance: {
            text: "Your energy is aligned with abundance! You see money as a positive tool for growth and freedom. Your main task is to maintain and expand this high frequency.",
            affirmation: "I am a magnet for prosperity, and I welcome wealth in all its forms."
        },
        fear: {
            text: "Your primary block is fear around money, likely manifesting as anxiety about having it, losing it, or managing it. This fear can prevent you from taking positive financial risks.",
            affirmation: "I release all fear around money and trust in my ability to create and manage wealth."
        },
        worthiness: {
            text: "You harbor beliefs that you are not deserving of wealth. This can lead to self-sabotage when financial opportunities arise. Your work is to embrace your inherent worth.",
            affirmation: "I am worthy and deserving of financial abundance and success."
        },
        scarcity: {
            text: "You operate from a scarcity mindset, focusing on lack and limitation. This can make you overly cautious and prevent you from seeing or seizing opportunities.",
            affirmation: "I live in an abundant universe. I release the scarcity mindset and embrace limitless possibilities."
        },
        blockage: {
            text: "You hold deep-seated negative beliefs about money, possibly inherited, that create significant blockages. You may see wealth as 'bad' or 'corrupt'.",
            affirmation: "I release all negative and ancestral money stories. I create a new, positive relationship with wealth."
        }
    };

    return diagnoses[primaryBlockage];
}