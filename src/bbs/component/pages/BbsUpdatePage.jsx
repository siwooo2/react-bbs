import _ from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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


function BbsUpdatePage(){
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [bbs, setBbs] = useState({});
    const [originalbbs, setOriginalbbs] = useState({});

    const [disabled, setDisabled] = useState(true);
    
    const location = useLocation();
    console.log("debug >>> update page state, ", location.state.id)
    const bbsId = location.state.id

    useEffect(()=>{
        getBbs();
    },[])

    useEffect(()=>{
        setBbs({
            title: title,
            content: content
        });
    }, [title,content])

    useEffect(()=>{
        setDisabled(_.isEqual(bbs,originalbbs))
    })

    // json-server version
    // const getBbs = async () => {
    //     try{
    //         const response = await api.get(`bbs/${bbsId}`)

    //         setBbs({...response.data})
    //         setOriginalbbs({...response.data})

    //         setTitle(response.data.title)
    //         setContent(response.data.content)

    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    // spring version
    const getBbs = async () => {
        try{
            const response = await api.get(`bbs/view/${bbsId}`)

            setBbs({...response.data})
            setOriginalbbs({...response.data})

            setTitle(response.data.title)
            setContent(response.data.content)

        }catch(err){
            console.log(err);
        }
    }
    
    const titleHandler = (e) => {
        setTitle(e.target.value)
        // setDisabled(false);
        setBbs();
    }
    
    const contentsHandler = (e) => {
        setContent(e.target.value)
        // setDisabled(false);
    }
    
    const cancelHandler = () => {
        alert("글 수정을 취소하고 홈으로 이동합니다.")
        navigate(`/`)
    }

    // json-server version
    // const updateHandler = async() => {
    //     const data = {
    //         title: title, 
    //         content: content
    //     }
    //     try{
    //         const response = await api.patch(`bbs/${bbsId}`, data)
    //         alert("수정이 완료되었습니다.")
    //         navigate("/")
    //     }catch(err){
    //         console.log(err)
    //     }
    // }

    // spring version
    const updateHandler = async() => {
        console.log("debug >>> update handler click", bbsId)
        const data = {
            id : bbsId,
            title: title,
            content: content
        }
        try{
            const response = await api.put(`bbs/update`, data)
            console.log("debug >>> axios patch response data, " + response.data)
            alert("수정이 완료되었습니다.")
            navigate("/")
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
                    title="글 수정하기" 
                    onClick={updateHandler}
                    disabled={disabled}/>
                &nbsp;&nbsp;&nbsp;
                <Button 
                    title="글 수정 취소" 
                    onClick={cancelHandler}/>
            </Container>
        </Wrapper>
    )
}

export default BbsUpdatePage;