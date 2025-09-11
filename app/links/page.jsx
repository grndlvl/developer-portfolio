// Linktree-inspired page listing social links and custom quick links
import Image from 'next/image';
import Link from 'next/link';
import { personalData } from '@/utils/data/personal-data';
import { quickLinks } from '@/utils/data/quicklinks-data';
import { BsGithub, BsLinkedin, BsFacebook, BsTwitterX } from 'react-icons/bs';
import { SiDrupal, SiCalendly } from 'react-icons/si';
import { TbBrandFiverr } from 'react-icons/tb';

export default function LinksPage() {
  const socialLinks = [
    { name: 'GitHub', url: personalData.github, icon: BsGithub },
    { name: 'LinkedIn', url: personalData.linkedIn, icon: BsLinkedin },
    { name: 'Drupal', url: personalData.drupal, icon: SiDrupal },
    { name: 'Fiverr', url: personalData.fiverr, icon: TbBrandFiverr },
    { name: 'Twitter', url: personalData.twitter, icon: BsTwitterX },
    { name: 'Facebook', url: personalData.facebook, icon: BsFacebook },
    { name: 'Calendly', url: personalData.calendly, icon: SiCalendly },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center py-16 space-y-8">
      {/* background graphic from home hero */}
      <Image
        src="/hero.svg"
        alt="Background"
        width={1572}
        height={795}
        priority
        formats={["image/avif", "image/webp"]}
        className="absolute -top-[98px] -z-10"
      />
      <Image
        src={personalData.profile}
        alt={personalData.name}
        width={120}
        height={120}
        className="rounded-full"
        priority
      />
      <h1 className="text-4xl font-bold text-center">{personalData.name}</h1>
      <p className="text-center max-w-xl text-sm text-gray-300">
        {personalData.description}
      </p>

      <div className="w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-center">Social Links</h2>
        {socialLinks.map(({ name, url, icon: Icon }) => (
          <Link
            href={url}
            key={name}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 py-3 px-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            <Icon size={24} />
            <span>{name}</span>
          </Link>
        ))}
      </div>

      {quickLinks.length > 0 && (
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-2xl font-semibold text-center">Quick Links</h2>
          {quickLinks.map(({ name, url, icon: Icon }) => (
            <Link
              href={url}
              key={name}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-pink-600 rounded-lg hover:bg-pink-500 transition"
            >
              {Icon && <Icon size={24} />}
              <span>{name}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
