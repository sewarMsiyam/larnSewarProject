import React from 'react';

interface GradientHeadingProps {
  text: string;
}

const TitleSection: React.FC<GradientHeadingProps> = ({ text }) => {
  return (
    <h2 className="text-center font-bold text-2xl text-transparent mb-5">
      <span className="bg-clip-text bg-color-gradient">{text}</span>
    </h2>
  );
};

export default TitleSection;
