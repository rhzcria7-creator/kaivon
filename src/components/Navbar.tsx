import CardNav from './CardNav';

const links = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/socials', label: 'Socials' }
];

export default function Navbar() {
  return <CardNav links={links} />;
}
