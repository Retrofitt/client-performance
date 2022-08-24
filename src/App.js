import "antd/dist/antd.css";
import LoginForm from "./components/loginForm";
import PageLayout from "./pages/layout";

function App() {
  return (
    <div>
      <PageLayout>
        <LoginForm />
      </PageLayout>
    </div>
  );
}

export default App;
