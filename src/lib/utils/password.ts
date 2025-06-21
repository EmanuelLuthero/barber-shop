import bcrypt from 'bcryptjs';

export const generateHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(8);

  return await bcrypt.hash(password, salt);
};

export const compareHash = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
