import { Image, ImageSourcePropType } from 'react-native';
import React, { ComponentProps, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

type RemoteImageProps = {
  path?: string | null;
  fallback: ImageSourcePropType;
  classNameAsProps?: string;
  bucket: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({ path, fallback, classNameAsProps, bucket, ...imageProps }: RemoteImageProps) => {
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

  return <Image className={classNameAsProps} source={source} {...imageProps} />;
};

export default RemoteImage;