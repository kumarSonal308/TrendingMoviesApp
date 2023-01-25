import logo from './logo.svg';
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Movies from './components/Movies';
import Faviourates from './components/Faviourates'
import {BrowserRouter as  Router,Switch,Route} from 'react-router-dom'
import './App.css';

// is V6 Switch is replaced by Routes
function App() {
  return (
    
      <Router>
      <Navbar/>
      <Switch>
      <Route path='/' exact render={(props)=>(
        <>
          <Banner {...props}/>
          <Movies {...props}/>
        </>
      )}/>
      <Route path='/favourites' component={Faviourates} />
      </Switch>
      {/* <Banner/> */}
      {/* <Movies/> name="udai" */}
      {/* <Favourite/> */}
      </Router>

  );
 
}

export default App;
