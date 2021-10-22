import './App.css';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import PatientList from "./components/PatientList/PatientList";
import CommentList from "./components/CommentList/CommentList";
import PatientInfo from "./components/PatientInfo/PatientInfo";
import CreatePatient from "./components/CreatePatient/CreatePatient";
import UpdatePatient from "./components/UpdatePatient/UpdatePatient";


function App() {
    return (
        <div id='container'>
            <BrowserRouter>
                <aside>
                    <Route exact path={[
                        '/',
                        '/patient/create',
                        '/patient/update/:number',
                        '/comment/patient/:number'
                    ]} component={ PatientList } />
                </aside>
                <main>
                    <Route exact path='/comment/patient/:number' component={ PatientInfo } />
                    <Route exact path='/patient/create' component={ CreatePatient } />
                    <Route exact path='/patient/update/:number' component={ UpdatePatient } />
                </main>
            </BrowserRouter>
        </div>
    );
}

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//
//   render() {
//     return (
//         <div id='container'>
//             <aside>
//                 <PatientList />
//
//                 <BrowserRouter>
//                     <ul>
//                         <li>
//                             <Link to="/netflix">Netflix</Link>
//                         </li>
//                         <li>
//                             <Link to="/zillow-group">Zillow Group</Link>
//                         </li>
//                         <li>
//                             <Link to="/yahoo">Yahoo</Link>
//                         </li>
//                         <li>
//                             <Link to="/modus-create">Modus Create</Link>
//                         </li>
//                     </ul>
//                 </BrowserRouter>
//             </aside>
//             <main>
//                 <BrowserRouter>
//                     <Switch>
//                         {/*<Route exact path='/comment/patient/:number' component={ CommentList } />*/}
//                         <Route exact path='/:id' component={ Child } />
//
//                     </Switch>
//
//                 </BrowserRouter>
//
//
//             </main>
//
//         </div>
//     );
//   }
// }

export default App;
