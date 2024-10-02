"use client";
import React, { useState } from 'react';

const TagInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(inputValue)) {
        setTags([...tags, inputValue]);
        setInputValue('');
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-wrap items-center p-2 border rounded">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="bg-gray-200 text-sm flex items-center p-1 mr-2 mb-2 rounded"
        >
          {tag}
          <button
            className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center"
            onClick={() => removeTag(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="اضف عنصر جديد"
        className="outline-none"
      />
    </div>
  );
};

export default TagInput;