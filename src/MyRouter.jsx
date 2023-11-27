import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import { useState } from "react"
import { Geolocator } from "./Geolocator";

export const MyRouter = () => {
    const [uid, setUID] = useState(sessionStorage.getItem("uid"));
    return(
        <div style={{height:"931px"}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App setUID={setUID} uid={uid}/>}/>
                    <Route path={`/${uid}/geolocator`} element={<Geolocator/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}