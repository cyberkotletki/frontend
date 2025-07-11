import { AppRouter } from "@/app/AppRouter.tsx";
import UserProvider from "@/providers/UserProvider";
import "./styles/globals.scss";

function App() {
  return (
    <UserProvider>
      <div className={"bg"} />
      <div>
        <AppRouter />
      </div>
    </UserProvider>
  );
}

export default App;
