// seedEmployees.js
import mongoose from "mongoose";
import employeeModel from "./../models/employee.model.js"; // adjust path as needed
import { faker } from '@faker-js/faker';
import bcrypt from "bcryptjs";
import hash from "../../utils/hashPass.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/employment";

const PASSWORD = "Adel@10kamel";
const SALT_ROUNDS = 10;

const experienceLevels = ["junior", "mid", "senior"];
const languages = ["JavaScript", "Python", "Java", "C++", "Go", "TypeScript", "Ruby", "C#", "Rust"];

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected!");
        seedEmployees();
    })
    .catch(err => {
        console.error("MongoDB connection failed:", err);
    });

function getRandomName(min = 5, max = 10) {
    const length = faker.number.int({ min, max });
    return faker.string.alpha({ length, casing: 'mixed' });
}

async function seedEmployees() {
    try {
        await employeeModel.deleteMany(); // optional: clear existing records

        const hashedPassword = await hash(PASSWORD, SALT_ROUNDS);

        const employees = [];

        for (let i = 0; i < 50; i++) {
            const randomLangs = faker.helpers.arrayElements(languages, faker.number.int({ min: 2, max: 5 }));

            const employee = {
                name: getRandomName(5, 10),
                title: faker.person.jobTitle().slice(0, 25), // Trim to 25 chars
                national_ID: faker.number.int({ min: 10000000000000, max: 99999999999999 }),
                email: faker.internet.email().toLowerCase(),
                password: hashedPassword,
                city: faker.location.city(),
                bio: faker.lorem.paragraph().slice(0, 300), // Trim for safety
                experience_level: faker.helpers.arrayElement(experienceLevels),
                programming_langs: randomLangs
            };

            employees.push(employee);
        }

        await employeeModel.insertMany(employees);
        console.log("✅ 50 Employees seeded!");
        process.exit();
    } catch (err) {
        console.error("❌ Error seeding employees:", err);
        process.exit(1);
    }
}
