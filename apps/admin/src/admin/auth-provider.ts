import { DefaultAuthProvider } from 'adminjs';
import { prisma } from 'db';
import { compare } from 'bcrypt';

import componentLoader from './component-loader.js';
import { DEFAULT_ADMIN } from './constants.js';

/**
 * Make sure to modify "authenticate" to be a proper authentication method
 */
const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) return null;
    const isValid = await compare(password, user.password);
    if (!isValid) return null;
    if (user.role != 'admin') return null;
    return user;
  },
});

export default provider;
