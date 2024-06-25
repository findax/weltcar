const SoldBadge = ({
  className = 'absolute bottom-2 right-3 py-1 px-4 text-2xl bg-gray-600 text-white rounded-full',
}: {
  className?: string;
}) => {
  return (
    <div
      className={`nc-SoldBadge flex items-center justify-center z-10 ${className}`}
      data-nc-id='SoldBadge'
    >
      SOLD
    </div>
  );
};

export default SoldBadge;
