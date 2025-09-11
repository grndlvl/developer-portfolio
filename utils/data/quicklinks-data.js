// Data for custom quick links to display on Linktree-inspired page
// Update this list with your own quick links (e.g., blog, projects, resume)
import { personalData } from './personal-data';
import { FaBlog, FaFilePdf, FaProjectDiagram } from 'react-icons/fa';

/**
 * Array of quick link items for Linktree-inspired page.
 * Each item can include an icon component, a display name, and a URL.
 */
export const quickLinks = [
//  {
//    name: 'Blog',
//    url: '/blog',
//    icon: FaBlog,
//  },
//  {
//    name: 'Projects',
//    url: '/projects',
//    icon: FaProjectDiagram,
//  },
  {
    name: 'Resume',
    url: personalData.resume,
    icon: FaFilePdf,
  },
];
