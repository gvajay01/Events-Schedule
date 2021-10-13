import React, { useEffect, useState } from "react";
import { Heart, Upload } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import firebase from "../Firestore";

function Likes() {
  let [arr, setArr] = useState([]);

  let [init, setInit] = useState(true);

  //  It is used i getting the initial data from the firebase and also any changes made in the future
  useEffect(async () => {
    await firebase
      .firestore()
      .collection("events")
      .onSnapshot((snapshot) => {
        var newArr = [];
        snapshot.docs.forEach((doc) => {
          var map = doc.data();
          map["id"] = doc.id;
          console.log(map);
          newArr.push(map);
        });
        // console.log(snapshot.docs.map((doc)=> doc.data()).concat )
        setArr(newArr);
      });
  }, [init]);

  // changing the colour of the like button based on the user click
  async function changeColor(docId, isLiked) {
    await firebase
      .firestore()
      .collection("events")
      .doc(docId)
      .update({ is_liked: !isLiked })
      .then();
    console.log(docId);
    console.log(isLiked);
  }
  return (
    //  this section is used to create Likes page
    <div>
      <h1 class="Title">Likes</h1>
      {arr.map((item) => (
        <div class="d-flex flex-row Event-img">
          <img class="photo" src={item.imageUrl} />
          <div class="Event-remain">
            <p class="head para">{item.event_name}</p>
            <p class="para">{item.data_and_time}</p>
            <p class="para">{item.location}</p>
          </div>
          {/* upload icon  */}
          <div class="upload">
            <Upload />
          </div>
          {/*Heart FontAwesome Icon */}
          <div onClick={() => changeColor(item.id, item.is_liked)}>
            {item.is_liked ? (
              <FontAwesomeIcon style={{ color: "#ff0000" }} icon={faHeart} />
            ) : (
              <Heart />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Likes;
