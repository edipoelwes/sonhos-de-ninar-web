import Buttons from '../views/components/Buttons.js'
import Charts from '../views/Charts'
import Dashboard from '../views/Dashboard'
import ExtendedForms from '../views/forms/ExtendedForms.js'
import GridSystem from '../views/components/GridSystem.js'
import Icons from '../views/components/Icons'
import Notifications from '../views/components/Notifications.js'
import Panels from '../views/components/Panels.js'
import ReactTables from '../views/tables/ReactTables.js'
import RegularForms from '../views/forms/RegularForms.js'
import Typography from '../views/components/Typography.js'
import ValidationForms from '../views/forms/ValidationForms.js'
import Wizard from '../views/forms/Wizard.js'
import RegularTables from '../views/tables/RegularTables.js'

import ExtendedTables from '../views/tables/ExtendedTables'
import Diapers from '../views/pages/Diapers'
import Users from '../views/pages/Users'
import Customers from '../views/pages/Customers'
import Purchases from '../views/pages/Purchases'
import InputPurchases from '../views/pages/Purchases/purchases'

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-bank',
    component: Dashboard,
    layout: '/admin',
  },
  {
    collapse: true,
    name: 'Usuários',
    icon: 'nc-icon nc-single-02',
    state: 'usersCollapse',
    views: [
      {
        path: '/users',
        name: 'Funcionários',
        mini: 'F',
        component: Users,
        layout: '/admin',
      },
      {
        path: '/clients',
        name: 'Clientes',
        mini: 'C',
        component: Customers,
        layout: '/admin',
      },
    ],
  },
  {
    collapse: true,
    name: 'Produtos',
    icon: 'nc-icon nc-bag-16',
    state: 'productsCollapse',
    views: [
      {
        path: '/diapers',
        name: 'Fraldas',
        mini: 'F',
        component: Diapers,
        layout: '/admin',
      },
    ],
  },
  {
    collapse: true,
    name: 'Compras',
    icon: 'nc-icon nc-cart-simple',
    state: 'transactionCollapse',
    views: [
      {
        path: '/purchases',
        name: 'Compras',
        mini: 'C',
        component: Purchases,
        layout: '/admin',
      },
      {
        path: '/input-purchases',
        name: 'Entrada',
        mini: 'E',
        component: InputPurchases,
        layout: '/admin',
      },
    ],
  },

  {
    collapse: true,
    name: 'Components',
    icon: 'nc-icon nc-layout-11',
    state: 'componentsCollapse',
    views: [
      {
        path: '/buttons',
        name: 'Buttons',
        mini: 'B',
        component: Buttons,
        layout: '/admin',
      },
      {
        path: '/grid-system',
        name: 'Grid System',
        mini: 'GS',
        component: GridSystem,
        layout: '/admin',
      },
      {
        path: '/panels',
        name: 'Panels',
        mini: 'P',
        component: Panels,
        layout: '/admin',
      },
      {
        path: '/notifications',
        name: 'Notifications',
        mini: 'N',
        component: Notifications,
        layout: '/admin',
      },
      {
        path: '/icons',
        name: 'Icons',
        mini: 'I',
        component: Icons,
        layout: '/admin',
      },
      {
        path: '/typography',
        name: 'Typography',
        mini: 'T',
        component: Typography,
        layout: '/admin',
      },
    ],
  },
  {
    collapse: true,
    name: 'Forms',
    icon: 'nc-icon nc-ruler-pencil',
    state: 'formsCollapse',
    views: [
      {
        path: '/regular-forms',
        name: 'Regular Forms',
        mini: 'RF',
        component: RegularForms,
        layout: '/admin',
      },
      {
        path: '/extended-forms',
        name: 'Extended Forms',
        mini: 'EF',
        component: ExtendedForms,
        layout: '/admin',
      },
      {
        path: '/validation-forms',
        name: 'Validation Forms',
        mini: 'VF',
        component: ValidationForms,
        layout: '/admin',
      },
      {
        path: '/wizard',
        name: 'Wizard',
        mini: 'W',
        component: Wizard,
        layout: '/admin',
      },
    ],
  },
  {
    collapse: true,
    name: 'Tables',
    icon: 'nc-icon nc-single-copy-04',
    state: 'tablesCollapse',
    views: [
      {
        path: '/regular-tables',
        name: 'Regular Tables',
        mini: 'RT',
        component: RegularTables,
        layout: '/admin',
      },
      {
        path: '/extended-tables',
        name: 'Extended Tables',
        mini: 'ET',
        component: ExtendedTables,
        layout: '/admin',
      },
      {
        path: '/react-tables',
        name: 'React Tables',
        mini: 'RT',
        component: ReactTables,
        layout: '/admin',
      },
    ],
  },
  {
    path: '/charts',
    name: 'Charts',
    icon: 'nc-icon nc-chart-bar-32',
    component: Charts,
    layout: '/admin',
  },
]

export default routes
