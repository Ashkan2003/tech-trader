import Navbar from "../components/navBar/Navbar";
import LabelBottomNavigation from "./LabelBottomNavigation";

export default function MobileRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <LabelBottomNavigation />
    </>
  );
}
