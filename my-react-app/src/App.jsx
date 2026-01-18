import Header from "./components/Header/Header.jsx";
import IntroPicture from "./components/IntroPicture/IntroPart.jsx";
import ProductList from "./components/ProductList/ProductList.jsx";
import { useState, useEffect } from 'react'
import { LIST_KEY } from "./services/ProductStorage.jsx";

export default function App() {
  const initialList = [
    {
      product_description: "Heritage Cable Knit Turtleneck Sweater",
      preview_image: "/image/preview-image-1.webp",
      original_price: "$98.00",
      discount_price: "$62.00",
      detailed_description:
        "Inspired by classic heritage knitwear, this cable-knit turtleneck sweater is crafted from a premium mid-weight wool blend that provides warmth without excessive bulk. The intricate cable texture adds depth and character, while the high turtleneck collar offers natural insulation against cold weather. Designed for refined layering, this piece balances timeless style with modern comfort, making it a versatile essential for both casual and elevated outfits.",
      total_buyer: 240,
      rating: 4.7,
      product_images: [
        "/image/preview-image-1.1.avif",
        "/image/preview-image-1.2.avif",
        "/image/preview-image-1.3.avif",
        "/image/preview-image-1.4.avif",
        "/image/preview-image-1.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Premium Soft Touch Knit Hoodie",
      preview_image: "/image/preview-image-2.avif",
      original_price: "$85.00",
      discount_price: "$52.00",
      detailed_description:
        "This premium knit hoodie is crafted with a focus on everyday comfort and understated style. The soft-touch fleece fabric feels smooth against the skin while maintaining a clean exterior appearance. Thoughtfully designed for relaxed layering, it delivers warmth without heaviness, making it ideal for both indoor comfort and casual outdoor wear throughout the cooler seasons.",
      total_buyer: 180,
      rating: 4.5,
      product_images: [
        "/image/preview-image-2.1.avif",
        "/image/preview-image-2.2.avif",
        "/image/preview-image-2.3.avif",
        "/image/preview-image-2.4.avif",
        "/image/preview-image-2.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Modern Fit Lightweight Bomber Jacket",
      preview_image: "/image/preview-image-3.avif",
      original_price: "$140.00",
      discount_price: "$89.00",
      detailed_description:
        "Designed as a modern reinterpretation of the classic bomber, this lightweight jacket features smooth technical fabric with a refined matte finish. Its tailored fit enhances the silhouette while remaining comfortable for daily movement. Ideal for transitional weather, it layers effortlessly over knits and tees, offering a polished yet versatile outerwear option.",
      total_buyer: 350,
      rating: 4.8,
      product_images: [
        "/image/preview-image-3.1.avif",
        "/image/preview-image-3.2.avif",
        "/image/preview-image-3.3.avif",
        "/image/preview-image-3.4.avif",
        "/image/preview-image-3.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Everyday Performance Stretch Tech Pants",
      preview_image: "/image/preview-image-4.avif",
      original_price: "$78.00",
      discount_price: "$49.00",
      detailed_description:
        "Engineered for comfort and flexibility, these performance tech pants are made from a lightweight stretch fabric that adapts naturally to movement. The streamlined design delivers a clean, modern look while maintaining breathability and durability. Suitable for long days on the go, they transition seamlessly between casual and active environments.",
      total_buyer: 420,
      rating: 4.6,
      product_images: [
        "/image/preview-image-4.1.avif",
        "/image/preview-image-4.2.avif",
        "/image/preview-image-4.3.avif",
        "/image/preview-image-4.4.avif",
        "/image/preview-image-4.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Essential Pima Cotton Long Sleeve Tee",
      preview_image: "/image/preview-image-5.avif",
      original_price: "$45.00",
      discount_price: "$28.00",
      detailed_description:
        "Made from premium Pima cotton, this long sleeve tee delivers exceptional softness and breathability. The refined fabric surface enhances comfort while maintaining structure, making it suitable for both standalone wear and layered styling. A true wardrobe staple designed for everyday versatility.",
      total_buyer: 110,
      rating: 4.3,
      product_images: [
        "/image/preview-image-5.1.avif",
        "/image/preview-image-5.2.avif",
        "/image/preview-image-5.3.avif",
        "/image/preview-image-5.4.avif",
        "/image/preview-image-5.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Relaxed Fit Heavyweight Hoodie",
      preview_image: "/image/preview-image-6.avif",
      original_price: "$72.00",
      discount_price: "$44.00",
      detailed_description:
        "This heavyweight hoodie is designed to deliver warmth and durability with a relaxed, comfortable fit. The brushed interior enhances insulation while remaining breathable, making it ideal for cooler days. Its timeless construction ensures lasting wear and easy styling across seasons.",
      total_buyer: 270,
      rating: 4.6,
      product_images: [
        "/image/preview-image-6.1.avif",
        "/image/preview-image-6.2.avif",
        "/image/preview-image-6.3.avif",
        "/image/preview-image-6.4.avif",
        "/image/preview-image-6.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Structured Knit Quarter-Zip Pullover",
      preview_image: "image/preview-image-7.avif",
      original_price: "$88.00",
      discount_price: "$55.00",
      detailed_description:
        "Crafted from a dense knit fabric, this quarter-zip pullover offers a refined balance between warmth and structure. The metal zipper adds a subtle industrial detail, while the clean silhouette makes it suitable for both casual and smart-casual layering.",
      total_buyer: 190,
      rating: 4.4,
      product_images: [
        "/image/preview-image-7.1.avif",
        "/image/preview-image-7.2.avif",
        "/image/preview-image-7.3.avif",
        "/image/preview-image-7.4.avif",
        "/image/preview-image-7.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Soft-Flex Cotton Casual Button-Down Shirt",
      preview_image: "image/preview-image-8.avif",
      original_price: "$69.00",
      discount_price: "$42.00",
      detailed_description:
        "This casual button-down shirt is crafted from soft-flex cotton that moves naturally with the body. The breathable fabric enhances all-day comfort, while the clean construction allows it to be styled effortlessly for both relaxed and polished looks.",
      total_buyer: 130,
      rating: 4.2,
      product_images: [
        "/image/preview-image-8.1.avif",
        "/image/preview-image-8.2.avif",
        "/image/preview-image-8.3.avif",
        "/image/preview-image-8.4.avif",
        "/image/preview-image-8.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Performance Waffle-Knit Henley",
      preview_image: "image/preview-image-9.avif",
      original_price: "$58.00",
      discount_price: "$36.00",
      detailed_description:
        "Featuring a textured waffle-knit construction, this henley provides natural warmth and breathability. The reinforced placket enhances durability, while the classic neckline delivers timeless appeal suitable for layering or standalone wear.",
      total_buyer: 165,
      rating: 4.5,
      product_images: [
        "/image/preview-image-9.1.avif",
        "/image/preview-image-9.2.avif",
        "/image/preview-image-9.3.avif",
        "/image/preview-image-9.4.avif",
        "/image/preview-image-9.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Urban Puffer Vest with Lightweight Fill",
      preview_image: "image/preview-image-10.avif",
      original_price: "$110.00",
      discount_price: "$72.00",
      detailed_description:
        "Designed to provide core warmth without bulk, this urban puffer vest features lightweight insulation and a streamlined profile. Ideal for layering during transitional weather, it balances functionality with a clean, modern aesthetic.",
      total_buyer: 205,
      rating: 4.6,
      product_images: [
        "/image/preview-image-10.1.avif",
        "/image/preview-image-10.2.avif",
        "/image/preview-image-10.3.avif",
        "/image/preview-image-10.4.avif",
        "/image/preview-image-10.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Everyday Cotton Crew Neck Sweatshirt",
      preview_image: "/image/preview-image-11.avif",
      original_price: "$60.00",
      discount_price: "$35.00",
      detailed_description:
        "This classic crew neck sweatshirt is crafted from soft cotton fleece that delivers warmth and comfort without sacrificing structure. Designed for everyday wear, it pairs effortlessly with a wide range of casual outfits.",
      total_buyer: 300,
      rating: 4.7,
      product_images: [
        "/image/preview-image-11.1.avif",
        "/image/preview-image-11.2.avif",
        "/image/preview-image-11.3.avif",
        "/image/preview-image-11.4.avif",
        "/image/preview-image-11.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Ribbed Zip-Up Mock Neck Sweater",
      preview_image: "/image/preview-image-12.avif",
      original_price: "$92.00",
      discount_price: "$58.00",
      detailed_description:
        "This ribbed mock-neck sweater combines refined texture with functional warmth. The zip-up design allows adjustable comfort, while the structured knit ensures a polished silhouette suitable for layered styling.",
      total_buyer: 125,
      rating: 4.4,
      product_images: [
        "/image/preview-image-12.1.avif",
        "/image/preview-image-12.2.avif",
        "/image/preview-image-12.3.avif",
        "/image/preview-image-12.4.avif",
        "/image/preview-image-12.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Classic Fit Plaid Flannel Shirt",
      preview_image: "image/preview-image-13.avif",
      original_price: "$54.00",
      discount_price: "$33.00",
      detailed_description:
        "Crafted from softly brushed flannel, this plaid shirt delivers warmth and comfort with a timeless aesthetic. Its classic fit allows for easy layering, making it a reliable choice for cooler seasons.",
      total_buyer: 260,
      rating: 4.6,
      product_images: [
        "/image/preview-image-13.1.avif",
        "/image/preview-image-13.2.avif",
        "/image/preview-image-13.3.avif",
        "/image/preview-image-13.4.avif",
        "/image/preview-image-13.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "UltraSoft Fleece Joggers",
      preview_image: "image/preview-image-14.avif",
      original_price: "$68.00",
      discount_price: "$41.00",
      detailed_description:
        "These ultrasoft fleece joggers are designed for relaxed comfort with a modern tapered fit. The plush interior enhances warmth, while the clean exterior finish ensures they remain suitable for casual outings as well as lounging.",
      total_buyer: 195,
      rating: 4.5,
      product_images: [
        "/image/preview-image-14.1.avif",
        "/image/preview-image-14.2.avif",
        "/image/preview-image-14.3.avif",
        "/image/preview-image-14.4.avif",
        "/image/preview-image-14.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Lightweight Packable Windbreaker",
      preview_image: "/image/preview-image-15.avif",
      original_price: "$85.00",
      discount_price: "$52.00",
      detailed_description:
        "This lightweight windbreaker is crafted from water-resistant fabric and designed for easy packing. Its minimalist construction provides reliable protection against the elements while maintaining a sleek, modern appearance.",
      total_buyer: 140,
      rating: 4.3,
      product_images: [
        "/image/preview-image-15.1.avif",
        "/image/preview-image-15.2.avif",
        "/image/preview-image-15.3.avif",
        "/image/preview-image-15.4.avif",
        "/image/preview-image-15.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Everyday Relaxed Linen Blend Shirt",
      preview_image: "/image/preview-image-16.avif",
      original_price: "$72.00",
      discount_price: "$45.00",
      detailed_description:
        "Designed for warm-weather comfort, this linen-blend shirt offers breathability and a relaxed drape. The lightweight fabric promotes airflow, making it an ideal choice for casual summer layering.",
      total_buyer: 150,
      rating: 4.4,
      product_images: [
        "/image/preview-image-16.1.avif",
        "/image/preview-image-16.2.avif",
        "/image/preview-image-16.3.avif",
        "/image/preview-image-16.4.avif",
        "/image/preview-image-16.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "ThermoSoft Fleece Quarter Zip",
      preview_image: "/image/preview-image-17.avif",
      original_price: "$90.00",
      discount_price: "$56.00",
      detailed_description:
        "This thermal fleece quarter zip is designed as a versatile mid-layer for cooler conditions. The soft fleece interior enhances warmth, while the clean design ensures easy layering under jackets or over base layers.",
      total_buyer: 210,
      rating: 4.6,
      product_images: [
        "/image/preview-image-17.1.avif",
        "/image/preview-image-17.2.avif",
        "/image/preview-image-17.3.avif",
        "/image/preview-image-17.4.avif",
        "/image/preview-image-17.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Minimalist Heavyweight Long Sleeve Tee",
      preview_image: "/image/preview-image-18.avif",
      original_price: "$48.00",
      discount_price: "$29.00",
      detailed_description:
        "Built with heavyweight cotton, this long sleeve tee offers durability and structure while maintaining a minimalist aesthetic. Its substantial fabric provides warmth and a premium feel suitable for cooler days.",
      total_buyer: 175,
      rating: 4.4,
      product_images: [
        "/image/preview-image-18.1.avif",
        "/image/preview-image-18.2.avif",
        "/image/preview-image-18.3.avif",
        "/image/preview-image-18.4.avif",
        "/image/preview-image-18.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "Timeless Wool Blend Overcoat",
      preview_image: "/image/preview-image-19.avif",
      original_price: "$220.00",
      discount_price: "$145.00",
      detailed_description:
        "This wool blend overcoat is tailored for a sharp, timeless silhouette. The structured construction provides warmth and durability, while the refined finish ensures long-term versatility across formal and casual settings.",
      total_buyer: 98,
      rating: 4.8,
      product_images: [
        "/image/preview-image-19.1.avif",
        "/image/preview-image-19.2.avif",
        "/image/preview-image-19.3.avif",
        "/image/preview-image-19.4.avif",
        "/image/preview-image-19.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    },

    {
      product_description: "TravelFlex Water-Resistant Cargo Pants",
      preview_image: "/image/preview-image-20.avif",
      original_price: "$88.00",
      discount_price: "$54.00",
      detailed_description:
        "Designed for travel and daily wear, these cargo pants feature water-resistant fabric and practical pocketing. The flexible construction ensures comfort during movement, while the modern fit keeps the overall look clean and functional.",
      total_buyer: 160,
      rating: 4.5,
      product_images: [
        "/image/preview-image-20.1.avif",
        "/image/preview-image-20.2.avif",
        "/image/preview-image-20.3.avif",
        "/image/preview-image-20.4.avif",
        "/image/preview-image-20.5.avif"
      ],
      uniqueId: crypto.randomUUID()
    }
  ];

  // state cho whole product list
  const [productList, setProductList] = useState(() => {
    const data = localStorage.getItem(LIST_KEY);
    return data ? JSON.parse(data) : initialList;
  });

  //productList updated -> localStorage automatically trigger UI update
  useEffect(() => {
    localStorage.setItem(LIST_KEY, JSON.stringify(productList))
  }, [productList]);

  return (
    <>
      <Header />
      <IntroPicture />
      <ProductList
        productList={productList}
        setProductList={setProductList}
      />
    </>
  )
}