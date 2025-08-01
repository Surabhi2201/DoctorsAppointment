import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to HealthCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/departments/ent.jpg"}
      />
      <Biography imageUrl={"/departments/cardio.jpg"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
