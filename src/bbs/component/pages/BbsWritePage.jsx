// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api/axios.js";
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";


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


function BbsWritePage(){
    const navigate = useNavigate()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const titleHandler = (e) => {
        setTitle(e.target.value)
    }
    
    const contentsHandler = (e) => {
        setContent(e.target.value)
    }
    
    const cancelHandler = () => {
        alert("글 작성을 취소하고 홈으로 이동합니다.")
        navigate("/")
    }

    // json-server version
    // const bbsSave = async(title, content) => {
    //     const data = {
    //         id: Date.now(),
    //         title: title,
    //         content: content
    //     }
    //     try{
    //         const response = await api.post("bbs", data)
    //         console.log("debug >>> axios post response data, ", response.data)
    //         alert("글 작성 완료하고 홈으로 이동합니다.")
    //         navigate("/")
    //     }catch(err){
    //         console.log(err)
    //     }
    // }

    // spring version
    const bbsSave = async(title, content) => {
        const data = {
            title: title,
            content: content
        }
        try{
            const response = await api.post("bbs/save", data)
            console.log("debug >>> axios post response data, ", response)
            if(response.status == 204){
                alert("글 작성 완료하고 홈으로 이동합니다.")
                navigate("/")
            }else{
                alert("데이터 저장시 문제 발생!")
            }
            
        }catch(err){
            console.log(err)
        }
    }
    return(
        <Wrapper>
            <Container>
                <label> 제목 :
                    <TextInput
                        height={20}
                        value={title}
                        onChange={titleHandler}/>
                </label>
                <label> 내용 :
                    <TextInput
                        height={480}
                        value={content}
                        onChange={contentsHandler}/>
                </label>
                <Button 
                    title="글 작성하기" 
                    onClick={(e)=>bbsSave(title,content)}/>
                &nbsp;&nbsp;&nbsp;
                <Button 
                    title="글 작성취소" 
                    onClick={cancelHandler}/>
            </Container>
        </Wrapper>
    )
}

export default BbsWritePage;