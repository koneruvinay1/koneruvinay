import React, { useState } from "react";

import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (dates) => {
    setSelectedDate(dates);
  };

  const handleSubmit = () => {
    setSelectedDate(selectedDate);
  };

  const handleReset = () => {
    setSelectedDate(null);
  };

  return (
    <main className="container-fluid dashboard">
      <div className="row">
        <div className="col-md-12">
          <h3 className="dashboard-title">DASHBOARD</h3>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
