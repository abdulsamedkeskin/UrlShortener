import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

const HomePage = () => {
  const [link, setlink] = useState("");
  const [newlink, setnewlink] = useState("");
  const [yourlink, setyourlink] = useState("");
  const [loading, setloading] = useState(false);

  const add = (e) => {
    e.preventDefault();
    setloading(true);
    axios
      .post("https://ShortUrl.abdulsamedkeski.repl.co/add", {
        link: link,
      })
      .then((res) => {
        setnewlink(`${res.data.url}`);
        setyourlink("Linkiniz: ");
        setloading(false);
      });
  };

  return (
    <div className="bigcontainer">
      <div className="container">
        <nav>
          <a href="/">
            <button className="title">Link Kısaltıcı</button>
          </a>
        </nav>
        <div className="form">
          {loading ? (
            <div className="link">
              <Loader
                type="Oval"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={0}
              />
            </div>
          ) : (
            <div className="link">
              {yourlink}
              <a href={newlink} target="_blank" rel="noreferrer">
                {newlink}
              </a>
            </div>
          )}
          <form onSubmit={add}>
            <input
              type="url"
              onChange={(e) => setlink(e.target.value)}
              placeholder="Linkinizi Giriniz "
              pattern="http(s?)(:\/\/)((www.)?)(([^.]+)\.)([^.]+)"
              required
            />
            <button type="button" className="btn btn-dark" onClick={add}>
              Linki Kısalt
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
