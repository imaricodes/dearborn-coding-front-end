import { CardContainer } from "@/components/ui/custom/CardContainer";
import ExplainAi from "./ExplainAi";
const AnswerKey = () => {
  return (
    <CardContainer className="pt-4">
      <div className="flex flex-col px-4 pt-4 mb-10">
        <p className="text-center font-semibold mb-4 text-2xl">Key</p>
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-center">
            <span className="bg-green-600 rounded-full px-2 py-1 text-xs font-semibold text-slate-100 tracking-wide">
              Perfect
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="bg-orange-400 rounded-full px-2 py-1 text-xs font-semibold text-slate-100 tracking-wide">
              Wrong Place
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="bg-red-600 rounded-full px-2 py-1 text-xs font-semibold text-slate-100 tracking-wide">
              Wrong Word
            </span>
          </div>
        </div>
      </div>
        <ExplainAi />
    </CardContainer>
  );
};

export default AnswerKey;
