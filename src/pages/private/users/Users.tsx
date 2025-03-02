import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { customAxios } from "../../../api/Auth";
import Button from "../../../components/Button";
import { User, UserJob } from "../../../models/User";

interface UserResponse {
    content: User[];
    numberOfElements: number;
}

export default function Users() {
    const { isDarkMode } = useDarkMode();

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined | null>();

    // [검색]
    const observerRef = useRef(null);
    const [users, setUsers] = useState<User[]>([]);
    const [jobs, setJobs] = useState<UserJob[]>([]);
    const [jobId, setJobId] = useState("");
    const [search, setSearch] = useState("");

    const size = 50; // 페이지당 유저 수
    const [page, setPage] = useState(0); // 페이지가 바뀐다고 해서 렌더링을 하진 않으려고 하므로 주의해서 사용해야 함
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // 사용자 데이터를 가져오는 함수
    const fetchUsers = async (page: number, jobId: string, search: string) => {
        const response = await customAxios.get<UserResponse>(
            `/users?size=${size}&page=${page}&search=${search}&jobId=${jobId}`
        );
        return response.data; // 응답 데이터 반환
    };

    const handleRowClick = (user: User) => {
        if (selectedUser && selectedUser.userId === user.userId) {
            closePanel();
        } else {
            setSelectedUser(user);
            setIsVisible(true);
            setIsPanelOpen(true);
        }
    };

    const closePanel = () => {
        setIsPanelOpen(false);
        setTimeout(() => {
            setIsVisible(false);
            setSelectedUser(null);
        }, 500);
    };

    const loadMoreUsers = async (
        nextPage: number,
        loading: boolean,
        hasMore: boolean
    ) => {
        // 이미 로딩 중인 경우 가져오지 않게끔 하기 위해 설정
        // 더 가져올 게 없는 경우 리턴
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const { content, numberOfElements } = await fetchUsers(
                nextPage,
                jobId,
                search
            );

            console.log("numberOfElements: ", numberOfElements);

            setUsers((prevUsers) => [...prevUsers, ...content]);
            setPage((prevPage) => prevPage + 1);
            setHasMore(numberOfElements === size);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchClick = () => {
        setUsers([]);
        setPage(0); // 페이지를 0으로 초기화
        setLoading(false);
        setHasMore(true);
        loadMoreUsers(0, false, true); // 0을 인자로 전달
    };

    useEffect(() => {
        customAxios.get<UserJob[]>("/jobs").then((response) => {
            setJobs(response.data);
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (observerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } =
                    observerRef.current;
                if (scrollTop + clientHeight >= scrollHeight - 5) {
                    loadMoreUsers(page, loading, hasMore);
                }
            }
        };

        const currentRef = observerRef.current;
        currentRef.addEventListener("scroll", handleScroll);
        return () => {
            currentRef.removeEventListener("scroll", handleScroll);
        };
    }, [loading, hasMore, page]);

    return (
        <>
            <Container isOpen={isPanelOpen}>
                <InnerContainer ref={observerRef}>
                    <SearchContainer>
                        <SelectWrap>
                            <Select
                                value={jobId}
                                defaultValue={0}
                                onChange={(e) => setJobId(e.target.value)}
                            >
                                <option key="0" value="">
                                    전체
                                </option>
                                {jobs.map((job) => (
                                    <option key={job.id} value={job.id}>
                                        {job.name}
                                    </option>
                                ))}
                            </Select>
                        </SelectWrap>
                        <InputWrap>
                            <Input
                                id="search"
                                type="text"
                                placeholder="닉네임"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </InputWrap>
                        <ButtonWrap>
                            <Button onClick={handleSearchClick}>검색</Button>
                        </ButtonWrap>
                    </SearchContainer>

                    <UserList>
                        {loading && <Spinner />}
                        {users.map((user) => (
                            <UserRow
                                key={user.userId}
                                onClick={() => handleRowClick(user)}
                            >
                                <UserAvatar
                                    src={user.userAvatar}
                                    alt={`Avatar of ${user.userNickname}`}
                                />
                                <UserNickname>
                                    @{user.userNickname}
                                </UserNickname>
                                <UserJob>
                                    {user.userJob}
                                    {user.userJobSuffix
                                        ? ` (${user.userJobSuffix})`
                                        : ""}
                                </UserJob>
                            </UserRow>
                        ))}
                    </UserList>
                </InnerContainer>
            </Container>
            {isVisible && (
                <SlidingPanel isOpen={isPanelOpen}>
                    <CloseButton
                        src={isDarkMode ? "exit-dark.svg" : "exit-light.svg"}
                        onClick={closePanel}
                    />
                    {selectedUser && (
                        <UserDetails>
                            <PanelAvatar src={selectedUser.userAvatar} />
                            <PanelNickname>
                                @{selectedUser.userNickname}
                            </PanelNickname>
                            <PanelJob>{selectedUser.userJob}</PanelJob>
                            <PanelEmail>
                                <a href={`mailto:${selectedUser.userEmail}`}>
                                    <img
                                        src={
                                            isDarkMode
                                                ? "email-dark.svg"
                                                : "email-light.svg"
                                        }
                                    />
                                </a>
                            </PanelEmail>
                            <PanelBio>{selectedUser.userBio}</PanelBio>
                        </UserDetails>
                    )}
                </SlidingPanel>
            )}
        </>
    );
}

const PanelAvatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 10%;
    transition: opacity 0.3s ease;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 10%;
    transition: opacity 0.3s ease;
`;

const ButtonWrap = styled.div`
    flex: 2;
    height: 100%;
`;

const CloseButton = styled.img`
    align-self: flex-end;
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
`;

const InnerContainer = styled.div`
    overflow-y: scroll;
    position: relative;
    width: 600px;
    height: 100vh;
    border-right: 1px solid var(--border-color);
`;

const InputWrap = styled.div`
    flex: 5;
    height: 100%;
`;

const ObserverTarget = styled.div`
    height: 1px;
`;

const PanelBio = styled.div`
    color: var(--text-color);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PanelEmail = styled.div`
    color: var(--secondary-color);
    margin-bottom: 1rem;
`;

const PanelJob = styled.div`
    color: var(--secondary-color);
    margin-bottom: 1rem;
`;

const PanelNickname = styled.div`
    color: var(--text-color);
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
`;

const SearchContainer = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    flex-basis: 0;
    padding: 16px;
    gap: 1rem;
    width: auto;
    background-color: var(--background-color);
    height: 5vh;
    z-index: 2;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
`;

const SlidingPanel = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: var(--panel-width);
    transform: translateX(100%);
    height: 100%;
    background-color: var(--primary-color);
    color: var(--text-color);
    border-left: 1px solid var(--border-color);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rem;
    z-index: 1000;
    animation: ${({ isOpen }) => (isOpen ? "slider" : "reverseSlider")} 0.5s
        forwards;

    @keyframes slider {
        0% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(0);
        }
    }

    @keyframes reverseSlider {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(100%);
        }
    }
`;

const UserAvatar = styled.img`
    width: 40px;
`;

const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const UserJob = styled.div`
    width: 250px;
    color: var(--secondary-color);
`;

const UserList = styled.div``;

const UserNickname = styled.div`
    width: 150px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--text-color);
    word-break: break-all;
`;

const UserRow = styled.div`
    margin: 0 1rem;
    width: auto;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--secondary-color);
    cursor: pointer;
    opacity: 1;
    height: 60px;
    gap: 1rem;

    &:hover {
        opacity: 0.5;
    }
`;

const SelectWrap = styled.div`
    flex: 3;
    height: 100%;
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #000;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
    margin: 20px auto; // 중앙 정렬
`;
