import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Next 16'da qualities allowlist'i zorunlu ve varsayılanı [75].
       75 sitenin geri kalanı için korunur; 90 yalnızca /hizmetler
       galerisindeki premium lens görselleri için kullanılır. */
    qualities: [75, 90],
  },
};

export default nextConfig;
