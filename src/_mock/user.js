import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  profilePicture: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.firstName(),
  surname: faker.name.lastName(),
  email: faker.internet.email(),
  description: 'Chefs are culinary professionals trained in all aspects of food preparation. Their main responsibilities include planning menus, overseeing the kitchen staff, and ensuring that the food meets high-quality standards.',
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'inactive']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
