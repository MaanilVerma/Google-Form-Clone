import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { GlobalState, initialState, reducer } from "../../config/contextAPI";
import Header from "../Layout/Header/";
import Form from "../pages/Form/";
import Home from "../pages/Home/";
import Modal from "../Layout/Modal";
import Loading from "../Layout/Loading";
import "./App.css";

function App() {
  const location = useLocation();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const mode = {
    color: state.isDark ? "#eee" : "#999",
    backgroundColor: state.isDark ? "#1F2937" : "#F3F4F6",
    transition: "all .5s ease",
    WebkitTransition: "all .5s ease",
    MozTransition: "all .5s ease",
  };

  React.useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("uid"));
    if (uid) {
      dispatch({ type: "CHANGE_ISLOGIN", value: true });
      dispatch({ type: "CHANGE_UID", value: uid });
    }
    return () => {
      dispatch({ type: "CHANGE_ISLOGIN", value: false });
      dispatch({ type: "CHANGE_UID", value: "" });
    };
  }, [dispatch]);

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      <div style={mode} className="min-h-screen">
        <Header />
        <main className="pt-16">
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.key}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/:id" element={<Form />} />
              <Route path="/edit/:id" element={<Form />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Modal />
      </div>
      <Loading />
    </GlobalState.Provider>
  );
}

export default App;
