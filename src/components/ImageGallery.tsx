'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { addImageSize, ImageItem } from '@/lib/utils/image';

interface ImageGalleryProps {
  images: ImageItem[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images
}) => {
  const [mapList, setMapList] = useState<ImageItem[]>([]);

  // 初始化圖片資料
  useEffect(() => {
    const initImages = async () => {
      const processedImages = await addImageSize(images);
      setMapList(processedImages);
    };
    if (images.length > 0) {
      initImages();
    }
  }, [images]);

  if (!mapList || mapList.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap w-full gap-2 justify-center">
      {mapList.map((item, idx) => (
        <div
          key={idx}
          style={{
            width: item.galleryWidth + 'px',
            flexGrow: item.ratio || 1,
          }}
        >
          <div className="w-full h-full relative border rounded-md overflow-hidden">
            <div style={{aspectRatio: item.ratioStr}}>
              <Image
                src={`${item.url}?q=80`}
                width={item.width}
                height={item.height}
                alt={`image-${idx}`}
                loading="lazy"
                className="absolute left-0 top-0 w-full h-full object-cover"
              />
              <div className="absolute left-0 top-0 bg-black rounded-br-md text-white py-1 px-2">
                比例：{ item.ratioStr }
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* 補齊 flex-grow 空間，僅桌機顯示 */}
      <div className="invisible hidden md:block" style={{ flexGrow: 3, minHeight: '200px' }}>
        &nbsp;
      </div>
    </div>
  );
};
