import React, { useState } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';

export default function Calendar() {
  const [events, setEvents] = useState([]);

 
  return (
    <Scheduler
    view="month"
    />
  );
}
