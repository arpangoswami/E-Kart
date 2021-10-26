import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
const RedirectToShop = () => {
  const [count, setCount] = useState(1);
  const history = useHistory();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && history.push("/");
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container p-5 text-center">
      <Spin
        spinning={true}
        size="large"
        tip={`Redirecting you in ${count} seconds`}
      />
    </div>
  );
};

export default RedirectToShop;
