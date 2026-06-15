import { Reshaped } from "reshaped";
import "reshaped/themes/slate/theme.css";
import { HomeScreen } from "./views/HomeScreen";

const App = () => {
  return (
    <Reshaped theme="slate" defaultColorMode="dark">
      <HomeScreen />
    </Reshaped>
  );
};

export default App;
