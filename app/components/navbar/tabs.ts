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
    name: 'Temas',
    path: '/subjects',
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
    name: 'Progreso',
    path: '/progress',
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
