import React, { useState, useEffect} from "react";
import Preloader from "./components/preloader.js"
import Home from "./Pages/home.js" 
import NavBar from "./components/nav.js"
import Firehome from "./Pages/homefirebase.js"

import{
    BrowserRouter as Router,
     Route, 
     Routes,
    Navigate
} from "react-router-dom";
import "./style.css";
import  "./app.css";
import  "bootstrap/dist/css/bootstrap.min.css"
import Footer from "./components/footer.js"
import Ndikwara from "./Pages/firebaseadmin/login.js";

function App() {
    const [load, updateload] = useState(true);

    useEffect(()=>{
        const timer = setTimeout(() =>{
            updateload(false);
        }, 1200);
        return () => clearTimeout(timer);
    },[]);
    
    return(
    <Router>
          < Preloader load={load}/>
           <div className="App" id ={load ? "no-scroll": "scroll"}>
            <NavBar/>
            <Routes>
                <Route path="/h" element={<Home />}/>
                <Route path ="*" element ={<Navigate to="/"/>}/>
                <Route path ='/' element={<Firehome/>}/>
                <Route path ='/admin' element={<Ndikwara/>}/>
            </Routes>
            <Footer/>
           </div>
           
        </Router>
    )
}

export default App