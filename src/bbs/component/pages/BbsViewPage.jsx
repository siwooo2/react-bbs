// import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../api/axios.js";
import CommentList from "../list/CommentList";
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
const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;
const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;
const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;
const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function BbsViewPage(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [bbs, setBbs] = useState({});
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const backHandler = () => {
        navigate('/')
    }

    useEffect(()=>{
        getBbs()
        // getComments()
    },[])

    // json-server version
    // const getComments = async () => {
    //     try{
    //         const response = await api.get(`comments?bbsId=${id}`)
    //         console.log("debug >>> getComments OK !")
    //         setComments(response.data)
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    // spring version
    const getComments = async () => {
        try{
            // ??????????? 컨트롤러쪽에서는 패스밸류가 아니기 때문에 user endpoint : bbs/comment/getComment ????????????
            // (CommentRequestDTO params)
            // const response = await api.get(`bbs/comment/getComment?bbsid=${id}`) -> 쿼리파라미터 방식

            // user endpoint : bbs/comment/getComment/3 -> 패스파라미터 방식(패스밸류방식)
            // (@PathVariable(id="id") Integer id)
            // map.put("bbsid", id)
            const response = await api.get(`bbs/comment/getComment/${id}`)
            // const response = await api.get(`bbs/view/${id}`) -> 굳이 이렇게 다 가져올 필요가 없으니 위 코드처럼 코멘트 부분만 가져오기?
            console.log("debug >>> getComments OK !")
            console.log("debug >>> axios comments get response data, ", response.data);
            console.log("debug >>> axios comments get response status, ", response.status);
            console.log("debug >>> axios comments get response data length, ", response.data.length);
            setComments(response.data)
        }catch(err){
            console.log(err);
        }
    }

    // json-server version
    // const getBbs = async () => {
    //     try{
    //         const response = await api.get(`bbs/${id}`)
    //         setBbs(response.data)
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    
    // spring version
    const getBbs = async () => {
        try{
            const response = await api.get(`bbs/view/${id}`)
            console.log("debug >>> axios get response data, ", response.data)
            setBbs(response.data)
            setComments(response.data.comments);
        }catch(err){
            console.log(err);
        }
    }

    const textHandler = (e) => {
        setComment(e.target.value)
    }

    // json-server version
    // const commentHandler = async (bbsId, content) => {
    //     if(!content){
    //         alert('타임라인을 작성해 주세요!!')
    //     } else{
    //         const data = {
    //             id: Date.now(),
    //             content: content,
    //             bbsId: bbsId
    //         }
    //         try{
    //             await api.post('comments', data)
    //             alert("comment 등록 완료 !!")
    //             setComment('')
    //             getComments();
    //         }catch(err){
    //             console.log(err)
    //         }
    //     }
    // }

    // spring version
    const commentHandler = async (bbsId, content) => {
        if(!content){
            alert('타임라인을 작성해 주세요!!')
        } else{
            const data = {
                content: content,
                bbsid: bbsId
            };
            try{
                /*
                step01)
                1. CommentRequestDTO 작성
                2. Controller에 bbs/comment/save 매핑메서드 정의하고
                3. 파라미터로 넘어오는 데이터 확인하는것 까지만....
                */
                const response = await api.post('bbs/comment/save', data);
                console.log("debug >>> axios post response data, ", response);
                if( response.status == 204){
                    alert("comment 등록 완료 !!")
                    setComment('')
                    getComments();
                } else {
                    alert("타임라인 등록시 오류 발생함!!")
                }
                
            }catch(err){
                console.log(err)
            }
        }
    }

    // json-server version
    // const removeBbs = async(bbsId) => {
    //     try{
    //         await api.delete(`bbs/${bbsId}`)
    //         alert("bbs 삭제 완료 !!")
    //         navigate('/')
    //     }catch(err){
    //         console.log(err)
    //     }
    // }

    //spring version
    /*
    1. 조건처리를 통한 삭제 여부 판단
    2. comment 가 있으면 삭제 불가(alert('게시글을 삭제할 수 없습니다.'))
    3. 삭제 가능할 경우 user endpoint = bbs/delete/{bbsid}
    4. / 이동
    */
    const removeBbs = async(bbsId) => {
        try{
            console.log("debug >>> comments length, ", comments.length)

            if(comments.length == 0){
                const response = await api.delete(`bbs/delete/${bbsId}`);
                console.log("debug >>> axios delete resposne status, ", response.status);
                if(response.status == 204){
                    alert("bbs 삭제 완료 !!")
                    navigate('/')
                } else {
                    alert("게시글 삭제 중 문제가 발생했습니다.")
                }
            } else {
                alert("게시글을 삭제할 수 없습니다.")
            }
        }catch(err){
            console.log(err)
        }
    }

    const updateHandler = () => {
        if(window.confirm("수정페이지로 이동하시겠습니까?")){
            navigate(`/bbs-update`, {state : {id: id}})
        }
    }


    return(
        <Wrapper>
            <Container>
                <Button 
                    title="뒤로가기"
                    onClick={backHandler}/>
                <p/>
                <PostContainer>
                    <TitleText>{bbs.title}</TitleText>
                    <ContentText>{bbs.content}</ContentText>
                    {/* 
                    1. 버튼 클릭시 수정페이지(BbsUpdatePage.jsx)로 이동(Route - 'bbs-update')
                    2. 페이지 화면 구성은 BbsWritePage 와 동일하게 구성하되 데이터 보여지는 상태
                    3. 데이터 변경이 되었을 때만 수정완료 활성화 시켜서 수정 기능 완료 !!
                    3-1. 고민해 주세요!!
                    4. 수정 완료 후에는 HomePage 로 이동
                    */}
                    <Button 
                        title="게시글 수정하기"
                        onClick={updateHandler}/>
                    &nbsp;&nbsp;
                    <Button 
                        title="게시글 삭제하기" 
                        onClick={()=>removeBbs(bbs.id)}/>
                </PostContainer>

                <CommentLabel>타임라인</CommentLabel>
                <TextInput 
                    height={20}
                    value={comment}
                    onChange={textHandler}/>
                <p/>
                <Button 
                    title="타임라인 등록하기"
                    onClick={()=>commentHandler(bbs.id, comment)}/>
                <p/>
                <CommentList
                    data={comments}/>
            </Container>
        </Wrapper>
    )
}

export default BbsViewPage;