import { AppRouter } from "@/app/AppRouter.tsx";

function App() {
  return (
    <div>
      <AppRouter />
    </div>
  );
}
/*
     <Routes>
 <Route element={<IndexPage />} path="/" />
 <Route element={<DocsPage />} path="/docs" />
 <Route element={<PricingPage />} path="/pricing" />
 <Route element={<BlogPage />} path="/blog" />
 <Route element={<AboutPage />} path="/about" />
</Routes>
     */
export default App;
