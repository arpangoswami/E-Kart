import React, { useState } from "react";
import { Spin } from "antd";
const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="container-fluid">
      <div className="row">
        {loading ? (
          <div className="container text-center">
            <Spin spinning={loading} size="large" tip="Loading..." />
          </div>
        ) : (
          <div className="col">
            <h1>Admin Dashboard</h1>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminDashboard;
