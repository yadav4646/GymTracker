export type Plan = {
    id: number;
    name: string;
    category: "strength" | "cardio" | "flexibility";
    durationMinutes: number;
    difficulty: "beginner" | "intermediate" | "advanced";
};

export const plans: Plan[] = [
    {
        id: 1,
        name: "Full Body Strength",
        category: "strength",
        durationMinutes: 45,
        difficulty: "beginner",
    },
    {
        id: 2,
        name: "Morning Cardio",
        category: "cardio",
        durationMinutes: 30,
        difficulty: "intermediate",
    },
    {
        id: 3,
        name: "Evening Flexibility",
        category: "flexibility",
        durationMinutes: 20,
        difficulty: "beginner",
    },
];

import { request, Router } from "express";

export const allPlans = Router();

allPlans.get("/plans", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "this is the list",
        data: plans,
    });
});

allPlans.get("/plans/:id", (_req, res) => {
    const userId = parseInt(_req.params.id);
    // console.log(userId);
    const curatedPlan = plans.find((plan) => {
        return plan.id === userId;
    });
    // console.log(curatedPlan);
    if (!curatedPlan) {
        return res.status(404).json({
            success: false,
            message: "This plan is not there",
        });
    }
    res.status(200).json({
        success: true,
        message: "Your specific id",
        data: curatedPlan,
    });
});

allPlans.post("/plans", (_req, res) => {
    const request = _req.body;
    // console.log(request);
    const getLastId = plans.map((plan) => {
        return plan.id;
    });
    const maxId = Math.max(...getLastId);
    // console.log(maxId);
    const newId = maxId + 1;
    // const newPlan = (request.id = newId);
    const onj = { ...request, id: newId };
    plans.push(onj);

    res.status(201).json({
        success: true,
        message: "Plan created",
        data: plans,
    });
});

allPlans.patch("/plans/:id", (_req, res) => {
    const id = Number(_req.params.id);
    // console.log(id);
    const update = _req.body.name;
    // console.log(update);
    //need to find the object which conatins the id
    const obj = plans.findIndex((plan) => plan.id === id);
    // console.log(obj);
    if (obj === -1) {
        return res.status(404).json({
            success: false,
            message: "No plan",
        });
    }
    // spread that object
    // const updatePlan = { ...obj, name: update };
    // console.log(updatePlan);
    //index mutation
    plans[obj] = {
        ...plans[obj],
        name: update,
    };
    res.status(201).json({
        success: true,
        message: `Updated the ${id} with the new name`,
        data: plans,
    });
});
