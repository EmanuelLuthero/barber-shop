import AvatarSvg from '@assets/avatar.svg';

import { cn } from '@lib/utils/tailwind';
import { IconProps } from '@lib/props';
import { generateIcon } from '@lib/utils/icons';
import { iconDefaultStyles } from '@lib/styles/default';

const Icon = generateIcon(AvatarSvg);

export const AvatarIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={cn(iconDefaultStyles.size, className)} />
);
