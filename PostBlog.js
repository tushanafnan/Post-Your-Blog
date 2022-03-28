import React, { useState} from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import Footer from "../Footer/Footer";
import TextField from '@mui/material/TextField';

import "./PostBlog.css";

const PostBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

var database = firebase.database();
var storage = firebase.storage();


  // --------- Image Part Start ------------

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  };

  console.log(url);

  

  // --------- Image Part End ----------

  const handleOnClick = () => {
    const setTodo = database.ref("Blog");
    const BlogData = {
      id: uuidv4(),
      title: title,
      content: content,
      imgUrl: imgUrl,
      date: date,
      keyword: keyword,
    };
    console.log(BlogData);
    setTodo.push(BlogData);
  };

  const handleChangeUrl =  (e) => { 
    setImgUrl(e.target.value)
  }
  // const handleChangeUrl = (e) => {
  //   let track = imgUrl;
  //   track[e.target.name]=e.target.value;
  //   setImgUrl(track);
  //   e.preventDefault ();
  // };

  /* Note: if user fill the contact form his/her details will be stored in firebase data base. Collection name is Blog. */
  return (
    <div className="postBlog-main-container">
      <Container maxWidth="lg" style={{ height: "100vh" }}>
        <Box
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Box
              className="signUp-form"
              style={{
                maxWidth: "320px",
                marginTop: "40px",
                textAlign: "right",
              }}
            >
              <input
                type="text"
                required
                id="title"
                name="title"
                placeholder="Your Blog Title"
                className="common-input-field name-field"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                required
                id="content"
                name="content"
                placeholder="Your Blog Content"
                className="common-input-field email-field "
                onChange={(e) => setContent(e.target.value)}
              />
              <input
                type="text"
                id="date"
                name="date"
                placeholder="DD/MM/YY"
                className="common-input-field phone-field "
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="text"
                id="keyword"
                name="keyword"
                placeholder="Your Blog Keywords"
                className="common-input-field phone-field "
                onChange={(e) => setKeyword(e.target.value)}
              />
              {/* <input
                type="file"
                id="img"
                name="Image"
                placeholder="Your Blog Image"
                className="common-input-field phone-field "
                onChange={(e) => setImg(e.target.value)}
              /> */}

            <progress value={progress} max="100" />
                  <br />
                  <br />
                  <input type="file" id="image" onChange={handleChange} />
                  <button onClick={handleUpload}>Upload</button>
                  <br />
                  <br />


<TextField
        label="Name"
        value={url}
        onChange={ handleChangeUrl}
        />

              <Button
                type="submit"
                variant="contained"
                className="postBlog-button"
                onClick={handleOnClick}
              >
                POST
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default PostBlog;
