// Data for custom quick links to display on Linktree-inspired page
// Update this list with your own quick links (e.g., blog, projects, resume)
import { FaCar } from "react-icons/fa";
import { personalData } from './personal-data';
import { SiKubernetes } from "react-icons/si";

/**
 * Array of quick link items for Linktree-inspired page.
 * Each item can include an icon component, a display name, and a URL.
 */
export const quickLinks = [
  {
    name: 'Tech Pickup Line',
    url: 'https://www.youtube.com/playlist?list=PLG_KgaoqTvlr6a5jcbZ97bCQ_XXaTzogx',
    icon: FaCar,
  },
  {
    name: 'Kubernetes Starter: Ingress, Probes & Autoscaling',
    url: 'https://www.youtube.com/playlist?list=PLG_KgaoqTvlqIx03sPeG8axsZ-H4jtQ5W',
    icon: SiKubernetes,
  }
];
