// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Utilisateurs',
    path: '/dashboard/utilisateur',
    icon: icon('users'),
  },
  // {
  //   title: 'Formateurs',
  //   path: '/dashboard/products',
  //   icon: icon('trainer'),
  // },
  {
    title: 'Formations',
    path: '/dashboard/formation',
    icon: icon('elearning'),
  },
 
 
];

export default navConfig;
