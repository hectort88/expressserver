module.exports = {
    quotes: [
        "Without music, life would be a mistake.",
        "That which does not kill us makes us stronger.",
        "You must have chaos within you to give birth to a dancing star.",
        "In heaven, all the interesting people are missing.",
        "There are no facts, only interpretations.",
        "The man of knowledge must be able not only to love his enemies but also to hate his friends.",
        "He who has a why to live for can bear almost any how."
    ],
    getQuote: (quotes) => {
        return quotes[Math.floor(quotes.length * Math.random())]
    }
}