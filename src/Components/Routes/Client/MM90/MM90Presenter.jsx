import React from "react";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  CommonSubTitle,
  LiWrapper,
  UlWrapper,
  CommonButton,
  TextInput,
  Combo,
  ComboOption,
  Label,
  SubjectTitle,
} from "../../../../Components/CommonComponents";
import styled from "styled-components";
import { withResizeDetector } from "react-resize-detector";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import Theme from "../../../../Styles/Theme";
import useWindowSize from "../../../Hooks/useWindowSize";

const PreText = styled.pre`
  line-height: 130%;
  word-break: break-all;
`;

const MM90Presenter = ({
  width,
  //
  checkAgree1,
  setCheckAgree1,
  checkAgree2,
  setCheckAgree2,
  currentTab,
  inputName,
  inputEmail,
  inputEmailDomain,
  selectEmailDomain,
  inputMobile1,
  inputMobile2,
  inputMobile3,
  //
  checkAgreeHandler,
  checkEmailHandler,
  checkMobileHandler,
  createUserHandler,
  moveLinkHandler,
}) => {
  const size = useWindowSize();

  return (
    <WholeWrapper padding={size.width < 900 ? `70px 0 50px` : `210px 0 50px`}>
      <RsWrapper>
        <Wrapper margin={`100px 0 0`} shadow={`0px 5px 10px #eee`}>
          <Wrapper
            isRelative={true}
            fontSize={`34px`}
            fontWeight={`bold`}
            color={`#333`}
            width={`auto`}
          >
            신규가입 회원
            <Wrapper
              isAbsolute={true}
              left={`0`}
              bottom={`0`}
              bgColor={`#f1ff64`}
              height={`20px`}
              zIndex={`-1`}
            ></Wrapper>
          </Wrapper>

          <Wrapper
            margin={`15px 0 50px`}
            fontSize={`34px`}
            fontWeight={`bold`}
            color={`#333`}
            width={`auto`}
          >
            혜택 안내
          </Wrapper>

          <Wrapper
            width={`auto`}
            color={Theme.white_C}
            bgColor={Theme.subBlack_C}
            radius={`25px`}
            padding={`8px 15px 3px`}
            margin={`0 0 20px`}
          >
            혜택 1
          </Wrapper>

          <Wrapper
            margin={`0 0 40px`}
            textAlign={`center`}
            fontSize={`18px`}
            lineHeight={`150%`}
            color={`#222`}
          >
            신규 회원으로 가입을 하시면,
            <br />
            중개수수료가 절감됩니다.
          </Wrapper>

          <Wrapper
            width={`auto`}
            color={Theme.white_C}
            bgColor={Theme.subBlack_C}
            radius={`25px`}
            padding={`8px 15px 3px`}
            margin={`0 0 20px`}
          >
            혜택 2
          </Wrapper>

          <Wrapper
            margin={`0 0 40px`}
            textAlign={`center`}
            fontSize={`18px`}
            lineHeight={`150%`}
            color={`#222`}
          >
            신규 회원으로 가입을 하시면,
            <br />
            A급 사무실 업데이트 시 URL을 발송해드립니다.
          </Wrapper>
        </Wrapper>

        {currentTab === 0 && (
          <Wrapper margin={`50px 0 0 0 `}>
            <Wrapper width={size.width < 700 ? `100%` : `70%`}>
              <Wrapper
                isOverflow={true}
                ju={`flex-start`}
                al={`flex-start`}
                padding={`20px 50px`}
                height={`150px`}
                border={`1px solid #ddd`}
                className="scroll"
              >
                <PreText>
                  {`
제 1 조 (목적) 
1.개인정보란 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명, 주민등록번호 등의 사항에 의하여 당해 개인을 식별할 수 있는 정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함합니다)를 말합니다.

2. 는 귀하의 개인정보보호를 매우 중요시하며, 『정보통신망이용촉진및정보보호에관한법률』상의 개인정보보호규정 및 정보통신부가 제정한 『개인정보 보호법』을 준수하고 있습니다.
는 개인정보처리방침을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.

3.는 개인정보처리방침을 홈페이지 첫 화면에 공개함으로써 귀하께서 언제나 용이하게 보실 수 있도록 조치하고 있습니다.

4.는 개인정보처리방침의 지속적인 개선을 위하여 개인정보처리방침을 개정하는데 필요한 절차를 정하고 있습니다.
그리고 개인정보처리방침을 개정하는 경우 버전번호 등을 부여하여 개정된 사항을 귀하께서 쉽게 알아볼 수 있도록 하고 있습니다.

제2조 (개인정보의 수집범위)
는 별도의 회원가입 절차 없이 대부분의 컨텐츠에 자유롭게 접근할 수 있습니다.
그러나 는 맞춤형 서비스를 제공하기 위하여 회원서비스(유료 정보 등의 이용, 그밖에 향후 제공될 로그인 기반의 서비스) 및 제휴사를 통해 이용자의 정보를 수집하고 있습니다.
의 회원제 서비스를 이용하시고자 할 경우 다음의 정보를 입력해주셔야 하며 선택항목을 입력하시지 않았다 하여 서비스 이용에 제한은 없습니다.

1. 회원 가입 시 수집하는 개인정보의 범위 
1) 필수항목: 희망 ID, 비밀번호, 성명, 생년월일, 성별, 전화번호, 이메일 주소, ※만 14세 미만인 경우 법정대리인의 정보(이름, 연락처, 생년월일)를 추가 수집합니다.
2) 선택항목: 자기소개, 닉네임, 이벤트 상품 배송을 위한 주소 

2.법인회원 가입 시 수집하는 개인정보의 범위 
1) 필수항목 : 희망 ID, 비밀번호, 비밀번호 힌트/답변, 상호, 사업자 등록번호, 업태/업종, 대표자명, 소재지, 대표전화, 담당자명, 담당자 부서/직위, 담당자 전화번호, 팩스번호, 이메일 주소 
2) 선택항목: 자기소개, 닉네임, 이벤트 상품 배송을 위한 주소   

3.외국인회원 가입 시 수집하는 개인정보의 범위 
1) 필수항목 :희망 ID, 비밀번호, 비밀번호 힌트/답변, 성명, 생년월일, 이메일 주소, 전화번호, 성별, 외국인등록번호 또는 국적/여권번호 
2) 선택항목: 자기소개, 닉네임, 이벤트 상품 배송을 위한 주소 

4.유료정보 이용 시 수집하는 개인정보의 제공 
1) 회원 가입 시 수집한 정보와 동일 
2) 결제방법에 따라 결제 창에 입력하는 개인정보는 결제대행사에 기록될 뿐 에 기록되지 않음

5. 자료 판매금액 출금 시 수집하는 개인정보의 범위 
1) 은행명, 계좌번호, 주민등록번호 (최초 1회) 

6. 서비스 이용과정이나 사업처리과정에서의 자동생성 정보 
1) 서비스 이용기록, 접속로그, 쿠키, 접속 IP정보, 결제기록, 이용정지기록 제3조 (개인정보 수집에 대한 동의) 는 귀하께서 의 개인정보처리방침 또는 이용약관의 내용에 대해 「동의한다」버튼 또는 「동의하지 않는다」버튼을 클릭할 수 있는 절차를 마련하여, 「동의한다」버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 봅니다.

제4조 (개인정보의 수집목적 및 이용목적) 
1.는 다음과 같은 목적을 위하여 개인정보를 수집하고 있습니다.
1) 성명, 아이디, 비밀번호 :회원제 서비스 이용에 따른 본인 식별 절차에 이용 
2) 이메일주소, 전화번호: 고지사항 전달, 본인 의사 확인, 불만 처리 등 원활한 의사소통 경로의 확보, 새로운 서비스/신상품이나 이벤트 정보의 안내 
3) 주소, 전화번호: 경품 배송에 대한 정확한 배송지 확보 및 본인 식별 
4) 생년월일, 성별, 주소: 본인 식별 및 인구통계학적 분석 자료(이용자의 연령별, 성별 통계분석) 
5) 법인회원 (사업자 등록번호, 업태/업종, 담당자명, 담당자 연락처) : 세금계산서 발급 
6) 외국인회원 (외국인등록번호 또는 국적/여권번호) : 회원제 서비스 이용에 따른 본인 식별 절차에 이용 
7) 주민등록번호: 출금 회원에 한하여 소득세 신고를 위하여 수집 
8) 그 외 선택항목: 개인맞춤 서비스를 제공하기 위한 자료 

2. 단, 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 및 성생활 등)는 수집하지 않습니다.

제5조 (쿠키에 의한 개인정보 수집) 
1. 쿠키(cookie)란?
는 귀하에 대한 정보를 저장하고 수시로 찾아내는 ‘쿠키(cookie)’를 사용합니다.쿠키는 웹사이트가 귀하의 컴퓨터 브라우저(넷스케이프, 인터넷 익스플로러 등)로 전송하는 소량의 정보입니다.
쿠키는 귀하의 컴퓨터는 식별하지만 귀하를 개인적으로 식별하지는 않습니다.
또한 귀하는 쿠키에 대한 선택권이 있습니다.웹브라우저 상단의 도구 &#62; 인터넷옵션 탭(option tab)에서 모든 쿠키를 다 받아들이거나, 쿠키가 설치될 때 통지를 보내도록 하거나, 아니면 모든 쿠키를 거부할 수 있는 선택권을 가질 수 있습니다. 

2. 의 쿠키(cookie) 운용 
1) 개인의 관심 분야에 따라 차별화된 정보를 제공 
2) 회원과 비회원의 접속빈도 또는 머문 시간 등을 분석하여 이용자의 취향과 관심분야를 파악하여 타겟(target) 마케팅에 활용 
3) 쇼핑한 품목들에 대한 정보와 관심 있게 둘러본 품목들에 대한 자취를 추적하여 다음 번 쇼핑 때 개인 맞춤 서비스를 제공 
4) 유료서비스 이용 시 이용기간 안내 
5) 회원들의 습관을 분석하여 서비스 개편 등의 척도 
6) 게시판 글 등록쿠키는 브라우저의 종료시나 로그 아웃 시 만료됩니다.

제6조 (목적 외 사용 및 제3자에 대한 제공 및 공유) 
1. 는 귀하의 개인정보를 「개인정보의 수집목적 및 이용목적」에서 고지한 범위 내에서 사용하며, 동 범위를 초과하여 이용하거나 타인 또는 타기업, 기관에 제공하지 않습니다.
특히 다음의 경우는 주의를 기울여 개인정보를 이용 및 제공할 것입니다.

1) 제휴 관계: 보다 나은 서비스 제공을 위하여 귀하의 개인정보를 제휴사에게 제공 하거나 또는 제휴사와 공유할 수 있습니다.
개인정보를 제공하거나 공유 할 경우에는 사전에 귀하께 제휴사가 누구인지, 제공 또는 공유되는 개인 정보항목이 무엇인지, 왜 그러한 개인정보가 제공되거나 공유되어야 하는지,그리고 언제까지 어떻게 보호 관리되는지에 대해 개별적으로 전자우편 및 서면을 통해 고지하여 동의를 구하는 절차를 거치게 되며, 귀하께서 동의하지 않는 경우에 는 제휴사에게 제공하거나 제휴사와 공유하지 않습니다.
제휴관계에 변화가 있거나 제휴관계가 종결될 때도 같은 절차에 의하여 고지하거나 동의를 구합니다.
2) 위탁처리: 원활한 업무 처리를 위해 이용자의 개인정보를 위탁 처리할 경우 반드시 사전에 위탁처리 업체명과 위탁 처리되는 개인정보의 범위, 업무위탁 목적, 위탁처리 되는 과정, 위탁관계 유지 기간 등에 대해 상세하게 고지합니다. 
3) 매각, 인수합병 등: 서비스제공자의 권리와 의무가 완전 승계 이전되는 경우 반드시 사전에 정당한 사유와 절차에 대해 상세하게 고지할 것이며 이용자의 개인정보에 대한 동의 철회의 선택권을 부여합니다. 

2. 고지 및 동의방법은 온라인 홈페이지 초기화면의 공지사항을 통해 최소 10일 이전부터 고지함과 동시에 이메일 등을 이용하여 1회 이상 개별적으로 고지합니다.

3. 다음은 예외로 합니다.
1) 관계법령에 의하여 수사상의 목적으로 관계기관으로부터의 요구가 있을 경우
2) 통계작성, 학술연구나 시장조사를 위하여 특정 개인을 식별할 수 없는 형태로 광고주 협력사나 연구단체 등에 제공하는 경우
3) 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우 
4) 그러나 예외 사항에서도 관계법령에 의하거나 수사기관의 요청에 의해 정보를 제공한 경우에는 이를 당사자에게 고지하는 것을 원칙으로 운영하고 있습니다.
법률상의 근거에 의해 부득이하게 고지를 하지 못할 수도 있습니다.
본래의 수집목적 및 이용목적에 반하여 무분별하게 정보가 제공되지 않도록 최대한 노력하겠습니다. 

제7조 (개인정보의 열람, 정정) 
1.귀하는 언제든지 등록되어 있는 귀하의 개인정보를 열람하거나 정정하실 수 있습니다.
개인정보 열람 및 정정을 하고자 할 경우에는 마이페이지 &#62; 『개인정보관리』를 클릭하여 직접 열람 또는 정정하거나, 개인정보관리책임자 및 담당자에게 서면, 전화 또는 E-mail로 연락하시면 지체 없이 조치하겠습니다. 

2.귀하가 개인정보의 오류에 대한 정정을 요청한 경우,
정정을 완료하기 전까지 당해 개인 정보를 이용 또는 제공하지 않습니다.

3. 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정하도록 조치하겠습니다.

제8조 (개인정보 수집, 이용, 제공에 대한 동의철회[회원탈퇴]) 
1. 회원가입 등을 통해 개인정보의 수집, 이용, 제공에 대해 귀하께서 동의하신 내용을 귀하는 언제든지 철회하실 수 있습니다.동의철회는 고객센터 &#62; 『회원탈퇴』를 클릭하거나 개인정보관리책임자에게 팩스, 우편, 고객센터, 전화 등으로 연락하시면 회원탈퇴 신청 시점으로부터 90일 동안 재가입 방지를 위한 개인정보보존 이후 개인정보의 삭제 등 필요한 조치를 하겠습니다.
동의 철회를 하고 개인정보를 파기하는 등의 조치를 취한 경우에는 그 사실을 귀하께 지체 없이 통지하도록 하겠습니다.

2. 는 개인정보의 수집에 대한 동의철회(회원탈퇴)를 개인정보를 수집하는 방법보다 쉽게 할 수 있도록 필요한 조치를 취하겠습니다.

제9조 개인정보의 보유기간 및 이용기간 
1.회원님의 개인정보는 다음과 같이 개인정보의 수집목적 또는 제공받은 목적이 달성되면 개인정보를 지체 없이 파기합니다.
1) 종이에 출력된 개인 정보 : 분쇄기로 분쇄하거나 소각 
2) 전자적 파일 형태로 저장된 개인 정보 : 기록을 재사용할 수 없는 기술적 방법을 사용하여 삭제 단, 상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관련법령의 규정에 의하여 다음과 같이 거래 관련 권리 의무 관계의 확인 등을 이유로 일정기간 보유하여야 할 필요가 있을 경우에는 일정기간 보유합니다.
- 계약 또는 청약철회 등에 관한 기록: 5년 
- 대금결제 및 재화 등의 공급에 관한 기록: 5년 
- 소비자의 불만 또는 분쟁처리에 관한 기록: 3년 
회원가입정보의 경우, 회원가입을 탈퇴하거나 회원에서 제명된 경우 등 일정한 사전에 보유목적, 기간 및 보유하는 개인정보 항목을 명시하여 동의를 구합니다. 
- 재가입 방지를 위한 가입정보 기록: 90일 
- 자료 등록 및 판매에 관한 기록: 180일 

2. 귀하의 동의를 받아 보유하고 있는 거래정보 등을 귀하께서 열람을 요구하는 경우 는 지체 없이 그 열람 확인 할 수 있도록 조치합니다.

제10조 (개인정보보호를 위한 기술 및 관리적 대책) 
1. 기술적 대책 는 귀하의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다.
1) 귀하의 개인정보는 비밀번호에 의해 보호되며 파일 및 전송데이터를 암호화하거나 파일 잠금기능(Lock)을 사용하여 중요한 데이터는 별도의 보안기능을 통해 보호되고 있습니다. 
2) 는 백신프로그램을 이용하여 컴퓨터바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다. 
백신프로그램은 주기적으로 업데이트되며 갑작스런 바이러스가 출현할 경우 백신이 나오는 즉시 이를 제공함으로써 개인정보가 침해되는 것을 방지하고 있습니다.
3) 는 암호알고리즘을 이용하여 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안장치(SSL)를 채택하고 있습니다.
4) 해킹 등 외부침입에 대비하여 각 서버마다 침입차단시스템 및 취약점 분석시스템 등을 이용하여 보안에 만전을 기하고 있습니다.

2. 관리적 대책 
1) 는 귀하의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다.
그 최소한의 인원에 해당하는 자는 다음과 같습니다. 
-이용자를 직접 상대로 하여 마케팅 업무를 수행하는 자 
-고객의 불만 및 이용문의 처리 업무를 수행하는 자 
-개인정보관리책임자 및 담당자 등 개인정보관리업무를 수행하는 자 
-기타 업무상 개인정보의 취급이 불가피한 자 
2)입사 시 전 직원의 보안서약서를 통하여 사람에 의한 정보유출을 사전에 방지하고 개인정보처리방침에 대한 이행사항 및 직원의 준수여부를 감사하기 위한 내부절차를 마련하고 있습니다. 
3)개인정보 관련 취급자의 업무 인수인계는 보안이 유지된 상태에서 철저하게 이뤄지고 있으며 입사 및 퇴사 후 개인정보 사고에 대한 책임을 명확화하고 있습니다. 
4)는 이용자 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다.
회원 개개인이 본인의 개인정보를 보호하기 위해서 자신의 ID 와 비밀번호를 적절하게 관리하고 여기에 대한 책임을 져야 합니다.
5)그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실, 유출, 변조, 훼손이 유발될 경우 는 즉각 귀하께 사실을 알리고 적절한 대책과 보상을 강구할 것입니다. 

제11조 (링크사이트)
는 귀하께 다른 회사의 웹사이트 또는 자료에 대한 링크를 제공할 수 있습니다.이 경우 는 외부사이트 및 자료에 대한 아무런 통제권이 없으므로 그로부터 제공받는 서비스나 자료의 유용성에 대해 책임질 수 없으며 보증할 수 없습니다.가 포함하고 있는 링크를 클릭(click)하여 타 사이트(site)의 페이지로 옮겨갈 경우 해당 사이트의 개인정보처리방침은 와 무관하므로 새로 방문한 사이트의 정책을 검토해 보시기 바랍니다.

제12조 (게시물) 
1.는 귀하의 게시물을 소중하게 생각하며 변조, 훼손, 삭제되지 않도록 최선을 다하여 보호합니다.그러나 다음의 경우는 그러지 아니합니다.
1) 스팸(spam)성 게시물 (예 : 행운의 편지, 8억 메일,특정사이트 광고 등) 
2) 타인을 비방할 목적으로 허위 사실을 유포하여 타인의 명예를 훼손하는 글
3) 동의 없는 타인의 신상공개, 의 저작권, 제 3자의 저작권 등 권리를 침해하는 내용, 기타 게시판 주제와 다른 내용의 게시물 
4) 는 바람직한 게시판 문화를 활성화하기 위하여 동의 없는 타인의 신상 공개시 특정 부분을 삭제하거나 기호 등으로 수정하여 게시할수 있습니다.  
5)다른 주제의 게시판으로 이동 가능한 내용일 경우 해당 게시물에 이동 경로를 밝혀 오해가 없도록 하고 있습니다.
6)그 외의 경우 명시적 또는 개별적인 경고 후 삭제 조치할 수 있습니다.

2.근본적으로 게시물에 관련된 제반 권리와 책임은 작성자 개인에게 있습니다.
또 게시물을 통해 자발적으로 공개된 정보는 보호받기 어려우므로 정보 공개 전에 심사숙고 하시기 바랍니다.

제14조 (이용자의 권리와 의무) 
1.귀하의 개인정보를 최신의 상태로 정확하게 입력하여 불의의 사고를 예방해 주시기 바랍니다.
이용자가 입력한 부정확한 정보로 인해 발생하는 사고의 책임은 이용자 자신에게 있으며 타인 정보의 도용 등 허위정보를 입력할 경우 회원자격이 상실될 수 있습니다.

2.귀하는 개인정보를 보호받을 권리와 함께 스스로를 보호하고 타인의 정보를 침해하지 않을 의무도 가지고 있습니다.
비밀번호를 포함한 귀하의 개인정보가 유출되지 않도록 조심하시고 게시물을 포함한 타인의 개인정보를 훼손하지 않도록 유의해 주십시오.
만약 이 같은 책임을 다하지 못하고 타인의 정보 및 존엄성을 훼손할 시에는 『정보통신망이용촉진 및 정보보호 등에 관한 법률』등에 의해 처벌받을 수 있습니다.

3. 만 14세 미만의 아동의 경우, 법정대리인이 아동의 개인정보를 조회하거나 수정할 권리, 수집 및 이용 동의를 철회할 권리를 가집니다.

제15조 (의견수렴 및 불만처리) 
1.당사는 귀하의 의견을 소중하게 생각하며, 귀하는 의문사항으로부터 언제나 성실한 답변을 받을 권리가 있습니다.

2.당사는 귀하와의 원활환 의사소통을 위해 고객센터를 운영하고 있으며 연락처는 다음과 같습니다.

[개인정보침해신고센터] 전화 : 1336 URL :http://www.cyberprivacy.or.kr

제16조 (개인정보관리책임자 및 담당자)
는 귀하가 좋은 정보를 안전하게 이용할 수 있도록 최선을 다하고 있습니다.
개인정보를 보호하는데 있어 귀하께 고지한 사항들에 반하는 사고가 발생할 시에 개인정보관리책임자가 모든 책임을 집니다.
그러나 기술적인 보 완조치를 했음에도 불구하고, 해킹 등 기본적인 네트워크상의 위험성에 의해 발생하는 예기치 못한 사고로 인한 정보의 훼손 및 방문자가 작성한 게시물에 의한 각종 분쟁에 관해서는 책임이 없습니다.
귀하의 개인정보를 취급하는 책임자 및 담당자는 다음과 같으며 개인정보 관련 문의사항에 신속하고 성실하게 답변해드리고 있습니다.

제17조 (아동의 개인정보보호)
만 14세 미만 아동의 계정등록은 별도의 양식을 통해 이루어지고 있으며 개인정보 수집 시 법정대리인의 동의를 구하고 있습니다.
이 경우 법정 대리인은 다음 각 사항을 입력하여야 합니다.
-법정대리인의 성명, 휴대폰번호, 생년월일, 성별 

1.이용자 및 법정대리인의 권리와 그 행사방법 
1)정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
① 개인정보 열람 요구 
② 오류 등이 있을 경우 정정 요구 
③ 삭제 요구
④ 처리정지 요구 
2) 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.
3)정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.
4)제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
5)정보주체는 개인정보보호법 등 관계법령을 위반하여 회사가 처리하고 있는 정보주체 본인이나 타인의 개인정보 및 사생활을 침해하여서는 아니 됩니다.

제18조 (광고성 정보 전송) 
1.는 귀하의 명시적인 수신거부의사에 반하여 영리목적의 광고성 정보를 전송하지 않습니다.

2.는 귀하가 뉴스레터 등 전자우편 전송에 대한 동의를 한 경우 전자우편의 제목란 및 본문란에 다음 사항과 같이 귀하가 쉽게 알아 볼 수 있도록 조치합니다.
1) 전자우편의 제목 : (광고)라는 문구를 제목란에 표시하지 않을 수 있으며 전자우편 본문란의 주요 내용을 표시합니다.
2) 전자우편의 본문 : 귀하가 수신거부의 의사표시를 할 수 있는 전송자의 명칭, 전자우편주소, 전화번호 및 주소를 명시합니다.
귀하가 수신 거부의 의사를 쉽게 표시할 수 있는 방법을 한글 및 영문으로 각각 명시합니다.
귀하가 동의를 한 시기 및 내용을 명시합니다. 

3. 는 상품정보 안내 등 온라인 마케팅을 위해 광고성 정보를 전자우편 등으로 전송하는 경우 전자우편의 제목란 및 본문란에 다음 사항과 같이 귀하가 쉽게 알아 볼 수 있도록 조치합니다.
1) 전자우편의 제목 : (광고)또는(성인광고)라는 문구를 제목란의 처음에 빈칸 없이 한글로 표시하고 이어서 전자우편 본문란의 주요 내용을 표시합니다.
2) 전자우편의 본문 : 귀하가 수신거부의 의사표시를 할 수 있는 전송자의 명칭, 전자우편주소, 전화번호 및 주소를 명시합니다.
귀하가 수신 거부의 의사를 쉽게 표시할 수 있는 방법을 한글 및 영문으로 각 각 명시합니다.

4.다음과 같이 청소년에게 유해한 정보를 전송하는 경우 “(성인광고)” 문구를 표시합니다. 
1) 본문란에 다음 각 항목 1에 해당하는 것이 부호/문자/영상 또는 음향의 형태로 표현된 경우(해당 전자우편의 본문란에는 직접 표현되어있지 아니하더라도 수신자가 내용을 쉽게 확인할 수 있도록 기술적 조치가 되어 있는 경우를 포함한다)에는 해당 전자우편의 제목란에 "(성인광고)" 문구를 표시합니다. 
청소년(19세미만의 자를 말한다. 이하 같다)에게 성적인 욕구를 자극하는 선정적인 것이거나 음란한 것 청소년에게 포악성이나 범죄의 충동을 일으킬 수 있는 것 성폭력을 포함한 각종 형태의 폭력행사와 약물의 남용을 자극하거나 미화하는 것 청소년보호법에 의하여 청소년 유해 매체물로 결정 고시된 것 
2) 홈페이지를 알리는 경우에는 해당 전자우편의 제목란에 “(성인광고)” 문구를 표시합니다. 

5. 팩스/휴대폰 문자전송 등 전자우편 이외의 문자전송을 통해 영리목적의 광고성 정보를 전송하는 경우에는 전송내용 처음에 “(광고)”라는 문구를 표기하고 전송내용 중에 전송자의 연락처를 명시하도록 조치합니다
`}
                </PreText>
              </Wrapper>

              <Wrapper al={`flex-start`}>
                <Label>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="개인정보 처리방침에 모두 동의합니다."
                    labelPlacement="end"
                    checked={checkAgree1}
                    onChange={(e) => setCheckAgree1(e.target.checked)}
                  />
                </Label>
              </Wrapper>
            </Wrapper>

            <Wrapper
              width={size.width < 700 ? `100%` : `70%`}
              margin={`20px 0`}
            >
              <Wrapper
                isOverflow={true}
                ju={`flex-start`}
                al={`flex-start`}
                padding={`20px 50px`}
                height={`150px`}
                border={`1px solid #ddd`}
                className="scroll"
              >
                <PreText>
                  {`
제1조(목적) 이 약관은  회사(전자상거래 사업자)가 운영하는  사이버 몰(이하 “몰”이라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버몰과 이용자의 권리 의무 및 책임사항을 규정함을 목적으로 합니다.
※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」 

제2조(정의) 
① “몰”이란  회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다. 
② “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다. ③ ‘회원’이라 함은 “몰”에 회원등록을 한 자로서, 계속적으로 “몰”이 제공하는 서비스를 이용할 수 있는자를 말합니다. ④ ‘비회원’이라 함은 회원에 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다.

제3조 (약관 등의 명시와 설명 및 개정) 
① “몰”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호?모사전송번호?전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보보호책임자등을 이용자가 쉽게 알 수 있도록 00 사이버몰의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다. 
② “몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회?배송책임?환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다. 
③ “몰”은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다. 
④ “몰”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 “몰“은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. 
⑤ “몰”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 “몰”에 송신하여 “몰”의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.  
⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다. 

제4조(서비스의 제공 및 변경) 
① “몰”은 다음과 같은 업무를 수행합니다. 
1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결 
2. 구매계약이 체결된 재화 또는 용역의 배송 
3. 기타 “몰”이 정하는 업무 
② “몰”은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다. 
③ “몰”이 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다. 
④ 전항의 경우 “몰”은 이로 인하여 이용자가 입은 손해를 배상합니다. 다만, “몰”이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다. 

제5조(서비스의 중단) 
① “몰”은 컴퓨터 등 정보통신설비의 보수점검?교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다. 
② “몰”은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, “몰”이 고의 또는 과실이 없음을 입증하는 경우에 그러하지 아니합니다. 
③ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 “몰”은 제8조에 정한 방법으로 이용자에게 통지하고 당초 “몰”에서 제시한 조건에 따라 소비자에게 보상합니다. 다만, “몰”이 보상기준 등을 고지하지 아니한 경우에는 이용자들의 마일리지 또는 적립금 등을 “몰”에서 통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게 지급합니다. 

제 6조(회원가입) 
① 이용자는 “몰”이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다. 
② “몰”은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다. 
1. 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조제3항에 의한 회원자격 상실 후 3년이 경과한 자로서 “몰”의 회원재가입 승낙을 얻은 경우에는 예외로 한다. 
2. 등록 내용에 허위, 기재누락, 오기가 있는 경우 
3. 기타 회원으로 등록하는 것이 “몰”의 기술상 현저히 지장이 있다고 판단되는 경우 
③ 회원가입계약의 성립 시기는 “몰”의 승낙이 회원에게 도달한 시점으로 합니다. 
④ 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 “몰”에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다. 

제7조(회원 탈퇴 및 자격 상실 등) 
① 회원은 “몰”에 언제든지 탈퇴를 요청할 수 있으며 “몰”은 즉시 회원탈퇴를 처리합니다. 
② 회원이 다음 각 호의 사유에 해당하는 경우, “몰”은 회원자격을 제한 및 정지시킬 수 있습니다.
1. 가입 신청 시에 허위 내용을 등록한 경우 
2. “몰”을 이용하여 구입한 재화 등의 대금, 기타 “몰”이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우 
3. 다른 사람의 “몰” 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우 
4. “몰”을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우 
③ “몰”이 회원 자격을 제한?정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 “몰”은 회원자격을 상실시킬 수 있습니다. 
④ “몰”이회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의기간을 정하여 소명할 기회를 부여합니다. 

제8조(회원에 대한 통지) 
① “몰”이 회원에 대한 통지를 하는 경우, 회원이 “몰”과 미리 약정하여 지정한 전자우편 주소로 할 수 있습니다. 
② “몰”은 불특정다수 회원에 대한 통지의 경우 1주일이상 “몰” 게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다. 

제9조(구매신청) 
① “몰”이용자는 “몰”상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, “몰”은 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다. 
1. 재화 등의 검색 및 선택 
2. 받는 사람의 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호) 등의 입력 
3. 약관내용, 청약철회권이 제한되는 서비스, 배송료?설치비 등의 비용부담과 관련한 내용에 대한 확인 
4. 이 약관에 동의하고 위 3.호의 사항을 확인하거나 거부하는 표시(예, 마우스 클릭) 
5. 재화등의 구매신청 및 이에 관한 확인 또는 “몰”의 확인에 대한 동의 
6. 결제방법의 선택 
② “몰”이 제3자에게 구매자 개인정보를 제공?위탁할 필요가 있는 경우 실제 구매신청 시 구매자의 동의를 받아야 하며, 회원가입 시 미리 포괄적으로 동의를 받지 않습니다. 이 때 “몰”은 제공되는 개인정보 항목, 제공받는 자, 제공받는 자의 개인정보 이용 목적 및 보유?이용 기간 등을 구매자에게 명시하여야 합니다. 다만 「정보통신망이용촉진 및 정보보호 등에 관한 법률」 제25조 제1항에 의한 개인정보 처리위탁의 경우 등 관련 법령에 달리 정함이 있는 경우에는 그에 따릅니다. 

제10조 (계약의 성립) 
① “몰”은 제9조와 같은 구매신청에 대하여 다음 각 호에 해당하면 승낙하지 않을 수 있습니다. 다만, 미성년자와 계약을 체결하는 경우에는 법정대리인의동의를 얻지 못하면 미성년자 본인 또는 법정대리인이 계약을 취소할 수 있다는 내용을 고지하여야 합니다. 
1. 신청 내용에 허위, 기재누락, 오기가 있는 경우 
2. 미성년자가 담배, 주류 등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우 
3. 기타 구매신청에 승낙하는 것이 “몰” 기술상 현저히 지장이 있다고 판단하는 경우 
② “몰”의 승낙이 제12조제1항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다. 
③ “몰”의 승낙의 의사표시에는 이용자의 구매 신청에 대한 확인 및 판매가능 여부, 구매신청의 정정 취소 등에 관한 정보 등을 포함하여야 합니다. 

제11조(지급방법) “몰”에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 방법중 가용한 방법으로 할 수 있습니다. 단, “몰”은 이용자의 지급방법에 대하여 재화 등의 대금에 어떠한 명목의 수수료도 추가하여 징수할 수 없습니다. 
1. 폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체 
2. 선불카드, 직불카드, 신용카드 등의 각종 카드 결제 
3. 온라인무통장입금 
4. 전자화폐에 의한 결제 
5. 수령 시 대금지급 
6. 마일리지 등 “몰”이 지급한 포인트에 의한 결제 
7. “몰”과 계약을 맺었거나 “몰”이 인정한 상품권에 의한 결제 
8. 기타 전자적 지급 방법에 의한 대금 지급 등

제12조(수신확인통지?구매신청 변경 및 취소) 
① “몰”은 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를 합니다. 
② 수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고 “몰”은 배송 전에 이용자의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 다만 이미 대금을 지불한 경우에는 제15조의 청약철회 등에 관한 규정에 따릅니다. 

제13조(재화 등의 공급) 
① “몰”은 이용자와 재화 등의 공급시기에 관하여 별도의 약정이 없는 이상, 이용자가 청약을 한 날부터 7일 이내에 재화 등을 배송할 수 있도록 주문제작, 포장 등 기타의 필요한 조치를 취합니다. 다만, “몰”이 이미 재화 등의 대금의 전부 또는 일부를 받은 경우에는 대금의 전부 또는 일부를 받은 날부터 3영업일 이내에 조치를 취합니다. 이때 “몰”은 이용자가 재화 등의 공급 절차 및 진행 사항을 확인할 수 있도록 적절한 조치를 합니다. 
② “몰”은 이용자가 구매한 재화에 대해 배송수단, 수단별 배송비용 부담자, 수단별 배송기간 등을 명시합니다. 만약 “몰”이 약정 배송기간을 초과한 경우에는 그로 인한 이용자의 손해를 배상하여야 합니다. 다만 “몰”이 고의?과실이 없음을 입증한 경우에는 그러하지 아니합니다. 

제14조(환급) 
“몰”은 이용자가 구매신청한 재화 등이 품절 등의 사유로 인도 또는 제공을 할 수 없을 때에는 지체 없이 그 사유를 이용자에게 통지하고 사전에 재화 등의 대금을 받은 경우에는 대금을 받은 날부터 3영업일 이내에 환급하거나 환급에 필요한 조치를 취합니다. 

제15조(청약철회 등) 
① “몰”과 재화등의 구매에 관한 계약을 체결한 이용자는 「전자상거래 등에서의 소비자보호에 관한 법률」 제13조 제2항에 따른 계약내용에 관한 서면을 받은 날(그 서면을 받은 때보다 재화 등의 공급이 늦게 이루어진 경우에는 재화 등을 공급받거나 재화 등의 공급이 시작된 날을 말합니다)부터 7일 이내에는 청약의 철회를 할 수 있습니다. 다만, 청약철회에 관하여 「전자상거래 등에서의 소비자보호에 관한 법률」에 달리 정함이 있는 경우에는 동 법 규정에 따릅니다. 
② 이용자는 재화 등을 배송 받은 경우 다음 각 호의 1에 해당하는 경우에는 반품 및 교환을 할 수 없습니다. 
1. 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약철회를 할 수 있습니다) 
2. 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우 
3. 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히 감소한 경우 
4. 같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그 원본인 재화 등의 포장을 훼손한 경우 
③ 제2항제2호 내지 제4호의 경우에 “몰”이 사전에 청약철회 등이 제한되는 사실을 소비자가 쉽게 알 수 있는 곳에 명기하거나 시용상품을 제공하는 등의 조치를 하지 않았다면 이용자의 청약철회 등이 제한되지 않습니다. 
④ 이용자는 제1항 및 제2항의 규정에 불구하고 재화 등의 내용이 표시?광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화 등을 공급받은 날부터 3월 이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회 등을 할 수 있습니다.

제16조(청약철회 등의 효과) 
① “몰”은 이용자로부터 재화 등을 반환받은 경우 3영업일 이내에 이미 지급받은 재화 등의 대금을 환급합니다. 이 경우 “몰”이 이용자에게 재화등의 환급을 지연한때에는 그 지연기간에 대하여 「전자상거래 등에서의 소비자보호에 관한 법률 시행령」제21조의2에서 정하는 지연이자율(괄호 부분 삭제)을 곱하여 산정한 지연이자를 지급합니다. 
② “몰”은 위 대금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐 등의 결제수단으로 재화 등의 대금을 지급한 때에는 지체 없이 당해 결제수단을 제공한 사업자로 하여금 재화 등의 대금의 청구를 정지 또는 취소하도록 요청합니다. 
③ 청약철회 등의 경우 공급받은 재화 등의 반환에 필요한 비용은 이용자가 부담합니다. “몰”은 이용자에게 청약철회 등을 이유로 위약금 또는 손해배상을 청구하지 않습니다. 다만 재화 등의 내용이 표시?광고 내용과 다르거나 계약내용과 다르게 이행되어 청약철회 등을 하는 경우 재화 등의 반환에 필요한 비용은 “몰”이 부담합니다. 
④ 이용자가 재화 등을 제공받을 때 발송비를 부담한 경우에 “몰”은 청약철회 시 그 비용을 누가 부담하는지를 이용자가 알기 쉽도록 명확하게 표시합니다. 

제17조(개인정보보호) 
① “몰”은 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다. 
② “몰”은 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다. 
③ “몰”은 이용자의 개인정보를 수집?이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. 
④ “몰”은 수집된 개인정보를 목적외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는 이용?제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. 다만, 관련 법령에 달리 정함이 있는 경우에는 예외로 합니다. 
⑤ “몰”이 제2항과 제3항에 의해 이용자의 동의를 받아야 하는 경우에는 개인정보보호 책임자의 신원(소속, 성명 및 전화번호, 기타 연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공 관련사항(제공받은자, 제공목적 및 제공할 정보의 내용) 등 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제22조제2항이 규정한 사항을 미리명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수 있습니다. 
⑥ 이용자는 언제든지 “몰”이 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 “몰”은 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다. 이용자가 오류의 정정을 요구한 경우에는 “몰”은 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다. 
⑦ “몰”은 개인정보 보호를 위하여 이용자의 개인정보를 처리하는 자를 최소한으로 제한하여야 하며 신용카드, 은행계좌 등을 포함한 이용자의 개인정보의 분실, 도난, 유출, 동의 없는 제3자 제공, 변조 등으로 인한 이용자의 손해에 대하여 모든 책임을 집니다. 
⑧ “몰” 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이 파기합니다. 
⑨ “몰”은 개인정보의 수집?이용?제공에 관한 동의란을 미리 선택한 것으로 설정해두지 않습니다. 또한 개인정보의 수집?이용?제공에 관한 이용자의 동의거절시 제한되는 서비스를 구체적으로 명시하고, 필수수집항목이 아닌 개인정보의 수집?이용?제공에 관한 이용자의 동의 거절을 이유로 회원가입 등 서비스 제공을 제한하거나 거절하지 않습니다.

제18조(“몰“의 의무) 
① “몰”은 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 재화?용역을 제공하는데 최선을 다하여야 합니다. 
② “몰”은 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다. 
③ “몰”이 상품이나 용역에 대하여 「표시?광고의 공정화에 관한 법률」 제3조 소정의 부당한 표시?광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다. 
④ “몰”은 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다. 

제19조(회원의 ID 및 비밀번호에 대한 의무) 
① 제17조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은 회원에게 있습니다. 
② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다. 
③ 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 “몰”에 통보하고 “몰”의 안내가 있는 경우에는 그에 따라야 합니다. 

제20조(이용자의의무) 
이용자는 다음 행위를 하여서는 안 됩니다. 
1. 신청 또는 변경시 허위 내용의 등록 
2. 타인의 정보 도용 
3. “몰”에 게시된 정보의 변경 
4. “몰”이 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시 
5. “몰” 기타 제3자의 저작권 등 지적재산권에 대한 침해 
6. “몰” 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위 7. 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 몰에 공개 또는 게시하는 행위 

제21조(연결“몰”과 피연결“몰” 간의 관계) 
① 상위 “몰”과 하위 “몰”이 하이퍼링크(예: 하이퍼링크의 대상에는 문자, 그림 및 동화상등이 포함됨)방식 등으로 연결된 경우, 전자를 연결 “몰”(웹 사이트)이라고 하고 후자를 피연결 “몰”(웹사이트)이라고 합니다. 
② 연결“몰”은 피연결“몰”이 독자적으로 제공하는 재화 등에 의하여 이용자와 행하는 거래에 대해서 보증 책임을 지지 않는다는 뜻을 연결“몰”의 초기화면 또는 연결되는 시점의 팝업화면으로 명시한 경우에는 그 거래에 대한 보증 책임을 지지 않습니다.

제22조(저작권의 귀속 및 이용제한) 
① “몰“이 작성한 저작물에 대한 저작권 기타 지적재산권은 ”몰“에 귀속합니다. 
② 이용자는 “몰”을 이용함으로써 얻은 정보 중 “몰”에게 지적재산권이 귀속된 정보를 “몰”의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다. 
③ “몰”은 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.

제23조(분쟁해결) 
① “몰”은 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치?운영합니다. 
② “몰”은 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다. 
③ “몰”과 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시?도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다. 

제24조(재판권 및 준거법) 
① “몰”과 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다. 
② “몰”과 이용자 간에 제기된 전자상거래 소송에는 한국법을 적용합니다. 
부 칙(시행일) 이 약관은 년 월 일부터 시행합니다. 
`}
                </PreText>
              </Wrapper>

              <Wrapper al={`flex-start`}>
                <Label>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={checkAgree2}
                        onChange={(e) => setCheckAgree2(e.target.checked)}
                      />
                    }
                    label="이용약관에 모두 동의합니다."
                    labelPlacement="end"
                  ></FormControlLabel>
                </Label>
              </Wrapper>
            </Wrapper>

            <Wrapper margin={`20px 0`}>
              <CommonButton width={`100px`} onClick={checkAgreeHandler}>
                다음
              </CommonButton>
            </Wrapper>
          </Wrapper>
        )}

        {currentTab === 1 && (
          <Wrapper margin={`50px 0 0 0`}>
            <UlWrapper width={`auto`} al={`flex-start`}>
              <LiWrapper
                width={`100%`}
                dr={`row`}
                ju={`flex-start`}
                padding={`10px 0px`}
              >
                <Wrapper
                  width={size.width < 800 ? `100px` : `150px`}
                  minWidth={size.width < 800 ? `100px` : `150px`}
                  al={`flex-start`}
                  padding={`0px 10px`}
                >
                  이름
                </Wrapper>
                <TextInput
                  type="text"
                  width={size.width < 800 ? `250px` : `385px`}
                  {...inputName}
                />
              </LiWrapper>

              <LiWrapper
                width={`100%`}
                dr={`row`}
                ju={`flex-start`}
                padding={`10px 0px`}
              >
                <Wrapper
                  width={size.width < 800 ? `100px` : `150px`}
                  minWidth={size.width < 800 ? `100px` : `150px`}
                  al={`flex-start`}
                  padding={`0px 10px`}
                >
                  이메일
                </Wrapper>
                <TextInput
                  type="text"
                  margin={`0 10px 0 0`}
                  width={size.width < 800 ? `70px` : `120px`}
                  {...inputEmail}
                />
                @
                {selectEmailDomain.value === "직접입력" ? (
                  <TextInput
                    type="text"
                    margin={`0 0 0 10px`}
                    width={size.width < 800 ? `70px` : `120px`}
                    {...inputEmailDomain}
                  />
                ) : (
                  <Combo
                    {...selectEmailDomain}
                    margin={`0 0 0 10px`}
                    width={size.width < 800 ? `70px` : `120px`}
                  >
                    <ComboOption value="">선택</ComboOption>
                    <ComboOption value="naver.com">naver.com</ComboOption>
                    <ComboOption value="gmail.com">gmail.com</ComboOption>
                    <ComboOption value="nate.com">nate.com</ComboOption>
                    <ComboOption value="daum.net">daum.net</ComboOption>
                    <ComboOption value="직접입력">직접입력</ComboOption>
                  </Combo>
                )}
                <CommonButton
                  width={`100px`}
                  margin={`0 0 0 10px`}
                  width={size.width < 800 ? `65px` : `100px`}
                  onClick={checkEmailHandler}
                  kindOf={`white`}
                >
                  중복확인
                </CommonButton>
              </LiWrapper>

              <LiWrapper
                width={`100%`}
                dr={`row`}
                ju={`flex-start`}
                padding={`10px 0px`}
              >
                <Wrapper
                  width={size.width < 800 ? `100px` : `150px`}
                  minWidth={size.width < 800 ? `100px` : `150px`}
                  al={`flex-start`}
                  padding={`0px 10px`}
                >
                  핸드폰
                </Wrapper>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <TextInput
                    type="text"
                    width={size.width < 800 ? `45px` : `80px`}
                    margin={`0px 4px 0px 0px`}
                    maxLength="3"
                    {...inputMobile1}
                  />
                  -
                  <TextInput
                    type="text"
                    width={size.width < 800 ? `48px` : `80px`}
                    margin={`0px 4px`}
                    maxLength="4"
                    {...inputMobile2}
                  />
                  -
                  <TextInput
                    type="text"
                    width={size.width < 800 ? `48px` : `80px`}
                    margin={`0px 4px`}
                    maxLength="4"
                    {...inputMobile3}
                  />
                  <CommonButton
                    width={`100px`}
                    margin={`0 0 0 10px`}
                    width={size.width < 800 ? `65px` : `100px`}
                    onClick={checkMobileHandler}
                    kindOf={`white`}
                  >
                    중복확인
                  </CommonButton>
                </Wrapper>
              </LiWrapper>
            </UlWrapper>

            <Wrapper margin={`30px 0`}>
              <CommonButton
                width={`100px`}
                width={`100px`}
                onClick={createUserHandler}
              >
                완료
              </CommonButton>
            </Wrapper>
          </Wrapper>
        )}

        {currentTab === 2 && (
          <Wrapper margin={`50px 0 0 0 `}>
            <SubjectTitle>회원가입이 완료되었습니다! </SubjectTitle>

            <CommonButton width={`100px`} onClick={() => moveLinkHandler("/")}>
              메인으로
            </CommonButton>
          </Wrapper>
        )}
      </RsWrapper>
    </WholeWrapper>
  );
};

export default withResizeDetector(MM90Presenter);
