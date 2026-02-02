export interface ImageItem {
  url: string;
  width?: number;
  height?: number;
  ratio?: string | number;
  ratioStr?: string;
  galleryWidth?: number;
}

interface ImageWithSize {
  width: number;
  height: number;
}

// 計算最大公約數 (GCD)
export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

// 最大公約數參數
export const simplifyFraction = (numerator: number, denominator: number) => {
  const divisor = gcd(numerator, denominator);
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor,
  };
};

// 圖片比例格式化
export const formatAspectRatio = (width: number, height: number): string => {
  const { numerator, denominator } = simplifyFraction(width, height);
  return `${numerator}/${denominator}`;
};

// 圖片載入
export const addImageProcess = (src: string): Promise<ImageWithSize> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = () => reject(new Error('error'));
  });
};


/**
 * 為圖片列表添加尺寸和佈局相關屬性
 *
 * 流程：
 * 1. 加載圖片尺寸 (addImageProcess)
 * 2. 計算圖片比例 (width / height)
 * 3. 計算相對寬度 (justifyScale * ratio)
 * 4. 計算排列樣式 (width: galleryWidth, flexGrow)
 *
 * @param imageList - 原始圖片資料陣列
 * @returns 增強後的圖片項陣列，包含尺寸和佈局資訊
 */
export const addImageSize = async (
  imageList: ImageItem[],
): Promise<ImageItem[]> => {
  return await Promise.all(
    imageList.map(async (item) => {
      try {
        // 加載圖片尺寸 (使用 w=20 參數獲取縮略圖以提高速度)
        const img: ImageWithSize | ImageItem = await addImageProcess(`${item.url}?w=20`);

        // 將縮圖尺寸放大 20 倍作為實際尺寸
        const width = img.width * 20;
        const height = img.height * 20;

        // 計算圖片比例 (寬 / 高)
        const ratio = img.width! / img.height!;
        const ratioStr = formatAspectRatio(img.width!, img.height!);

        // 根據寬高比設置初始畫廊寬度 (豎圖 150px，橫圖 200px)
        let galleryWidth = (ratio < 1) ? 150 : 200;

        // Justified Gallery 演算法
        // 計算基礎刻度值用於計算每張圖片應佔的相對寬度
        const justifyScale = 150;

        // 如果計算寬度超過初始寬度，則更新 galleryWidth
        // 加 100px 是為了保留邊距和邊框空間
        if (justifyScale * ratio > galleryWidth) {
          galleryWidth = (justifyScale * ratio + 100);
        }

        // 返回增強後的圖片項，包含所有必要的佈局資訊
        return {
          ...item,
          width,
          height,
          ratio,
          ratioStr,
          galleryWidth,
        };
      } catch (error) {
        console.error(`圖片加載失敗: ${item.url}`, error);
        // 加載失敗時返回原始資料
        return item;
      }
    })
  );
};
