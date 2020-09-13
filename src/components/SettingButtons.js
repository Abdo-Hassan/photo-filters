import React from 'react';

const SettingButtons = ({ handleReset, handleUploadImage, uploadImage }) => {
  return (
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
      <button className='download-image'>Download</button>
    </div>
  );
};

export default SettingButtons;
