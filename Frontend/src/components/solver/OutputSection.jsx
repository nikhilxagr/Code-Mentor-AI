import ApproachCard from "./ApproachCard";
import StepsCard from "./StepsCard";
import CodeCard from "./CodeCard";
import ComplexityCard from "./ComplexityCard";

const OutputSection = ({ result }) => {
  return (
    <div className="space-y-6">
      <ApproachCard text={result.approach} />
      <StepsCard steps={result.steps} />
      <CodeCard code={result.code} />
      <ComplexityCard complexity={result.complexity} />
    </div>
  );
};

export default OutputSection;
