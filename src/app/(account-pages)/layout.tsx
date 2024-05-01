import { Nav } from './(components)/Nav';

const CommonLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='nc-CommonLayoutAccount bg-neutral-50 dark:bg-neutral-900'>
      <div className='border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800'>
        <Nav />
      </div>
      <div className='container pt-14 md:pt-20 pb-24 lg:pb-32'>{children}</div>
    </div>
  );
};

export default CommonLayout;
