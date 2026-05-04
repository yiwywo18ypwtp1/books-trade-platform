import bcrypt from "bcrypt"

export const hashPass = async (password: string) => {
    const salt = 10;
    const hashed = await bcrypt.hash(password, salt);

    return hashed;
}

export const checkPass = async (plainPassword: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

    if (!isMatch) throw { message: "Incorrect password", status: 401 }

    return isMatch;
}