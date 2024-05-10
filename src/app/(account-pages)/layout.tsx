import { Nav } from './(components)/Nav';

const CommonLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='nc-CommonLayoutAccount'>
      <div className='border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800'>
        <Nav />
      </div>
      <div className='container py-14 pb-24 lg:pb-24'>{children}</div>
    </div>
  );
};

export default CommonLayout;
