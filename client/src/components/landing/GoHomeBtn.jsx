import React from "react";
import { useHistory } from 'react-router-dom';

const GoHomeBtn = () => {

    const navigate = useHistory();

    const navigateHome = () => navigate.push('/home');

  return (
    <div>
      <button onClick={navigateHome}>
        Let's Go
      </button>
    </div>
  );
};

export default GoHomeBtn;
