import Navbar from "@/components/layouts/navbar";
import Main from "@/components/layouts/main";
import Footer from "@/components/layouts/footer";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}
