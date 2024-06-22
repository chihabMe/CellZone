import { Database, Resource } from '@adminjs/prisma';
import AdminJS from 'adminjs';
import { prisma } from 'db';
AdminJS.registerAdapter({ Database, Resource });
const initialize = async () => ({ prisma });
export default initialize;
