import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ClubDiscovery } from "@/components/ClubDiscovery";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <ClubDiscovery />
      </main>
    </div>
  );
};

export default Index;
