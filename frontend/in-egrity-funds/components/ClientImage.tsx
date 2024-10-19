'use client'; // This makes only this component a Client Component

import React from 'react';
import { CldImage, CldImageProps } from 'next-cloudinary'; // Import CldImage and its props type

interface ClientImageProps extends CldImageProps {
  alt: string; // alt is mandatory for accessibility
  className?: string;
  style?: React.CSSProperties;
}

const ClientImage: React.FC<ClientImageProps> = ({
  src,
  alt,
  className,
  style,
  ...restProps // Spread the rest of the CldImageProps
}) => {
  return (
    <CldImage
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...restProps} // Pass down the remaining props to CldImage
    />
  );
};

export default ClientImage;
