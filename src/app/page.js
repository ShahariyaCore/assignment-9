import Image from "next/image";
import Banner from "../components/Banner";
import TopDoctors from "../components/TopDoctors";
import Facility from "../components/Facility";
import Achievements from "../components/Achievements";
import HealthyAdvice from "../components/HealthyAdvice";

export default function Home() {
  return (
    <div >

          <main>
            <Banner />
            <TopDoctors />
            <Facility />
            <Achievements />
            <HealthyAdvice />
          </main>
     
    </div>
  );
}
