import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Login from "./components/login/login";
import Home from "./components/home/home";
import CompletedView from "./components/completedView/completedView";
import "./App.css";
import NavigationBar from "./components/navbar/navbar";
import { getCurrentUser } from "./services/userService";
import Register from "./components/Register/Register";
import { CalendarDisp } from "./components/calendar/calendar";

function App() {
  const [userState, setUserState] = useState(1);
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
    onError: () => {
      console.clear();
    },
    staleTime: 3600000,
    retry: false,
  });
  const [homeState, setHomeState] = useState(1);
  return (
    <div className="mainHolder">
      <div className="content">
        {isError && userState == 1 && <Login setState={setUserState} />}
        {isError && userState == 2 && <Register setState={setUserState} />}
        {!isError && !isLoading && (
          <>
            <NavigationBar setState={setHomeState} />{" "}
            <Home user={user} state={homeState} />
            {/* <CalendarDisp></CalendarDisp> */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
