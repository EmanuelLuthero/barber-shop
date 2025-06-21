import ScheduleSvg from '@assets/schedule.svg';
import FilledScheduleSvg from '@assets/schedule-filled.svg';

import { cn } from '@lib/utils/tailwind';
import { IconProps } from '@lib/props';
import { generateIcon } from '@lib/utils/icons';
import { iconDefaultStyles } from '@lib/styles/default';

const Icon = generateIcon(ScheduleSvg);
const FilledIcon = generateIcon(FilledScheduleSvg);

type Props = IconProps & {
  filled?: boolean;
};

export const ScheduleIcon: React.FC<Props> = ({ className, filled }) =>
  filled ? (
    <FilledIcon className={cn(iconDefaultStyles.size, className)} />
  ) : (
    <Icon className={cn(iconDefaultStyles.size, className)} />
  );
