import React from "react";
import { useHistory } from 'react-router-dom';

const GoHomeBtn = () => {

    const navigate = useHistory();

    const navigateHome = () => navigate.push('/home');

  return (
    <div>
      <button type='button' className="enter-site-button" onClick={navigateHome}>Enter site</button>
    </div>
  );
};

export default GoHomeBtn;
