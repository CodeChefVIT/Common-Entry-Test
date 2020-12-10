import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ClubList from './components/ClubList';
import Deadlines from './components/Deadlines';
import Exam from './components/Exam';

function App() {
  return (
    <Home />
    // <BrowserRouter>
    //   <div className="App">
    //     <Navbar />
    //     <Switch>
    //       <Route exact path="/" component={Home} />
    //       {/* <Route exact path="/list" component={ClubList} />
    //       <Route exact path="/deadlines" component={Deadlines} />
    //       <Route exact path="/exam/:exam_id" component={Exam} /> */}
    //     </Switch>
    //   </div>
    // </BrowserRouter>
  )
}

export default App;
// 282D33 black
// E31E43 red