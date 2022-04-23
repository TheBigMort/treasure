import { Map as IMap } from 'immutable';

export interface Prediction {
    rating_a: number;
    prediction_a: number;
    rating_b: number;
    prediction_b: number;
}
export interface NewRatings {
    oldRating: number;
    newRating: number;
}
export interface Matchup {
    itemA: string;
    itemB: string;
    prediction: Prediction;
}
export type IPrediction = IMap<keyof Prediction, Prediction[keyof Prediction]>;

export type INewRatings = IMap<keyof NewRatings, NewRatings[keyof NewRatings]>;
