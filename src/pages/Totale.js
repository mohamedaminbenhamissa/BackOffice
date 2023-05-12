import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Totale = ({ formations }) => {
  const data = {
    labels: ['Nombre d\'apprenants'],
    datasets: [
      {
        data: [formations],
        backgroundColor: [
          '#FF6384',
        ],
        hoverBackgroundColor: [
          '#FF6384',
        ],
      },
    ],
  };

  return <Doughnut data={formations} />;
};

export default Totale;
