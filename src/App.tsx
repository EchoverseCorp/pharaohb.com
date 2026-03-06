import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { RouteMeta } from "./components/RouteMeta";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Start = lazy(() => import("./pages/Start"));
const Canon = lazy(() => import("./pages/Canon"));
const CanonDetail = lazy(() => import("./pages/CanonDetail"));
const Art = lazy(() => import("./pages/Art"));
const ArtDetail = lazy(() => import("./pages/ArtDetail"));
const Music = lazy(() => import("./pages/Music"));
const Transmissions = lazy(() => import("./pages/Transmissions"));
const Writings = lazy(() => import("./pages/Writings"));
const WritingDetail = lazy(() => import("./pages/WritingDetail"));
const Echoverse = lazy(() => import("./pages/Echoverse"));
const Creative = lazy(() => import("./pages/Creative"));
const Resources = lazy(() => import("./pages/Resources"));
const Search = lazy(() => import("./pages/Search"));
const Shop = lazy(() => import("./pages/Shop"));
const News = lazy(() => import("./pages/News"));
const NewsArticle = lazy(() => import("./pages/NewsArticle"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PillarPage = lazy(() => import("./pages/PillarPage"));
const StudyGuides = lazy(() => import("./pages/StudyGuides"));
const First100Hub = lazy(() => import("./pages/First100Hub"));
const MappedContentPage = lazy(() => import("./pages/MappedContentPage"));

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
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Start />} />
            <Route path="/about" element={<About />} />
            <Route path="/articles" element={<News />} />
            <Route path="/articles/:slug" element={<NewsArticle />} />
            <Route path="/books" element={<Navigate to="/library" replace />} />
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
