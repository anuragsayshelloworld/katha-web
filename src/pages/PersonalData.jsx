import { useEffect, useRef, useState } from 'react';
import defaultImage from '../images/defaultImage.jpg';

function PersonalData({ userData }) {
  const inputRef = useRef();
  const [image, setImage] = useState(defaultImage);
  const [name, setName] = useState('');

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String);
        localStorage.setItem(userData.email, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to truncate and capitalize first letter, then set name
  function truncateAndCapitalize(input, setName, maxLength = 20) {
    if (!input) {
      setName('');
      return;
    }

    let truncated = input.slice(0, maxLength);

    // Avoid cutting mid-word by cutting at last space before maxLength
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    if (lastSpaceIndex > 0) {
      truncated = truncated.slice(0, lastSpaceIndex);
    }

    truncated = truncated.trim();
    if (truncated.length > 0) {
      truncated = truncated.charAt(0).toUpperCase() + truncated.slice(1);
    }

    setName(truncated);
  }

  // Load image from localStorage on userData.email change
  useEffect(() => {
    const savedImage = localStorage.getItem(userData.email);
    if (savedImage) {
      setImage(savedImage);
    } else {
      setImage(defaultImage);
    }
  }, [userData.email]);

  // Update name when userData.name changes
  useEffect(() => {
    truncateAndCapitalize(userData.name, setName, 20);
  }, [userData.name]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src={image}
          alt="Your Profile picture"
          onClick={handleClick}
          title="Click to upload new picture"
          className="shadow-sm"
          style={{ height: '50px', width: '50px', borderRadius: '50%', cursor: 'pointer' }}
        />
        <h3 style={{ fontFamily: "'Dancing Script', cursive", marginTop:'20px' }}>{name}</h3>
      </div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </>
  );
}

export default PersonalData;
