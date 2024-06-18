import { Tooltip } from 'react-tooltip';
import { useThemeMode } from '@/utils/useThemeMode';

export default function TooltipComponent({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  const { isDarkMode } = useThemeMode();
  return (
    <Tooltip
      id={id}
      content={content}
      place='top'
      opacity={1}
      border={isDarkMode ? '' : '1px solid #eeeeee'}
      className='!bg-white dark:!bg-neutral-800 !opacity-100 !py-3 !px-5 !text-sm !text-black dark:!text-white !shadow-lg'
    />
  );
}
