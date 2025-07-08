import { FC } from "react";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  colorClass?: string;
}

export const StepCard: FC<StepCardProps> = ({
  step,
  title,
  description,
  colorClass = "bg-blue-600",
}) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`${colorClass} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4`}
      >
        {step}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};
