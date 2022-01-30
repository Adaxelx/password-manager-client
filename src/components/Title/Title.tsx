import React, { ReactNode } from 'react';

type Sizes = 'h1' | 'h2';

interface TitleProps {
  size?: Sizes;
  children: ReactNode;
  className?: string;
  color?: string;
}

const pickClasses = (size: Sizes, color: string) => {
  switch (size) {
    case 'h1':
      return `text-4xl text-${color} font-medium`;
    case 'h2':
      return `text-2xl text-${color} font-medium`;
  }
};

const Title = ({ size: Size = 'h1', className, children, color = 'text-base' }: TitleProps) => {
  return <Size className={`${pickClasses(Size, color)} ${className}`}>{children}</Size>;
};

export default Title;
