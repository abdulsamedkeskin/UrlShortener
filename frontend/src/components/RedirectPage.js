import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RedirectPage = () => {
  const [redirect, setredirect] = useState("");
  const link = useParams();
  console.log(link.link);
  useEffect(() => {
    axios
      .get(`https://shorturlbackend.herokuapp.com/${link.link}`)
      .then((res) => setredirect(res.data.url));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (redirect !== "") {
    window.location.assign(redirect);
  }
  return <div className="loading">Yönlendiriliyor...</div>;
};

export default RedirectPage;
