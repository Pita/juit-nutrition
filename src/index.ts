import { Root } from "./dishes_type";

const root = require("./dishes.json") as Root;
const entries = root.includes.Entry;

const maxGoals = {
  energy: 1766,
  carbohydrate: 130,
  fat: 58.9,
  salt: 6,
  saturatedFat: 19.6,
};

const minGoals = {
  fiber: 38,
  protein: 120,
};

interface Dish {
  title: string;
  energy: number;
  fat: number;
  protein: number;
  carbohydrate: number;
  salt: number;
  fiber: number;
  saturatedFat: number;
}

export interface ScoredDish extends Dish {
  score: number;
  energyScore: number;
  fatScore: number;
  carbohydrateScore: number;
  saturatedFatScore: number;
  proteinScore: number;
  fiberScore: number;
}

const RATIO = 33;

const closeToIdeal = (value: number, ideal: number, minGoal: boolean) => {
  const diffToIdeal = (value / ideal) * 100 - RATIO;
  const isBad = minGoal ? diffToIdeal < 0 : diffToIdeal > 0;

  return Math.round(
    SCORE_MAX - Math.pow(Math.abs(diffToIdeal), isBad ? 1.5 : 1.0)
  );
};

function calculateDeviation(numbers: number[]): number {
  // Calculate the average deviation
  let sumOfDeviations = numbers.reduce((a, b) => a + Math.abs(b - 100), 0);
  return sumOfDeviations / numbers.length;
}

const scoreDish = (dish: Dish): ScoredDish => {
  const energyScore = closeToIdeal(dish.energy, maxGoals.energy, false);
  const fatScore = closeToIdeal(dish.fat, maxGoals.fat, false);
  const carbohydrateScore = closeToIdeal(
    dish.carbohydrate,
    maxGoals.carbohydrate,
    false
  );
  const saturatedFatScore = closeToIdeal(
    dish.saturatedFat,
    maxGoals.saturatedFat,
    false
  );

  const proteinScore = closeToIdeal(dish.protein, minGoals.protein, true);
  const fiberScore = closeToIdeal(dish.fiber, minGoals.fiber, true);

  const score = Math.round(
    100 -
      calculateDeviation([
        energyScore,
        fatScore,
        carbohydrateScore,
        saturatedFatScore,
        proteinScore,
        fiberScore,
      ])
  );

  return {
    ...dish,
    score,
    energyScore,
    fatScore,
    carbohydrateScore,
    saturatedFatScore,
    proteinScore,
    fiberScore,
  };
};

const percentageOfIdeal = (value: number, ideal: number) => {
  const percentage = Math.round((value / ideal) * 100);
  const diff = percentage - RATIO;

  return `${percentage.toString(10).padStart(2, " ")}% (${
    diff > 0 ? "+" : "-"
  }${Math.abs(diff).toString(10).padStart(2, " ")}%)`;
};

const label = (label: string) => label.padStart(20, " ") + ": ";
const SCORE_MAX = 100;

export const cleanedEntries = entries
  .filter((entry) => entry.fields.energy !== undefined)
  .map((entry): Dish => {
    const factor = entry.fields.weight! / 100;
    const adjust = (value: number | undefined) => Math.round(value! * factor);
    return {
      title: entry.fields.title,
      energy: adjust(entry.fields.energy),
      fat: adjust(entry.fields.fat),
      protein: adjust(entry.fields.protein),
      //   sugar: adjust(entry.fields.sugar),
      carbohydrate: adjust(entry.fields.carbohydrate),
      salt: adjust(entry.fields.salt),
      fiber: adjust(entry.fields.fiber),
      saturatedFat: adjust(entry.fields.saturatedFat),
    };
  })
  .map(scoreDish)
  .sort((a, b) => b.score - a.score);

function main() {
  cleanedEntries.forEach((dish, i) => {
    console.log(`${i + 1}) "${dish.title}", score: ${dish.score}`);
    console.log();
    console.log(
      label("energy"),
      percentageOfIdeal(dish.energy, maxGoals.energy),
      "score:",
      dish.energyScore
    );
    console.log(
      label("fat"),
      percentageOfIdeal(dish.fat, maxGoals.fat),
      "score:",
      dish.fatScore
    );
    console.log(
      label("saturated fat"),
      percentageOfIdeal(dish.saturatedFat, maxGoals.saturatedFat),
      "score:",
      dish.saturatedFatScore
    );

    console.log(
      label("carbohydrate"),
      percentageOfIdeal(dish.carbohydrate, maxGoals.carbohydrate),
      "score:",
      dish.carbohydrateScore
    );
    console.log();
    console.log(
      label("protein"),
      percentageOfIdeal(dish.protein, minGoals.protein),
      "score:",
      dish.proteinScore
    );
    console.log(
      label("fiber"),
      percentageOfIdeal(dish.fiber, minGoals.fiber),
      "score:",
      dish.fiberScore
    );

    console.log();
    console.log();
  });
}

if (require.main === module) {
  main();
}

// console.log(cleanedEntries, cleanedEntries.length);
