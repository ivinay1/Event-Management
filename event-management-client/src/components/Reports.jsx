import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import './Reports.css';

const Reports = () => {
  const [userActivity, setUserActivity] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [eventParticipation, setEventParticipation] = useState([]);

  useEffect(() => {
    fetchUserActivity();
    fetchSalesData();
    fetchEventParticipation();
  }, []);

  const fetchUserActivity = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports/user-activity');
      setUserActivity(response.data);
    } catch (err) {
      console.error('Error fetching user activity:', err);
    }
  };

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports/sales');
      setSalesData(response.data);
    } catch (err) {
      console.error('Error fetching sales data:', err);
    }
  };

  const fetchEventParticipation = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports/event-participation');
      setEventParticipation(response.data);
    } catch (err) {
      console.error('Error fetching event participation:', err);
    }
  };

  const exportReport = async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reports/export/${type}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_report.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Error exporting report:', err);
    }
  };

  return (
    <div className="reports">
      <h2>Reports and Analytics</h2>

      <div className="report-section">
        <h3>User Activity</h3>
        <button onClick={() => exportReport('user-activity')}>Export to CSV</button>
        {/* Example chart for user activity */}
        <Line
          data={{
            labels: userActivity.map((user) => user.createdAt),
            datasets: [
              {
                label: 'User Registrations',
                data: userActivity.map((user) => user.createdAt),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
              },
            ],
          }}
        />
      </div>

      <div className="report-section">
        <h3>Sales Report</h3>
        <button onClick={() => exportReport('sales')}>Export to CSV</button>
        {/* Example chart for sales data */}
        <Bar
          data={{
            labels: salesData.map((order) => new Date(order.createdAt).toLocaleDateString()),
            datasets: [
              {
                label: 'Sales Amount',
                data: salesData.map((order) => order.totalAmount),
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
              },
            ],
          }}
        />
      </div>

      <div className="report-section">
        <h3>Event Participation</h3>
        <button onClick={() => exportReport('event-participation')}>Export to CSV</button>
        {/* Example display for event participation */}
        <ul>
          {eventParticipation.map((event) => (
            <li key={event._id}>
              {event.title} - {event.attendees.length} attendees
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
