import { NewRatings, Prediction } from './types';

// Formula 1 (to update the rating of a player)
const formula1 = (ratingF: number, scoreF: number, expectedScoreF: number) =>
    Math.round(ratingF - 32 * (scoreF - expectedScoreF));
// Formula 2 Player A (to predict the outcome of a game)
const formula2PA = (ratingA: number, ratingB: number) => {
    let equation = (ratingA - ratingB) / 400;
    equation = 10 ** equation;
    equation += 1;
    equation = 1 / equation;
    return equation.toFixed(2);
};
// Formula 2 Player B(to predict the outcome of a game)
const formula2PB = (ratingA: number, ratingB: number) => {
    let equation = (ratingB - ratingA) / 400;
    equation = 10 ** equation;
    equation += 1;
    equation = 1 / equation;
    return equation.toFixed(2);
};
// Function used to update player's rating
const updateRating = (rating: number, score: number, expectedScore: number): NewRatings => {
    const returnObj = {
        oldRating: rating,
        newRating: formula1(rating, score, expectedScore),
    };
    return returnObj;
};
// Function used to predict outcome
const predictOutcome = (ratingA: number, ratingB: number): Prediction => {
    const returnObj = {
        rating_a: ratingA,
        rating_b: ratingB,
        prediction_a: parseFloat(formula2PA(ratingA, ratingB)),
        prediction_b: parseFloat(formula2PB(ratingA, ratingB)),
    };
    return returnObj;
};

export { formula1, formula2PA, formula2PB, updateRating, predictOutcome };
