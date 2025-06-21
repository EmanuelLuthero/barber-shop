import PlusSvg from '@assets/plus.svg';

import { IconProps } from '@lib/props';
import { cn } from '@lib/utils/tailwind';
import { generateIcon } from '@lib/utils/icons';
import { iconDefaultStyles } from '@lib/styles/default';

const Icon = generateIcon(PlusSvg);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={cn(iconDefaultStyles.size, className)} />
);
