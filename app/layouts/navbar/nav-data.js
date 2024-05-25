import config from '~/config.json';

export const navLinks = [
  {
    label: 'Services',
    pathname: '/#project-1',
  },
  {
    label: 'Details',
    pathname: '/#details',
  },
  {
    label: 'Articles',
    pathname: '/articles',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'Twitter',
    url: `https://twitter.com/${config.twitter}`,
    icon: 'twitter',
  },


  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
];
