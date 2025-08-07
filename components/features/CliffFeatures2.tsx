import React from "react";

const CliffFeatures2 = () => {
  const features = [
    {
      title: "UV 400 Protection",
      description:
        "Blocks 100% of harmful UVA and UVB rays for optimal eye safety.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-02-at-3.49.12-PM.jpeg",
    },
    {
      title: "Anti-Reflective Coating",
      description:
        "Reduces glare and eye strain for clearer vision in all conditions.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/12/premium_photo-1664477083130-9566b4d74b62-transformed.webp",
    },
    {
      title: "Scratch-Resistant",
      description: "Durable coating ensures long-lasting clarity and wear.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2024/12/5164eb83-660b-459e-83eb-cff8ffd0088e.jpg",
    },
    {
      title: "Lightweight Design",
      description:
        "Ultra-comfortable frames that you can wear all day without fatigue.",
      bgImage:
        "https://cliffeyewear.com/wp-content/uploads/2025/02/cliff-stock-lens-1.png",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with blur overlay */}
      <div className="absolute inset-0 bg-[url('/images/eyewear-bg.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-ramro text-white mb-4">
            RX
          </h2>
          <p className="text-xl font-semibold font-ramro text-gray-200 max-w-2xl mx-auto">
            New and expertly crafted eyewear frames of the season
          </p>
        </div>

        {/* Features Grid with Background Images */}
        <div className="grid grid-cols-1 h-[100vh] md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative flex flex-col bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-[1.02] overflow-hidden group"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${feature.bgImage})`,
                }}
              />

              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

              {/* Content */}
              <div className="relative mt-auto p-4 z-10">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CliffFeatures2;
