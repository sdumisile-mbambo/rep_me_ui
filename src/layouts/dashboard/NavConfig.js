// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'home',
    path: '/home/dashboard',
    icon: getIcon('eva:home-fill'),
  },
  {
    title: 'profile',
    path: '/home/profile',
    icon: getIcon('eva:person-outline'),
  },
  {
    title: 'subscription',
    path: '/home/subscription',
    icon: getIcon('eva:person-outline'),
  },
  {
    title: 'careers',
    path: '/home/careers',
    icon: getIcon('eva:people-fill'),
  },
];

export default navConfig;
