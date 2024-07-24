import { Image, ImageBackground, ImageSourcePropType } from 'react-native';
import React, { Children, ComponentProps, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

type RemoteImageBackgroundProps = {
  path?: string | null;
  fallback: ImageSourcePropType;
  classNameAsProps?: string;
  bucket: string;
  children: React.ReactNode;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImageBackground = ({ path, fallback, classNameAsProps, bucket, children, ...imageProps }: RemoteImageBackgroundProps) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!path) return;
    (async () => {
      setImage('');
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path);

      if (error) {
        console.log(error);
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    })();
  }, [path]);

  const source = image ? { uri: image } : fallback;

  return (
    <ImageBackground className={classNameAsProps} source={source} {...imageProps} >
      {children}
    </ImageBackground>
  )
};

export default RemoteImageBackground;