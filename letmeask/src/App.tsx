import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './Pages/Home';
import { NewRoom } from './Pages/NewRoom';
import { Room } from './Pages/Rooms';
import { AuthContextProvider } from './Context/AuthContext'; 
import { AdminRoom } from './Pages/AdminRoom';




function App() {

  return (

    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" exact component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
