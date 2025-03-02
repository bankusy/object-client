import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "./App.css";
import Index from "./pages/public/Index";
import Auth from "./pages/public/Login";
import AuthSuccess from "./pages/private/common/AuthSuccess";
import NotFound from "./pages/private/common/NotFound";
import Setting from "./pages/private/settings/Settings";
import UserSetting from "./pages/private/settings/UserSetting";
import Navigation from "./components/Navigation";
import styled from "styled-components";
import UserTerminate from "./pages/private/settings/UserTerminate";
import Users from "./pages/private/users/Users";
import { customAxios } from "./api/Auth";
import Home from "./pages/private/home/Home";

// Private 라우트를 위한 레이아웃 컴포넌트
const PrivateLayout = () => {
    return (
        <Container>
            <Navigation />
            <Outlet />
        </Container>
    );
};

const App = () => {
    // useEffect(() => {
    //     if (window.location.pathname !== '/auth') {
    //         customAxios.get('/api/v1/auth/check').then(response => {
    //             if (response.status !== 200) {
    //                 console.log(response.status);
    //                 window.location.href= '/auth';
    //             }
    //         }).catch(error => {
    //             console.error("인증 확인 중 오류 발생:", error);
    //             window.location.href= '/auth';
    //         });
    //     }
    // }, []);

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth-success" element={<AuthSuccess />} />
                
                {/* Private Routes */}
                <Route element={<PrivateLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/settings" element={<Setting />} />
                    <Route path="/settings/user" element={<UserSetting />} />
                    <Route path="/settings/terminate" element={<UserTerminate />} />
                    {/* ETC */}
                    <Route path="/*" element={<NotFound />} />
                </Route>

                
            </Routes>
        </BrowserRouter>
    );
};

export default App;

const Container = styled.div`
    display: flex;
    padding-left: var(--nav-width);
`