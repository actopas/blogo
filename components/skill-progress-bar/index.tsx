import React, { useEffect, useState } from 'react';

interface SkillProgressBarProps {
  percentage: number;
}

export const SkillProgressBar: React.FC<SkillProgressBarProps> = ({
  percentage,
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(percentage);
  }, [percentage]);

  return (
    <div className="w-1/2 bg-gray-200 rounded-full h-3 dark:bg-gray-700 ml-4">
      <div
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out dark:from-blue-400 dark:to-purple-500"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};
