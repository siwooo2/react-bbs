// import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api/axios.js";
import BbsList from "../list/BbsList";
import Button from "../ui/Button";


const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;


function HomePage(){
    const navigate = useNavigate();

    const [lst, setLst] = useState([]);

    useEffect(()=>{
        getlst()
    },[])

    // json-server version
    // const getlst = async() => {
    //     try{
    //         const response = await api.get("bbs")
    //         setLst(response.data);
    //         console.log("debug >>> axios get OK!!, ", response.data)
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    // spring version
    const getlst = async() => {
        try{
            const response = await api.get("bbs/index")
            setLst(response.data);
            console.log("debug >>> axios get OK!!, ", response.data)
        }catch(err){
            console.log(err);
        }
    }

    return(
        <Wrapper>
            <Container>

                <Button
                    title="글 작성하기"
                    onClick={()=>{
                        navigate("bbs-write")
                }}/>

                    {/* 
                    1. 페이지 렌더링 이후 데이터(db.json) 가져오는 구현
                    2. props 로 데이터 전달
                    3. BbsList 에서 map 함수 이용해서 props 데이터 전달 후 BbsItem 화면 구현
                     */}
                     &nbsp;&nbsp;&nbsp;
                <Button 
                    title="날씨예보"
                    onClick={()=>{
                    navigate("forecast-write")
                }}/>
                <p/>
                
                <BbsList 
                    data={lst}/>

            </Container>
        </Wrapper>
    )
}

export default HomePage;