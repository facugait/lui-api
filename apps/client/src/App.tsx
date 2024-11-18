import { useMemo, createContext } from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditMenu from "./pages/EditMenu";
import AddMenu from "./pages/AddMenu";
import Login from "./pages/Login";
import { Header } from "./components/Header";
import Title from "antd/es/typography/Title";
import { Flex, Layout, notification } from "antd";
import styled from "styled-components";
import { AuthProvider } from "./contexts/auth";

const Context = createContext({ name: "Default" });

const StyledHeader = styled(Layout.Header)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding-top: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledContent = styled(Layout.Content)`
  min-height: 280px;
  margin: 0 auto;
`;

function App() {
  const [_, contextHolder] = notification.useNotification();

  const contextValue = useMemo(() => ({ name: "Api LUI" }), []);

  return (
    <AuthProvider>
      <Router>
        <Context.Provider value={contextValue}>
          {contextHolder}
          <Layout>
            <StyledHeader>
              <Header
                logo={
                  <Flex justify="center" align="center">
                    <img
                      style={{ height: "76px", marginRight: "8px" }}
                      src="logo.png"
                    />
                    <Title style={{ margin: "10px" }}>Lui Admin</Title>
                  </Flex>
                }
              />
            </StyledHeader>
            <StyledContent>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add" element={<AddMenu />} />
                <Route path="/edit/:id" element={<EditMenu />} />
              </Routes>
            </StyledContent>
          </Layout>
        </Context.Provider>
      </Router>
    </AuthProvider>
  );
}

export default App;
