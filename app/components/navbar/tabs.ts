export const tabs = [
  {
    name: 'Inicio',
    path: '/',
    active: true,
    requireLogin: false,
  },
  {
    name: 'Examenes',
    path: '/exams',
    active: true,
    requireLogin: false,
  }, 
  {
    name: 'Buscador',
    path: '/questions',
    active: true,
    requireLogin: true,
  }, 
  {
    name: 'Planes',
    path: '/plans',
    active: true,
    requireLogin: false,
  },
  {
    name: 'Admin',
    path: '/consults',
    active: true,
    requireLogin: true,
  },
]
