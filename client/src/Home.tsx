import React, { useEffect, useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
    console.log("It will run this also");
  }, []);
  console.log("Run");

  // run, useEffect, run
  return (
    <>
      {/* {console.log("inside return")} */}
      <h1>Home</h1>
    </>
  );
};

export default Home;
