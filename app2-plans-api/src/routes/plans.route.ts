import { request, Router } from "express";
import z from "zod";

export const PlanSchema = z.strictObject({
    id: z.number(),
    name: z.string("Should be a string").nonempty(),
    category: z.enum(["strength", "cardio", "flexibility"]),
    durationMinutes: z.number("Should be a number").positive().int(),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    price: z.number("Should be a number").positive(),
});

export type Plan = z.infer<typeof PlanSchema>;

export const createPlanRequestSchema = PlanSchema.omit({
    id: true,
});

export const patchNamePlan = PlanSchema.omit({
    id: true,
    category: true,
    durationMinutes: true,
    difficulty: true,
    price: true,
});

export const plans: Plan[] = [
    {
        id: 1,
        name: "Full Body Strength",
        category: "strength",
        durationMinutes: 45,
        difficulty: "beginner",
        price: 10,
    },
    {
        id: 2,
        name: "Morning Cardio",
        category: "cardio",
        durationMinutes: 30,
        difficulty: "intermediate",
        price: 20,
    },
    {
        id: 3,
        name: "Evening Flexibility",
        category: "flexibility",

        durationMinutes: 20,
        difficulty: "beginner",
        price: 15,
    },
];

export const allPlans = Router();

allPlans.get("/plans", (_req, res) => {
    const maxPrice = Number(_req.query.maxPrice);
    console.log(maxPrice);
    const maxPricePlan = plans.filter((plan) => {
        return plan.price > maxPrice;
    });
    // console.log(maxPricePlan);

    if (_req.query.maxPrice) {
        res.status(200).json({
            success: true,
            message: "The greatest in the list",
            data: maxPricePlan,
        });
    }

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
    const request = createPlanRequestSchema.safeParse(_req.body);
    // console.log(request);
    if (!request.success) {
        return res.status(400).json({
            success: false,
            message: request.error.issues.map((issue) => issue.message),
        });
    } else {
        const getLastId = plans.map((plan) => {
            return plan.id;
        });
        const maxId = Math.max(...getLastId);
        // console.log(maxId);
        const newId = maxId + 1;
        // const newPlan = (request.id = newId);
        const onj = { ...request.data, id: newId };
        plans.push(onj);

        res.status(201).json({
            success: true,
            message: "Plan created",
            data: plans,
        });
    }
});

allPlans.patch("/plans/:id", (_req, res) => {
    const id = Number(_req.params.id);
    // console.log(id);
    const update = patchNamePlan.safeParse(_req.body);

    if (!update.success) {
        return res.status(400).json({
            success: false,
            message: update.error.issues.map((issue) => issue.message),
        });
    } else {
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
            name: update.data.name,
        };
        res.status(201).json({
            success: true,
            message: `Updated the ${id} with the new name`,
            data: plans,
        });
    }
    // console.log(update);
    //need to find the object which conatins the id
});

allPlans.delete("/plans/:id", (_req, res) => {
    const id = Number(_req.params.id);
    // console.log(id);
    const obj = plans.findIndex((plan) => {
        return plan.id === id;
    });
    // console.log(obj);
    if (obj != -1) {
        plans.splice(obj, 1);
    }
    res.status(201).json({
        success: true,
        message: "Deleted succesfully",
        data: plans,
    });
});
