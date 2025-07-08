import { FC, ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor: string;
}
export const FeatureCard: FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  bgColor,
}) => (
  <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div
      className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
