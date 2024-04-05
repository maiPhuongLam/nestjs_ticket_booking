import * as bcrypt from 'bcrypt';

export const validate = async (input, data): Promise<boolean> => {
  return await bcrypt.compare(input, data);
};
