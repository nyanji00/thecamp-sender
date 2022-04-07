import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import styled from "@emotion/styled";
import postLetter from "../remotes/postLetter";
import Textarea from "../components/Textarea";
import { keyframes } from "@emotion/react";
import Spinner from "../components/Spinner";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";

const Home: NextPage = () => {
  const [sender, setSender] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File>();

  const [loading, setLoading] = useState<boolean>(false);

  const [toastOpen, setToastOpen] = useState<boolean>(false);

  useEffect(() => {
    if (toastOpen) {
      setTimeout(() => setToastOpen(false), 3000);
    }
  }, [toastOpen]);

  return (
    <HomeRoot>
      <HomeInner>
        <Title>💙🐹 규진이에게 인편쓰기 🐭💙</Title>
        <HStack delay={0.2}>
          <Label>이름</Label>
          <Input
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="성함을 입력해주세요."
          />
        </HStack>
        <HStack delay={0.4}>
          <Label>제목</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="제목을 입력해주세요."
          />
        </HStack>
        <HStack delay={0.6}>
          <Label>내용</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요."
          />
        </HStack>
        <HStack delay={0.8}>
          <Label>사진</Label>
          <File type="file" onChange={(e) => setImage(e.target.files?.[0])} />
        </HStack>
        <SlideUp delay={1}>
          <Button
            disabled={!sender || !subject || !content}
            onClick={async () => {
              if (!sender || !subject || !content) return;
              try {
                setLoading(true);
                await postLetter(sender, subject, content, image);
                setSender("");
                setSubject("");
                setContent("");
                setImage(undefined);
              } catch (e) {
                console.log(e);
              } finally {
                setLoading(false);
                setToastOpen(true);
              }
            }}
          >
            {loading ? <Spinner /> : "편지 보내기"}
          </Button>
        </SlideUp>
      </HomeInner>
      <Modal
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        isCentered={true}
        closeOnOverlayClick={false}
      >
        <ModalContent
          width="fit-content"
          padding="15px 40px"
          background="rgb(102, 102, 102)"
          color="white"
          fontWeight={500}
          outline="none"
          fontSize="15px"
        >
          편지가 성공적으로 전송되었어요 ✨
        </ModalContent>
      </Modal>
    </HomeRoot>
  );
};

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const SlideUp = styled.div<{ delay?: number }>`
  opacity: 0;
  animation: ${slideUp} 0.6s ease;
  animation-delay: ${(p) => p.delay ?? 0}s;
  animation-fill-mode: forwards;
`;
const HomeRoot = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0;
  width: 100vw;
`;
const HomeInner = styled.div`
  width: calc(100% - 40px);
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
`;
const HStack = styled(SlideUp)`
  display: flex;
  width: 100%;
  gap: 10px;
`;
const Label = styled.div`
  padding-top: 11px;
  padding-left: 5px;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
`;
const Title = styled(SlideUp)`
  font-size: 23px;
  padding-bottom: 10px;
  font-weight: 700;
`;
const File = styled.input`
  border: 2px solid #789cd5;
  border-radius: 14px;
  padding: 10px 12px;
  width: 100%;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  background: rgb(72, 128, 238);
  color: white;
  border-radius: 12px;
  font-weight: 500;
  transition: 0.5s;
  width: 200px;
  height: 60px;

  :hover {
    background: rgb(50, 99, 210);
  }

  &[disabled] {
    background: rgb(194, 209, 237);
    color: rgb(243, 243, 243);
    cursor: default;
  }
`;

export default Home;
