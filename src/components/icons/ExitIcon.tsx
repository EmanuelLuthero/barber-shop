import ExitSvg from '@assets/exit.svg';

import { cn } from '@lib/utils/tailwind';
import { IconProps } from '@lib/props';
import { generateIcon } from '@lib/utils/icons';
import { iconDefaultStyles } from '@lib/styles/default';

const Icon = generateIcon(ExitSvg);

export const ExitIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={cn(iconDefaultStyles.size, className)} />
);
