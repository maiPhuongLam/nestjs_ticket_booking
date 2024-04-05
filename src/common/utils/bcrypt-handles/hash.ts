import * as bcrypt from 'bcrypt';

export const hash = async (data: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hashSync(data, salt);
};
