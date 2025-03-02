import { useEffect, useState } from "react";

export const useDarkMode = () => {
    // 시스템 다크모드 감지를 위한 미디어 쿼리
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme === "dark";
        }
        // 저장된 테마가 없으면 시스템 설정 사용
        return systemPrefersDark.matches;
    });

    // 시스템 테마 변경 감지
    useEffect(() => {
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
            localStorage.setItem("theme", e.matches ? "dark" : "light");
        };

        // 이벤트 리스너 등록
        systemPrefersDark.addEventListener("change", handleSystemThemeChange);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            systemPrefersDark.removeEventListener(
                "change",
                handleSystemThemeChange
            );
        };
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    return {
        isDarkMode,
        toggleDarkMode,
    };
};
