import { useState, useEffect, useMemo } from "react";
import { CircleX } from "lucide-react";
import step1 from "@/assets/images/instruction_1.png";
import step2 from "@/assets/images/instruction_2.png";
import step3 from "@/assets/images/instruction_3.png";

const InstructionSlides = ({ onClose }) => {
  const images = useMemo(() => [step1, step2, step3], []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [images]);

  if (index === 2) {
    setTimeout(() => {
      onClose();
    }, 2000);
  }

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 bg-white flex justify-center items-center">
      <div className="">
        <div className="flex w-full justify-end">
          <CircleX className="cursor-pointer" onClick={() => onClose()} />
        </div>

        <img
          className="aspect-auto w-[600px] rounded-lg "
          src={images[index]}
          alt={`step_${index + 1}`}
        />
      </div>
    </div>
  );
};

export default InstructionSlides;
