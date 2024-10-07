import React from 'react';

import { Aclonica } from 'next/font/google';
import Link from 'next/link';

const aclonica = Aclonica({ subsets: ['latin'], weight: '400' });

type ViewMoreLinkProps = {
  className?: string;
  href: string;
};

export const ViewMoreLink: React.FC<ViewMoreLinkProps> = ({
  className = '',
  href,
}) => {
  return (
    <Link href={href} className={className}>
      <p
        className={`
          ${aclonica.className}
          text-2xl md:text-5xl
          tracking-custom07 md:tracking-custom16
          animate-fade-down animate-ease-in-out
          underline cursor-pointer
          hover:scale-110 transition-transform duration-300 ease-in-out
          mt-8 mb-4
        `}
      >
        View More
      </p>
    </Link>
  );
};
