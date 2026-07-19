import config from '~/config.json';

export const navLinks = [
  {
    key: 'details',
    label: 'Details',
    pathname: '/#details',
  },
  {
    key: 'articles',
    label: 'Articles',
    pathname: '/articles',
  },
  {
    key: 'services',
    label: 'Services',
    pathname: '/services',
  },
  {
    key: 'contact',
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'Instagram',
    url: `https://www.instagram.com/${config.instagram}`,
    icon: 'instagram',
  },
];
