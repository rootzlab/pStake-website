import { NextPage } from "next";
import React from "react";
import Footer from "../components/molecules/Footer";
import People from "../components/organisms/team/people";
import BitcoinBanner from "../components/organisms/team/join-team";

const T_ea_m:NextPage = () => {
  return(
    <>
      <People/>
      <BitcoinBanner/>
      <Footer />
    </>
  )
}

export default T_ea_m;