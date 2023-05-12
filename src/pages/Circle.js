import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Circle({ value }) {
  const diameter = '100px'; // diamètre du cercle
  const circleStyle = {
    width: diameter,
    height: diameter,
    borderRadius: '50%',
    backgroundColor: '#1BD4CA', // couleur du cercle
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'white' // couleur du texte
  };
  const [formations, setForamtions] = useState([]);

  useEffect(() => {
    getAllFormationFromBack();

  }, []);
  const getAllFormationFromBack = () => {
    axios.get('http://localhost:3003/api/formation/formations').then((res) => {
        setForamtions(res.data.data[0]);
 

    });
  };

  return (
  
    <div style={circleStyle}>
       
      {formations.non_admin_users_count}
    </div>
  );
}

export default Circle;
