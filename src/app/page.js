import Image from "next/image";
import Banner from "../components/Banner";
import Facility from "../components/Facility";
import HealthyAdvice from "../components/HealthyAdvice";

export default function Home() {
  return (
    <div >

          <main>
            <Banner />
            <Facility />
            <HealthyAdvice />
          </main>
     
    </div>
  );
}
