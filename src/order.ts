import { ScoredDish, cleanedEntries } from ".";

function powScore(score: number): number {
  return Math.pow(Math.max(score, 0), 2);
}

function weightedRandomPick(
  _elements: ScoredDish[],
  pickCount: number
): Map<ScoredDish, number> {
  if (_elements.length < pickCount) {
    throw new Error("Not enough elements to pick from");
  }

  const elements = _elements.map((element) => ({
    ...element,
    score: powScore(element.score),
  }));

  // Calculate the total score
  const totalScore = elements.reduce((sum, element) => sum + element.score, 0);

  // Create a new array with cumulative scores
  let cumulativeScore = 0;
  const cumulativeScores = elements.map(
    (element, i): { element: ScoredDish; cumulativeScore: number } => {
      const newCumulativeScore = cumulativeScore + element.score / totalScore;
      cumulativeScore = newCumulativeScore;

      return {
        element: element,
        cumulativeScore: newCumulativeScore,
      };
    }
  );

  const picked: Map<ScoredDish, number> = new Map();

  let pickedNum = 0;
  while (pickedNum < pickCount) {
    const random = Math.random();

    // Find the element that corresponds to the random number
    const pickedScoredDish = cumulativeScores.find((element, index) => {
      if (index === 0) {
        return random < element.cumulativeScore;
      } else {
        return (
          random >= cumulativeScores[index - 1].cumulativeScore &&
          random < element.cumulativeScore
        );
      }
    })!;

    const currentCount = picked.get(pickedScoredDish.element) ?? 0;
    if (currentCount < 1) {
      picked.set(pickedScoredDish.element, currentCount + 1);
      pickedNum++;
    }
  }

  return picked;
}

const bestDishes = cleanedEntries.slice(0, 5).map((dish) => [dish, 2] as const);
const randomDishes = Array.from(
  weightedRandomPick(cleanedEntries.slice(5), 10).entries()
);

[...bestDishes, ...randomDishes].map(([dish, count]) => {
  console.log(`${count}x "${dish.title}"`);
});
