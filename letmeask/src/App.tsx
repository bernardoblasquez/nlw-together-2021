import { Home } from './Pages/Home';
import { NewRoom } from './Pages/NewRoom';
import { BrowserRouter, Route } from 'react-router-dom'



function App() {
  return (

    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/rooms/new" component={NewRoom} />
    
    </BrowserRouter>
  );
}

export default App;
