import React, { useState, useEffect, useRef } from "react";

const PriceRangeSlider = ({ 
  minPrice = 0, 
  maxPrice = 1000, 
  value = [0, 1000], 
  onChange,
  className = "" 
}) => {
  const [isDragging, setIsDragging] = useState(null); // 'min' or 'max' or null
  const sliderRef = useRef(null);

  const getClientX = (e) => {
    if (e.touches && e.touches[0]) {
      return e.touches[0].clientX;
    }
    return e.clientX;
  };

  const handleStart = (e, handle) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(handle);
  };

  const handleMove = (e) => {
    if (!isDragging || !sliderRef.current) return;

    e.preventDefault();
    e.stopPropagation();
    
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = getClientX(e);
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = Math.round((percentage / 100) * (maxPrice - minPrice) + minPrice);

    if (isDragging === 'min') {
      const newMin = Math.min(newValue, value[1] - 10);
      onChange([newMin, value[1]]);
    } else if (isDragging === 'max') {
      const newMax = Math.max(newValue, value[0] + 10);
      onChange([value[0], newMax]);
    }
  };

  const handleEnd = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(null);
  };

  // Add global event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMove = (e) => handleMove(e);
      const handleGlobalEnd = (e) => handleEnd(e);

      document.addEventListener('mousemove', handleGlobalMove);
      document.addEventListener('mouseup', handleGlobalEnd);
      document.addEventListener('touchmove', handleGlobalMove, { passive: false });
      document.addEventListener('touchend', handleGlobalEnd);
      document.addEventListener('touchcancel', handleGlobalEnd);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMove);
        document.removeEventListener('mouseup', handleGlobalEnd);
        document.removeEventListener('touchmove', handleGlobalMove);
        document.removeEventListener('touchend', handleGlobalEnd);
        document.removeEventListener('touchcancel', handleGlobalEnd);
      };
    }
  }, [isDragging, value, onChange, minPrice, maxPrice]);

  const handleInputChange = (index, newValue) => {
    const numValue = Number(newValue);
    if (index === 0) {
      const newMin = Math.min(numValue, value[1] - 10);
      onChange([newMin, value[1]]);
    } else {
      const newMax = Math.max(numValue, value[0] + 10);
      onChange([value[0], newMax]);
    }
  };

  const minPercentage = ((value[0] - minPrice) / (maxPrice - minPrice)) * 100;
  const maxPercentage = ((value[1] - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Price Input Fields */}
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min={minPrice}
          max={value[1] - 10}
          value={value[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          className="w-20 border border-gray-300 rounded px-2 py-1 text-sm text-[#212121] focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] bg-white"
        />
        <span className="text-[#878787] text-sm">-</span>
        <input
          type="number"
          min={value[0] + 10}
          max={maxPrice}
          value={value[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
          className="w-20 border border-gray-300 rounded px-2 py-1 text-sm text-[#212121] focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] bg-white"
        />
      </div>

      {/* Dual Range Slider */}
      <div className="relative h-6" ref={sliderRef}>
        {/* Track */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-gray-200 rounded-full">
          {/* Selected Range */}
          <div 
            className="absolute h-full bg-[#2874f0] rounded-full"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }}
          />
        </div>

        {/* Min Handle */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#2874f0] rounded-full cursor-pointer shadow-md hover:shadow-lg transition-shadow touch-none select-none"
          style={{ left: `${minPercentage}%`, marginLeft: '-12px' }}
          onMouseDown={(e) => handleStart(e, 'min')}
          onTouchStart={(e) => handleStart(e, 'min')}
        />

        {/* Max Handle */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#2874f0] rounded-full cursor-pointer shadow-md hover:shadow-lg transition-shadow touch-none select-none"
          style={{ left: `${maxPercentage}%`, marginLeft: '-12px' }}
          onMouseDown={(e) => handleStart(e, 'max')}
          onTouchStart={(e) => handleStart(e, 'max')}
        />
      </div>

      {/* Price Labels */}
      <div className="flex justify-between text-xs text-[#878787]">
        <span>₹{minPrice}</span>
        <span>₹{maxPrice}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider; 