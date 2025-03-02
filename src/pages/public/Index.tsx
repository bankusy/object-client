import styled from "styled-components";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
    const { isDarkMode } = useDarkMode();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        const navHeight = 64; // Navigation 높이 (8vh를 픽셀로 계산한 예상값)

        if (element) {
            const elementPosition = element.offsetTop - navHeight;
            window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <Container>
            <Navigation isScrolled={isScrolled}>
                <Logo src={isDarkMode ? "logo-dark.svg" : "logo-light.svg"} />
                <NavItems>
                    <NavItem onClick={() => scrollToSection("business")}>
                        Business
                    </NavItem>
                    <NavItem onClick={() => scrollToSection("pricing")}>
                        Pricing
                    </NavItem>
                    <NavItem onClick={() => scrollToSection("feature")}>
                        Feature
                    </NavItem>
                </NavItems>
                <Link to="/auth">
                    <SignIn>Sign in</SignIn>
                </Link>
            </Navigation>

            <BusinessSection id="business">
                <SectionWrap>
                    <SectionImage src="https://framerusercontent.com/images/9b8Jj3qlXqfQRuXapOAZSFGlA.png?scale-down-to=4096" />
                </SectionWrap>
            </BusinessSection>
            {/* <PricingSection id="pricing"></PricingSection> */}
            {/* <FeatureSection id="feature"></FeatureSection> */}
        </Container>
    );
}

const SectionImageDetail = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150px;
    height: auto;
    transform: translate(-50%, -50%);
`;

const SignIn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 50%;
    right: 10%;
    color: var(--background-color);

    transform: translate(-10%, -50%);

    width: 100px;
    height: 25px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: rgba(255, 255, 255, 0.8) 1px 1px 100px;
    cursor: pointer;
    border-radius: 200px;
    z-index: 1;
    text-align: center;
    &:hover {
        opacity: 0.5;
    }
    animation: blur 2s infinite;
    @keyframes blur {
        0% {
            box-shadow: rgba(255, 255, 255, 0.8) 1px 1px 50px;
        }

        60% {
            box-shadow: rgba(255, 255, 255, 0.8) 1px 1px 140px;
        }

        80% {
            box-shadow: rgba(255, 255, 255, 0.8) 1px 1px 50px;
        }

        100% {
            box-shadow: rgba(255, 255, 255, 0.8) 1px 1px 80px;
        }
    }
`;

const SectionDescriptionTitle = styled.div`
    position: relative;
    top: 0;
    left: -100px;
    font-size: 2rem;
`;

const SectionDescriptionSubTitle = styled.div``;

const SectionWrap = styled.div`
    position: relative;
    height: 100%;
    display: flex;
`;

const SectionDescription = styled.div`
    color: var(--text-color);
`;

const SectionImage = styled.img`
    width: auto;
    height: 100%;
    -webkit-mask-image: linear-gradient(
        to right,
        black 70%,
        /* 70%까지는 완전 불투명 */ transparent 100% /* 100%에서는 완전 투명 */
    );
    mask-image: linear-gradient(to right, black 70%, transparent 100%);
`;

const BusinessSection = styled.section`
    background-color: var(--primary-color);
    height: 100vh;
    scroll-snap-align: start;
`;

const PricingSection = styled.section`
    background-color: var(--secondary-color);
    min-height: 100vh;
    scroll-snap-align: start;

    padding-top: 8vh;
`;

const FeatureSection = styled.section`
    background-color: var(--border-color);
    min-height: 100vh;
    scroll-snap-align: start;
    padding-top: 8vh;
`;

const Container = styled.div`
    width: 100vw;
    height: 200vh;
    min-height: 100vh;
    scroll-snap-type: y mandatory; /* y 축 방향으로만 scroll snap 적용 */
    overflow-x: auto;
    background-color: #030303;
`;

const Navigation = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10vh;
    padding: 2vh 0;
    box-sizing: border-box;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
`;

const NavItems = styled.ul`
    display: flex;
    list-style: none;
    color: var(--text-color);
    gap: 80px;
    padding: 0;
    margin: 0;
`;
const NavItem = styled.li`
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const Logo = styled.img`
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(-10%, -50%);
    width: 60px;
    height: auto;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;
