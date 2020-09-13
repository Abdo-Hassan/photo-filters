import React, { useState, useRef } from 'react';
import Slider from './components/Slider';
import SidebarItem from './components/SidebarItem';
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
      setUploadedImage('');
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
            : 'url(https://pixabay.com/get/57e8d7414c51aa14f6da8c7dda79367e1d3adde451546c48702672dd924ec258bb_1280.jpg) top center no-repeat',
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
        <div className='settings'>
          <button className='reset' onClick={handleReset}>
            Reset
          </button>
          <input
            id='fileid'
            type='file'
            hidden
            ref={uploadImage}
            onChange={(e) => handleUploadImage(e.target.files[0] || null)}
          />
          <input
            id='buttonid'
            type='button'
            value='Upload Image'
            className='upload-image'
            onClick={() => uploadImage.current.click()}
          />
        </div>
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
