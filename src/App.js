import "./styles.css";
import useFetch from "./useFetch";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [eventType, setEventType] = useState("Both");
  const [searchText, setSearchText] = useState("");

  const { data, loading, error } = useFetch(
    "https://meetup-app-backend-nu.vercel.app/events"
  );

  console.log(data);
  // console.log(loading);
  // console.log(error);

  // const filteredEvents =
  //   eventType === "Both"
  //     ? data
  //     : eventType === "Online"
  //     ? data.filter((event) => event.isOnline === true)
  //     : data.filter((event) => event.isOnline === false);

  const filteredEvents = data
    ?.filter(
      (event) =>
        eventType === "Both" ||
        (eventType === "Online" && event.isOnline) ||
        (eventType === "Offline" && !event.isOnline)
    )
    .filter(
      (event) =>
        event.title.toLowerCase().includes(searchText.toLowerCase()) ||
        event.eventTags.includes(searchText.toLowerCase())
    );

  return (
    <main className="bg-body-tertiary">
      <div className="container">
        <nav className="navbar ">
          <div>
            <Link className="navbar-brand" to="/">
              Meetup
            </Link>
          </div>
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by title and tags"
            id="searchBox"
            className="form-control"
          />
        </nav>
        <hr />
      </div>

      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Meetup Events</h1>{" "}
          <select
            className="form-select"
            id="eventFilter"
            onChange={(event) => setEventType(event.target.value)}
          >
            <option value="">Select Event Type</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="row  mt-4">
          {filteredEvents?.map((event) => (
            <div key={event._id} className="col-sm-4 mb-4">
              <Link
                style={{ textDecoration: "none" }}
                to={`/events/${event._id}`}
              >
                <div className="card">
                  <img
                    src={event.eventPoster}
                    alt={event.title}
                    className="card-img-top img-fluid"
                  />
                  <span
                    className={`badge position-absolute top-0 start-0 bg-white text-dark m-2`}
                  >
                    {event.isOnline ? "Online Event" : "Offline Event"}
                  </span>
                  <div className="card-body">
                    <p>
                      <small>{event.timingStart} </small>{" "}
                    </p>
                    <p className="card-title">
                      <strong>{event.title}</strong>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
