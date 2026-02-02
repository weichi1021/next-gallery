import { mockImages } from "@/lib/mock-images";
import { ImageGallery } from "@/components/ImageGallery";



export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">圖片牆 Image Gallery</h1>
      <p className="mb-4">這是一個自適應各種圖片比例的畫廊切版範例。</p>
      {/* 圖片牆元件將放置於此 */}
      <ImageGallery images={mockImages} />
    </main>
  );
}
