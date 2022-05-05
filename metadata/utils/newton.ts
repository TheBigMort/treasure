let precision = 0.0000000000001;
let prevGuess = 0.1;

export function newtonsMethod(f: Function, guess?: number): number {
  const derivative = () => {
    var h = 0.001;
    return  (x: number) => {
      return (f(x + h) - f(x - h)) / (2 * h);
    };
  }
  if (guess === null || guess === undefined) guess = 0;

  if (Math.abs(prevGuess - guess) > precision) {
    prevGuess = guess;
    var approx = guess - f(guess) / derivative()(guess);

    // console.log(f(guess));
    // console.log(derivative(f)(guess));
    // console.log(approx);
    return newtonsMethod(f, approx);
  } else {
if (Number.isNaN(guess)) {
  console.log("working")
}
    return Number.isNaN(guess) ? prevGuess : guess;
  }
}