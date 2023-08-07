import { withLoggedIn } from "./common/utils/conditionalRouter";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  // const CounterPrivate = withLoggedIn(Counter)

  return (
    // TODO: add suspense with loading fallback to handle loading time delays.
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/counter" element={<CounterPrivate />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
