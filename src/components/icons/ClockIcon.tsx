import ClockSvg from '@assets/clock.svg';

import { cn } from '@lib/utils/tailwind';
import { IconProps } from '@lib/props';
import { generateIcon } from '@lib/utils/icons';
import { iconDefaultStyles } from '@lib/styles/default';

const Icon = generateIcon(ClockSvg);

export const ClockIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={cn(iconDefaultStyles.size, className)} />
);
