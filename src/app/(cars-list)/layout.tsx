import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className='relative overflow-hidden'>{children}</div>;
};

export default Layout;
