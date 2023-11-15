import bcrypt from "bcrypt";

const encrypt = async (password: string): Promise<string> => {
	const result = await bcrypt.hash(password, 10);
	return result;
};

const Compare = async (password: string, passwordHash: string): Promise<boolean> => {
	const matched = await bcrypt.compare(password, passwordHash);

	return matched;
};

export default { encrypt, Compare };