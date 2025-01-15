import "./home.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "../../services/taskService";
import { TaskList } from "../TaskList/TaskList.jsx";
import { CalendarDisp } from "../calendar/calendar.jsx";
import logo from "../../images/logo.webp";
import CompletedView from "../completedView/completedView.jsx";

function Home({ user, state }) {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(user.id),
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return (
    <div className="home">
      <div>
        <div className="logoHolder">
          <img src={logo} className="logo" />
          cheeky manager
        </div>
      </div>
      {state == 1 && <TaskList data={data} />}
      {state == 2 && <CalendarDisp data={data} />}
      {state == 3 && <CompletedView user={user} />}
    </div>
  );
}

export default Home;
