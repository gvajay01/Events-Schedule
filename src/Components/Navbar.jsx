import React, { useState } from "react";
import "../App.css";
import "bootstrap";
import "react-bootstrap-icons";
// import 'bootstrap/dist/js/bootstrap.bundle';
// import 'bootstrap/js/dist/navbarDropdown';
// import data from '../firebase';
// importing firebase from Firestore
import firebase from "../Firestore";

function Navbar() {
  const formRef = React.useRef(null);
  const [event_name, setName] = useState("");
  const [date, SetDate] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState({});

  // This is the function which stores data when the save changes button in the modal is clicked.
  async function saveData() {
    if ((event_name != "") & (date != "")) {
      await firebase
        .storage()
        .ref(`/images/${event_name}/${file.name}`)
        .put(file)
        .catch((err) => {
          console.log(err);
        });
      const url = await firebase
        .storage()
        .ref(`/images/${event_name}/${file.name}`)
        .getDownloadURL()
        .catch((err) => {
          console.log(err);
        });

      // after saving the data allocating the data saved to respect variables
      await firebase
        .firestore()
        .collection("events")
        .doc()
        .set({
          event_name: event_name,
          data_and_time: date,
          imageUrl: url,
          is_liked: false,
          location: location,
        })
        .then(
          setName(""),
          SetDate(""),
          setFile(""),
          setLocation(""),
          alert("added event successfully")
        );
    } else {
      alert("please fill name and date. refil if its showing already");
    }
  }

  return (
    <div>
      {/* created a navbar on the top of the page*/}
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="flex-inline">
          <a class="navbar-brand" href="#">
            Events
          </a>
          <form class="form-inline my-2 ">
            <input
              class="form-control"
              type="search"
              placeholder="Search Events"
              aria-label="Search"
            />
          </form>
          <button class="btn btn-outline-success my-2 " type="submit">
            Search
          </button>
        </div>
        <div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav float-right ">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Organize
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Help
                </a>
              </li>
              {/* This is the code for dialog box which will be appearing when the create event button is clicked */}
              <li class="nav-item">
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Events Schedule
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <form ref={formRef}>
                        <div class="modal-body">
                          <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                          ></input>
                          <p> Enter Name</p>
                          <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            data-dismiss="modal"
                          ></input>
                          <p> Enter Date and Time</p>
                          <input
                            type="datetime-local"
                            onChange={(e) => SetDate(e.target.value)}
                          ></input>
                          <p>Location</p>
                          <input
                            type="text"
                            onChange={(e) => setLocation(e.target.value)}
                          ></input>
                        </div>
                      </form>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          class="btn btn-primary"
                          onClick={() => saveData()}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Create An Event
                </button>
              </li>

              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Sign In
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
