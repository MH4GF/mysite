import type { ReactNode } from 'react';

import { Footer } from './_features';

interface Props {
  children: ReactNode;
}

export default function ArticlesLayout({ children }: Props) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
