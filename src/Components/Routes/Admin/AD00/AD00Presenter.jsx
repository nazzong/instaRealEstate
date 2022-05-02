import React from "react";
import {
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
  Image,
} from "../../../../Components/CommonComponents";
import Link from "next/link";
import styled from "styled-components";

const StatusText = styled.div`
  font-size: 20px;
  color: ${(props) => props.color};
  margin: 20px 0px;
  font-weight: 700;
`;

export default () => {
  return (
    <WholeWrapper minWidth={`1000px`} al={`flex-start`} ju={`flex-start`}>
      <Wrapper height={`350px`} shadow={`5px 5px 10px #eee`} radius={`20px`}>
        <Image
          width={`300px`}
          margin={`0px 0px 20px`}
          alt="로고"
          src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/INSTA-ESTATE%2Fassets%2Fimages%2Flogo%2Flogo01.png?alt=media&token=908a7803-7ebb-48f5-b384-edcf6f91c9f5`}
        />
        <Text fontSize={`28px`}>
          안녕하세요.
          <br />
          인스타 부동산 ADMIN MANAGEMENT SYSTEM 입니다.
        </Text>
        <Text color={`#888`}>
          웹사이트의 직접적인 관리를 하실 수 있는 시스템입니다.
        </Text>
      </Wrapper>

      <Wrapper dr={`row`} margin={`40px 0px 0px`}>
        <Link href="/admin/statManagement">
          <CommonButton
            width={`200px`}
            height={`40px`}
            margin={`30px`}
            size={`18px`}
          >
            접속자 통계 바로가기
          </CommonButton>
        </Link>
        <Link href="/admin/mainBannerManagement">
          <CommonButton
            width={`200px`}
            height={`40px`}
            margin={`30px`}
            size={`18px`}
            kindOf={`check`}
          >
            메인 베너 관리 바로가기
          </CommonButton>
        </Link>
      </Wrapper>
      <Wrapper dr={`row`} margin={`10px 0px`}>
        <Link href="/admin/productManagement">
          <CommonButton
            width={`200px`}
            height={`40px`}
            margin={`30px`}
            size={`18px`}
            kindOf={`check`}
          >
            매몰 관리 바로가기
          </CommonButton>
        </Link>
        <Link href="/admin/faqManagement">
          <CommonButton
            width={`200px`}
            height={`40px`}
            margin={`30px`}
            size={`18px`}
          >
            자주묻는 질문 관리 바로가기
          </CommonButton>
        </Link>
      </Wrapper>
    </WholeWrapper>
  );
};
