import { AppRouter } from "@/app/AppRouter.tsx";

import "./styles/globals.scss";
// import { retrieveRawInitData } from "@telegram-apps/sdk";
// import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   async function fetchUserData() {
  //     const initDataRaw = retrieveRawInitData();
  //
  //     Authorization: `tma ${initDataRaw}`;
  //     fetch("https://example.com/api", {
  //       method: "POST",
  //       headers: {},
  //     });
  //   }
  //   fetchUserData();
  // }, []);

  return (
    <>
      <div className={"bg"} />
      <div>
        <AppRouter />
      </div>
    </>
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
