import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Start from "./pages/Start";
import Books from "./pages/Books";
import Canon from "./pages/Canon";
import CanonDetail from "./pages/CanonDetail";
import Art from "./pages/Art";
import ArtDetail from "./pages/ArtDetail";
import Music from "./pages/Music";
import Transmissions from "./pages/Transmissions";
import Writings from "./pages/Writings";
import WritingDetail from "./pages/WritingDetail";
import Echoverse from "./pages/Echoverse";
import Creative from "./pages/Creative";
import Resources from "./pages/Resources";
import Search from "./pages/Search";
import Shop from "./pages/Shop";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import { RouteMeta } from "./components/RouteMeta";
import PillarPage from "./pages/PillarPage";
import StudyGuides from "./pages/StudyGuides";
import First100Hub from "./pages/First100Hub";
import MappedContentPage from "./pages/MappedContentPage";

const queryClient = new QueryClient();

const LegacyNewsSlugRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/articles/${slug}` : "/articles"} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteMeta />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<Start />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<News />} />
          <Route path="/articles/:slug" element={<NewsArticle />} />
          <Route path="/books" element={<Books />} />
          <Route path="/library" element={<Canon />} />
          <Route path="/library/:slug" element={<CanonDetail />} />
          <Route path="/canon" element={<Navigate to="/library" replace />} />
          <Route path="/canon/:slug" element={<CanonDetail />} />
          <Route path="/art" element={<Art />} />
          <Route path="/art/:slug" element={<ArtDetail />} />
          <Route path="/music" element={<Music />} />
          <Route path="/media" element={<Transmissions />} />
          <Route path="/transmissions" element={<Navigate to="/media" replace />} />
          <Route path="/creative" element={<Creative />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/search" element={<Search />} />
          <Route path="/think-clearly" element={<PillarPage slug="think-clearly" />} />
          <Route path="/think-clearly/:slug" element={<MappedContentPage section="think-clearly" />} />
          <Route path="/build-discipline" element={<PillarPage slug="build-discipline" />} />
          <Route path="/build-discipline/:slug" element={<MappedContentPage section="build-discipline" />} />
          <Route path="/find-direction" element={<PillarPage slug="find-direction" />} />
          <Route path="/find-direction/:slug" element={<MappedContentPage section="find-direction" />} />
          <Route path="/creative-expression" element={<PillarPage slug="creative-expression" />} />
          <Route path="/creative-expression/:slug" element={<MappedContentPage section="creative-expression" />} />
          <Route path="/books-and-tools" element={<PillarPage slug="books-and-tools" />} />
          <Route path="/books-and-tools/:slug" element={<MappedContentPage section="books-and-tools" />} />
          <Route path="/study-guides" element={<StudyGuides />} />
          <Route path="/study-guides/:slug" element={<MappedContentPage section="study-guides" />} />
          <Route path="/resources/:slug" element={<MappedContentPage section="resources" />} />
          <Route path="/creative/:slug" element={<MappedContentPage section="creative-media" />} />
          <Route path="/first-100" element={<First100Hub />} />
          <Route path="/writings" element={<Writings />} />
          <Route path="/writings/:slug" element={<WritingDetail />} />
          <Route path="/echoverse" element={<Echoverse />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/news" element={<Navigate to="/articles" replace />} />
          <Route path="/news/:slug" element={<LegacyNewsSlugRedirect />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
