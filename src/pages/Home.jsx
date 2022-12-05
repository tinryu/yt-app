import React, { Suspense } from "react";
import UseVideoPopular from '../components/Video/UseVideoPopular';
const List = React.lazy(() => import('../components/Video/List'));

export default function Home() {
  const { data } = UseVideoPopular();
  return (<>
    <Suspense fallback={<div>Loading...</div>}>
      <List data={data} />
    </Suspense>
  </>)
};
;