import { MagicText } from "@/components/ui/magic-text";

const Demo = () => {
  return (
    <div className="h-[100vh] w-8/12 mx-auto">
      <div className="relative flex items-center  justify-center h-full my-auto ">
        <MagicText
          text={
            "Welcome! We're dedicated to helping you see the world with unmatched clarity. Our eyewear is designed with precision optics and comfort in mind—ensuring your vision is not only sharper but also more relaxed. Whether you're reading, driving, or exploring outdoors, our glasses enhance every detail so you never miss a moment. Thank you for choosing us to be part of your clear vision journey."
          }
        />
      </div>
    </div>
  );
};

export default Demo;
