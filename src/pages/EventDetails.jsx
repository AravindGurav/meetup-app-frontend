import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function EventDetails() {
  const [searchText, setSearchText] = useState("");
  const { eventId } = useParams();
  // const id = parseInt(eventId);
  const { data, loading, error } = useFetch(
    `https://meetup-app-backend-nu.vercel.app/events/id/${eventId}`
  );

  console.log(data);
  if (loading) return <p>Loading... </p>;
  if (error) return <p>Error </p>;

  return (
    <main className="bg-body-tertiary mb-4">
      <div className="container">
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

        <div className="row">
          <div className="col-md-8 container">
            <h2>{data?.title}</h2>
            <p>Hosted By: </p>
            <p>{data?.hostedBy} </p>
            <img
              src={data?.eventPoster}
              alt={data?.title}
              className="img-fluid mb-3"
            />
            <h5>Details:</h5>
            <p>{data?.eventDetails}</p>

            <h5>Additional Information:</h5>
            <p>
              <strong>Dress Code:</strong> {data?.dressCode}
            </p>
            <p>
              <strong>Age Restrictions:</strong> {data?.ageRestrictions}
            </p>
            <h4>Events Tags: </h4>
            {data?.eventTags && data.eventTags.length > 0 ? (
              data.eventTags.map((tag, index) => (
                <button key={index} className="btn btn-primary btn-sm mx-1">
                  {tag}
                </button>
              ))
            ) : (
              <p>No tags available for this event</p>
            )}
          </div>

          <div className="col-md-4 container">
            <div className="card p-3 mt-4 mb-4">
              <p>
                {data.timingStart} to {data.timingEnd}
              </p>
              <p> {data.location}</p>
              <p> ₹{data.price}</p>
            </div>

            <div className="my-4">
              {data?.speakers && data.speakers.length > 0 ? (
                <div>
                  <h4>Speakers: ({data.speakers.length})</h4>
                  <div className="d-flex">
                    {data.speakers.map((speaker, index) => (
                      <div
                        key={index}
                        className=" card text-center mt-3 me-3 p-2"
                      >
                        <img
                          src={speaker.photo}
                          alt={speaker.name}
                          className="rounded-circle mb-2 img-fluid"
                          id="speakerImage"
                        />
                        <div className="card-body">
                          <p className="">
                            <strong>{speaker.name}</strong>
                          </p>
                          <small>{speaker.profession}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p>No speakers available for this event</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
