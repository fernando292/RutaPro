import Header from "../../components/layout/Header";

import Hero from "../../components/sections/Hero";
import Benefits from "../../components/sections/Benefits";
import HowItWorks from "../../components/sections/HowItWorks";
import Features from "../../components/sections/Features";
import Contact from "../../components/sections/Contact";



function Home() {


  return (

    <>

      <Header />

      <main>

        <Hero />

        <Benefits />

        <HowItWorks />

        <Features />

        <Contact />

      </main>


    </>

  );


}


export default Home;