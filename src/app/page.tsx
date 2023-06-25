import DescriptionHome from "@/components/HomePage/DescriptionHome";
import FunctionItem from "@/components/HomePage/FunctionItem";
import MobileApp from "@/components/HomePage/MobileApp";
import NewMember from "@/components/HomePage/NewMember";
import OurTeam from "@/components/HomePage/OurTeam";
import ViewerHome from "@/components/HomePage/ViewerHome";
import Welcome from "@/components/HomePage/Welcome";

export default function HomePage() {
  return (
    <>
      <div>
        <Welcome />
        <div className="gradient-03 z-0" />
        <FunctionItem />
      </div>
      <div className="relative">
        <MobileApp />
        <div className="gradient-04" />
        <DescriptionHome />
        <ViewerHome />
        <NewMember />
        <OurTeam />
      </div>
    </>
  )
}
