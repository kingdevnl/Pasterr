import { hot } from 'react-hot-loader/root';

import React from 'react';
import Header from './components/Header';

import './css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Paste } from './pages/Paste';
import { Home } from './pages/Home';
import { RecoilRoot } from 'recoil';

function App() {


    return (
        <RecoilRoot>
            <BrowserRouter>
                <Header />

                <Switch>
                    <Route path='/:id'>
                        <Paste />
                    </Route>


                    <Route path='/'>
                        <Home />
                    </Route>

                </Switch>
            </BrowserRouter>
        </RecoilRoot>
    );

    // return (
    //     <div className={"m-app"}>
    //         <Router>
    //             <Header/>
    //                 <Switch>
    //                     <Route path="/paste/:id">
    //                         <Paste/>
    //                     </Route>
    //                     <Route path="/">
    //                         <Home/>
    //                     </Route>
    //                 </Switch>
    //         </Router>
    //     </div>
    // );
}

export default hot(App);
