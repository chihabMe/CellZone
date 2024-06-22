import { AdminJSOptions } from 'adminjs';
import { getModelByName } from '@adminjs/prisma';

import componentLoader from './component-loader.js';
import { prisma } from 'db';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    {
      resource: { model: getModelByName('User'), client: prisma },
      options: {},
    },

    {
      resource: { model: getModelByName('Category'), client: prisma },
      options: {},
    },

    {
      resource: { model: getModelByName('Product'), client: prisma },
      options: {},
    },
  ],
  databases: [],
};

export default options;
