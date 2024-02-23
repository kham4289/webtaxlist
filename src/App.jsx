
import "./App.css";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Form from "./pages/form";

import TopBar from "./layouts";
import WelcomPage from "./pages/welcomPage";
import { route } from "./constants";
import AllTax from "./pages/allTaxList";
import NotSent from "./pages/allTaxList/notSent";
import Sent from "./pages/allTaxList/sent";
import Detail from "./components/Detail";
import Cancel from "./pages/allTaxList/Cancel";
import GetByManual from "./pages/allTaxList/GetByManual";
import GetBysun from "./pages/allTaxList/getBysun";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<TopBar />}>
            <Route path={"/"} element={<WelcomPage />} />
            <Route path={`${route.FORM_TAXLIST}`} element={<Form />} />
            <Route path={`${route.ALL_TAX_LIST}/:filter`} element={<AllTax />}/>
            <Route path={`${route.NOT_TAX_LIST}`} element={<NotSent />}/>
            <Route path={`${route.SENT_TAX_LIST}`} element={<Sent />}/>
            <Route path={`${route.DETAIL_TAX_LIST}/:searchTransid`} element={<Detail />}/>
            <Route path={`${route.CANCEL_LIST}`} element={<Cancel/>} />
            <Route path={`${route.GETBY_MANUAL}`} element={<GetByManual/>} />
            <Route path={`${route.GETBY_SUN}`} element={<GetBysun/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
