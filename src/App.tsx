import { Button, Container, Reshaped } from "reshaped";
import "reshaped/themes/slate/theme.css";

const App = () => {
  return (
    <Reshaped theme="slate">
      <Container width="652px">
        <Button href="/">Get started</Button>
      </Container>
    </Reshaped>
  );
};

export default App;
