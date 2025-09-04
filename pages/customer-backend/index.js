import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../../components/model/layoutCustomer";
import modelCss from "../../styles/model.module.css";
import Models from "../../components/models";
import withAuth from "../../components/admin/withAuthCustomer";
import Link from "next/link";

const Home = () => {
  const originalUrl = "https://tsm.spagram.com/api/models.php";
  const [baseUrl, setBaseUrl] = useState(originalUrl);

  const [area, setArea] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [height, setHeight] = useState("");
  const [filteredUrl, setFilteredUrl] = useState(originalUrl);

  //   //area, gender, race, height
  //   function createFilterUrl(){
  //     setFilteredUrl(originalUrl + '?service_area=' + area + '&gender=' + gender + '&race=' + race + '&height=' + height);
  //     console.log('hi', filteredUrl);
  //   }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
    </Layout>
  );
};

export default withAuth(Home);
