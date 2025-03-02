import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDarkMode } from "../hooks/useDarkMode";
import { useRef } from "react";

export default function Navigation() {
    const { isDarkMode } = useDarkMode();
    const iconSuffix = isDarkMode ? "dark" : "light";
    const Navitems = [
        {
            id: 1,
            desc: "둘러보기",
            src: `home-${iconSuffix}.svg`,
            path: "/home",
        },
        {
            id: 2,
            desc: "둘러보기",
            src: `people-${iconSuffix}.svg`,
            path: "/users",
        },
        {
            id: 3,
            desc: "앱",
            src: `application-${iconSuffix}.svg`,
            path: "/apps",
        },
        { id: 4, desc: "소식", src: `news-${iconSuffix}.svg`, path: "/rss" },
        {
            id: 5,
            desc: "알림",
            src: `notification-${iconSuffix}.svg`,
            path: "/notifications",
        },
        {
            id: 6,
            desc: "설정",
            src: `setting-${iconSuffix}.svg`,
            path: "/settings",
        },
    ];

    const logoutForm = useRef({});
    // const handleSubmit = () => {
    //     const formElement = logoutForm.current as HTMLFormElement;
    //     formElement.setAttribute('method', 'POST');
    //     formElement.setAttribute('action', 'http://localhost:8080/api/v1/oauth/logout');
    //     localStorage.removeItem("userId");
    //     localStorage.removeItem("userNickname");
    //     localStorage.removeItem("userAvatar");
    //     formElement.submit();
    // }

    return (
        <Nav>
            <NavHeader>
                <Logo
                    src={isDarkMode ? "logo-dark.svg" : "logo-light.svg"}
                    onClick={() => {
                        window.location.href = "/";
                    }}
                />
            </NavHeader>
            <NavMain>
                {Navitems?.map((item) => (
                    <StyledLink to={item.path} title={item.desc}>
                        <NavItem key={item.id}>
                            <img src={item.src} />
                        </NavItem>
                    </StyledLink>
                ))}
            </NavMain>
        </Nav>
    );
}

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: var(--nav-width);
    height: 100vh;
    border-right: 1px solid var(--border-color);
    background-color: var(--background-color);
    backdrop-filter: blur(10px);
    padding: 10px 0;
    z-index: 9999;
`;

const NavHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 30%;
`;

const Logo = styled.img`
    width: 30px;
`;

const NavItem = styled.li`
    cursor: pointer;
    color: var(--secondary-color);
    &:hover {
        opacity: 0.5;
    }
`;

const StyledLink = styled(Link)`
    font-weight: ${(props) =>
        props.to === location.pathname ? "bold" : "normal"};
    text-decoration: none;
`;

const NavMain = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
    gap: 20px;
`;

const Icon = styled.img`
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;
