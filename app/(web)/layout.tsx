import Footer from "@/components/navigation/footer";
import Navbar from "@/components/navigation/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full h-full">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default MainLayout;
