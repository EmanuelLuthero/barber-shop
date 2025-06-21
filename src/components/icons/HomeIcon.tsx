import HomeSvg from '@assets/home.svg';
import FilledHomeSvg from '@assets/home-filled.svg';

import { cn } from '@lib/utils/tailwind';
import { IconProps } from '@lib/props';
import { generateIcon } from '@lib/utils/icons';
import { iconDefaultStyles } from '@lib/styles/default';

const Icon = generateIcon(HomeSvg);
const FilledIcon = generateIcon(FilledHomeSvg);

type Props = IconProps & {
  filled?: boolean;
};

export const HomeIcon: React.FC<Props> = ({ className, filled }) =>
  filled ? (
    <FilledIcon className={cn(iconDefaultStyles.size, className)} />
  ) : (
    <Icon className={cn(iconDefaultStyles.size, className)} />
  );
