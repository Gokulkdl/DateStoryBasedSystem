import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./FetchStories.css";

const FetchStories = ({ setStories, setFilteredStories }) => {
  const [month, setMonth] = useState(""); // State for selected month
  const [day, setDay] = useState(""); // State for selected day

  // Get current month and day
  useEffect(() => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth() + 1); // Months are 0-indexed
    setDay(currentDate.getDate());
  }, []);

  // Function to fetch stories for the selected month and day
  const fetchStoriesForDate = useCallback(async () => {
    if (!month || !day) return; // No action if inputs are not valid

    const apiUrl = `http://numbersapi.com/${month}/${day}/date`;

    // Initialize an empty array for stories
    setStories([]);
    setFilteredStories([]);

    try {
      // Create an array of promises to fetch stories concurrently
      const storyPromises = Array.from({ length: 8 }, () => axios.get(apiUrl)); // Reduced number of requests
      const responses = await Promise.all(storyPromises); // Wait for all requests to complete

      // Extract data from responses and update state
      const stories = responses.map((response) => response.data);
      setStories(stories); // Update stories after fetching all
      setFilteredStories(stories); // Keep filtered stories in sync
    } catch (error) {
      console.error("Error fetching stories:", error.message);
    }
  }, [month, day, setStories, setFilteredStories]);

  // Fetch stories when month or day changes
  useEffect(() => {
    fetchStoriesForDate();
  }, [month, day, fetchStoriesForDate]);

  // Format the heading date
  const formatHeadingDate = () => {
    if (!month || !day) return "Select a date";
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[month - 1]} ${day}`;
  };

  return (
    <div>
      <div className="date-input">
        {/* Custom Date Picker */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="month-picker"
        >
          <option value="">Select Month</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="day-picker"
        >
          <option value="">Select Day</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Heading */}
      <h2 className="stories-heading">STORIES OF: {formatHeadingDate()}</h2>
    </div>
  );
};

export default FetchStories;
