import fs from "node:fs/promises";

const commad = process.argv[2];

interface plan {
  name: string;
  duration_weeks: number;
  days_per_week: number;
  focus: string;
  exercises: string[];
}

process.on("exit", (code) => {
  console.log(`Process finsihed with exit code ${code}`);
});
if (commad === undefined) {
  console.error("Plan is empty");
  process.exit(1);
}

async function runApp(): Promise<void> {
  console.log({ commad });

  try {
    const data = await fs.readFile("plans.json", { encoding: "utf8" });
    // console.log(data);
    const finalPlan: plan[] = JSON.parse(data);
    // console.log(finalPlan);
    // finalPlan.forEach((plan) => {
    //   console.log(`Plan: ${plan.name} is there`);
    // });
    let found = finalPlan.find((plan) => {
      return plan.name === commad;
    });

    if (found) {
      console.log(`${commad} is there`);
      console.log(JSON.stringify(found, null, 2));
    } else {
      console.log("Not Found");
      process.exit(1);
    }
  } catch (err) {
    console.log(err);
  }
}
runApp();
