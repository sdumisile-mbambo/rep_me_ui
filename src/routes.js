import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Chefs from './pages/chefs/Chefs';
import EditChef from './pages/chefs/EditChef';
import AddChefForm from './sections/@dashboard/chefs/AddChefForm';
import Cuisines from './pages/admin/Cuisines';
import AddCuisineForm from './pages/admin/AddCuisineForm';
import Menus from './pages/admin/Menus';
import AddMenuForm from './pages/admin/AddMenuForm';
import ViewCuisine from './pages/admin/ViewCuisine';
import ChefSetUpComplete from './pages/ChefSetUpComplete';
import EditMenu from "./pages/menus/EditMenu";
import Packages from './pages/admin/Packages';
import ChatListComponent from './pages/admin/ChatList';
import BookingsList from './pages/bookings/BookingsList';
import BookingDetail from './pages/bookings/BookingDetail';
import Home from './pages/Home';
import UserHome from './pages/UserHome';
import UpdateProfile from './pages/profile/UpdateProfile';
import SubscribtionDetails from './pages/subscription/SubscribtionDetails';
import SubscribtionUpdate from './pages/subscription/SubscribtionUpdate';
import SubscribtionSubscribe from './pages/subscription/SubscribtionSubscribe';
import SubscribtionSuccess from './pages/subscription/SubscribtionSuccess';
import SubscribtionFailure from './pages/subscription/SubscribtionFailure';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/home',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <UserHome /> },
        { path: 'profile', element: <UpdateProfile /> },
        { path: 'subscription', element: <SubscribtionDetails /> },
        { path: 'subscription/subscribe', element: <SubscribtionSubscribe /> },
        { path: 'subscription/update-plan', element: <SubscribtionUpdate /> },
        { path: 'subscription/success', element: <SubscribtionSuccess /> },
        { path: 'subscription/failure', element: <SubscribtionFailure /> },
        { path: 'cuisines', element: <Cuisines /> },
        { path: 'packages', element: <Packages /> },
        { path: 'add/cuisine', element: <AddCuisineForm /> },
        { path: 'cuisine/:cusineId', element: <ViewCuisine /> },
        { path: 'menus', element: <Menus /> },
        { path: 'menu/:menuId', element: <EditMenu /> },
        { path: 'add/menu', element: <AddMenuForm /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'messages', element: <ChatListComponent /> },
        { path: 'bookings', element: <BookingsList /> },
        { path: 'booking/:id', element: <BookingDetail /> },
      ],
    },
    {
      path: 'sign-in',
      element: <Login />,
    },
    {
      path: 'sign-up',
      element: <Register />,
    },
    {
      path: 'register/complete',
      element: <ChefSetUpComplete />,
    },
    // {
    //   path: '/',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     // { path: '/', element: <Navigate to="/login" /> },
    //     { path: '404', element: <NotFound /> },
    //     { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
