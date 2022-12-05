import React from "react";
import UseVideoPopular from '../components/Player/UseVideoPopular';

export default function Home() {
  const { data } = UseVideoPopular();
  console.log('data', data);
  return (<>
    <h1>Home</h1>
  </>)
};
;