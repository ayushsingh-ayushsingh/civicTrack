import { db } from "@/src/db";
import { issuesTable, issueCategoriesTable } from "@/src/db/schema";
import { faker } from "@faker-js/faker";

const categories = [
    "Roads",
    "Lighting",
    "Water Supply",
    "Cleanliness",
    "Public Safety",
    "Obstructions",
];

async function main() {
    // Ensure categories exist
    const existingCategories = await db.select().from(issueCategoriesTable);
    const existingNames = existingCategories.map((c) => c.name);
    const newCategories = categories
        .filter((name) => !existingNames.includes(name))
        .map((name) => ({ name }));
    if (newCategories.length > 0) {
        await db.insert(issueCategoriesTable).values(newCategories);
    }

    const categoryMap = (
        await db.select().from(issueCategoriesTable)
    ).reduce((acc, cur) => {
        acc[cur.name] = cur.id;
        return acc;
    }, {} as Record<string, number>);

    const baseLat = 28.6139;
    const baseLng = 77.2090;

    const issues = Array.from({ length: 15 }, (_, i) => {
        const category = faker.helpers.arrayElement(categories);
        return {
            title: `${category} issue ${i + 1}`,
            description: faker.lorem.sentences(2),
            categoryId: categoryMap[category],
            latitude: +(baseLat + faker.number.float({ min: -0.02, max: 0.02 })).toFixed(6),
            longitude: +(baseLng + faker.number.float({ min: -0.02, max: 0.02 })).toFixed(6),
            isAnonymous: faker.datatype.boolean(),
            userId: null, // optional: replace with an actual user ID
            status: faker.helpers.arrayElement(["Reported", "In Progress", "Resolved"]),
        };
    });

    await db.insert(issuesTable).values(issues);
    console.log("Seeded 15 random issues.");
}

main().catch((err) => {
    console.error("Error seeding issues:", err);
    process.exit(1);
});
