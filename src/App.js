import React, { useState, useRef } from 'react';
import Slider from './components/Slider';
import SidebarItem from './components/SidebarItem';
import SettingButtons from './components/SettingButtons';
import Image from './assets/images/image.jpg';
import './App.css';

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: '%',
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: '%',
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: '%',
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: 'deg',
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: 'px',
  },
];

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];
  const uploadImage = useRef();

  const handleChange = ({ target }) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: target.value };
      });
    });
  };

  const handleReset = () => {
    setOptions(DEFAULT_OPTIONS);
  };

  const getImageStyle = () => {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return filters.join(' ');
  };

  const handleUploadImage = (file) => {
    if (!file) {
      setUploadedImage(uploadedImage);
      return;
    }

    convertToImage(file).then((dataUri) => {
      setUploadedImage(dataUri);
    });
  };

  const convertToImage = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  return (
    <div className='container'>
      <div
        className='main-image'
        style={{
          background: uploadedImage
            ? `url(${uploadedImage}) top center no-repeat`
            : `url(${Image}) top center no-repeat`,
          filter: getImageStyle(),
        }}
      ></div>

      <div className='sidebar'>
        {options.map((option, index) => (
          <SidebarItem
            key={index}
            name={option.name}
            active={index === selectedOptionIndex}
            handleClick={() => setSelectedOptionIndex(index)}
          />
        ))}
        <SettingButtons
          handleReset={handleReset}
          handleUploadImage={handleUploadImage}
          uploadImage={uploadImage}
        />
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleChange}
      />
    </div>
  );
}

export default App;
