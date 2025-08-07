import { CardSwipe } from "@/components/ui/card-swipe";
function BasicExample() {
  const images = [
    { src: "/blur.jpeg", alt: "Image 1" },
    { src: "/seven.jpg", alt: "Image 2" },
    { src: "/greenery.jpg", alt: "Image 3" },
    { src: "/blurr.jpg", alt: "Image 4" },
  ];

  return (
    <div className="w-full">
      <CardSwipe images={images} autoplayDelay={2000} slideShadows={false} />
    </div>
  );
}
export default BasicExample;
