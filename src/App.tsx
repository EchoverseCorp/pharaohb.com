import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Outlet,
  useParams,
  useRoutes,
  type RouteObject,
} from "react-router-dom";
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

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouteMeta />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Outlet />
      </Suspense>
    </TooltipProvider>
  </QueryClientProvider>
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "start", element: <Start /> },
      { path: "about", element: <About /> },
      { path: "articles", element: <News /> },
      { path: "articles/:slug", element: <NewsArticle /> },
      { path: "books", element: <Navigate to="/library" replace /> },
      { path: "library", element: <Canon /> },
      { path: "library/:slug", element: <CanonDetail /> },
      { path: "canon", element: <Navigate to="/library" replace /> },
      { path: "canon/:slug", element: <CanonDetail /> },
      { path: "art", element: <Art /> },
      { path: "art/:slug", element: <ArtDetail /> },
      { path: "music", element: <Music /> },
      { path: "media", element: <Transmissions /> },
      { path: "transmissions", element: <Navigate to="/media" replace /> },
      { path: "creative", element: <Creative /> },
      { path: "resources", element: <Resources /> },
      { path: "search", element: <Search /> },
      { path: "think-clearly", element: <PillarPage slug="think-clearly" /> },
      {
        path: "think-clearly/:slug",
        element: <MappedContentPage section="think-clearly" />,
      },
      { path: "build-discipline", element: <PillarPage slug="build-discipline" /> },
      {
        path: "build-discipline/:slug",
        element: <MappedContentPage section="build-discipline" />,
      },
      { path: "find-direction", element: <PillarPage slug="find-direction" /> },
      {
        path: "find-direction/:slug",
        element: <MappedContentPage section="find-direction" />,
      },
      {
        path: "creative-expression",
        element: <PillarPage slug="creative-expression" />,
      },
      {
        path: "creative-expression/:slug",
        element: <MappedContentPage section="creative-expression" />,
      },
      { path: "books-and-tools", element: <PillarPage slug="books-and-tools" /> },
      {
        path: "books-and-tools/:slug",
        element: <MappedContentPage section="books-and-tools" />,
      },
      { path: "study-guides", element: <StudyGuides /> },
      {
        path: "study-guides/:slug",
        element: <MappedContentPage section="study-guides" />,
      },
      { path: "resources/:slug", element: <MappedContentPage section="resources" /> },
      { path: "creative/:slug", element: <MappedContentPage section="creative-media" /> },
      { path: "first-100", element: <First100Hub /> },
      { path: "writings", element: <Writings /> },
      { path: "writings/:slug", element: <WritingDetail /> },
      { path: "echoverse", element: <Echoverse /> },
      { path: "shop", element: <Shop /> },
      { path: "news", element: <Navigate to="/articles" replace /> },
      { path: "news/:slug", element: <LegacyNewsSlugRedirect /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const App = () => useRoutes(routes);

export default App;
