import { use } from "react";
import UsersContext from "./context/UsersContext";
import { ChatsProvider } from "./context/ChatsContext";
import { HashRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";

const App = () => {
  const { isAuth, handleLogin, handleLogout, users, currentUser } =
    use(UsersContext);

  return (
    <HashRouter>
      <ChatsProvider currentUser={currentUser}>
        <AppRouter
          isAuth={isAuth}
          onLogin={handleLogin}
          onLogout={handleLogout}
          users={users}
          currentUser={currentUser}
        />
      </ChatsProvider>
    </HashRouter>
  );
};

export default App;
