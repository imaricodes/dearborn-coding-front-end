import { useMicPermission} from "@/hooks/useMicPermission";

const HomeCard = ({ children }) => {



useMicPermission();
  return (
    <div className=" flex justify-center h-screen w-full relative md:grid md:grid-cols-2 pt-20 md:pt-0 ">
      <div className="flex justify-end mb-4 lg:mb-0">{children}</div>

      <div className="justify-center md:flex md:pr-[50px]">
        <img src="/images/tish-temporary.png" alt="Tishliddlebudu" />
      </div>
    </div>
  );
};

export default HomeCard;
