import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const GenerateToken = (data: any): string => {
	const token = jwt.sign(data, process.env.JWT_TOKEN as string, { expiresIn: "20s" });

	return token;
}

const GenerateRefreshToken = (data: any): string => {
	const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, { expiresIn: "1d" });

	return token;
}

export default { GenerateToken, GenerateRefreshToken }