import { useEffect, useRef } from "react";
import "../App.css";

const Cursor = () => {
    const circleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (circleRef.current) {
                circleRef.current.style.left = `${e.clientX}px`;
                circleRef.current.style.top = `${e.clientY}px`;
            }
        };

        // 마우스 이벤트 리스너 추가
        document.addEventListener("mousemove", handleMouseMove);

        // 컴포넌트 언마운트 시 리스너 제거
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return <div ref={circleRef} className="cursor-circle" />;
};

export default Cursor;
