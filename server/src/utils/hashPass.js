import bcrypt from "bcryptjs";


export default async function hash(value) {
    const salt = await bcrypt.genSalt(+process.env.SALT);
    const hashedValue = await bcrypt.hash(value, salt);

    return hashedValue
}