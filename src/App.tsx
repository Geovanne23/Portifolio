import { WishlistProvider } from "./lib/wishlistContext";
import { PageBackground } from "./components/PageBackground";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Wishlist } from "./components/Wishlist";
import { CountdownFooter } from "./components/CountdownFooter";

function App() {
  return (
    <WishlistProvider>
      <main className="min-h-screen relative overflow-hidden">
        <PageBackground />
        <div className="relative z-10 py-12">
          <Hero />
          <Stats />
          <Wishlist />
          <CountdownFooter />
        </div>
      </main>
    </WishlistProvider>
  );
}

export default App;
