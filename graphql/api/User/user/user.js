import { CURRENT_TIME } from "../../../../utils/commonUtils";
import User from "../../../models/User";
import nodemailer from "nodemailer";
import smtpPool from "nodemailer-smtp-pool";

const smtpTransport = nodemailer.createTransport(
  smtpPool({
    service: "Gmail",
    host: "localhost",
    port: "465",
    tls: {
      rejectUnauthorize: false,
    },

    auth: {
      user: process.env["SMTP_AUTH_USER"],
      pass: process.env["SMTP_AUTH_PASS"],
    },
    maxConnections: 5,
    maxMessages: 10,
  })
);

const popbill = require("popbill");

popbill.config({
  LinkID: process.env["POPBILL_LINKID"],

  SecretKey: process.env["POPBILL_SECRETKEY"],

  // 연동환경 설정값, 개발용(true), 상업용(false)
  IsTest: false,

  // 인증토큰 IP제한기능 사용여부, 권장(true)
  IPRestrictOnOff: true,

  // 인증토큰정보 로컬서버 시간 사용여부
  UseLocalTimeYN: true,

  defaultPopbillExceptionorHandler: function (Error) {
    console.log("Error Occur : [" + Error.code + "] " + Error.message);
  },
});

const messageService = popbill.MessageService();
const kakaoService = popbill.KakaoService();

export default {
  Query: {
    getUser: async (_, args) => {
      try {
        const result = await User.find({
          isDelete: false,
        }).sort({
          createdAt: -1,
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getUserSearch: async (_, args) => {
      const { searchValue } = args;

      try {
        const result = await User.find({
          $or: [
            { name: { $regex: `.*${searchValue}.*` } },
            { email: { $regex: `.*${searchValue}.*` } },
            { mobile: { $regex: `.*${searchValue}.*` } },
          ],

          isDelete: false,
        }).sort({
          createdAt: -1,
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getUserByEmail: async (_, args) => {
      const { email } = args;

      try {
        const result = await User.findOne({
          email,
        });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },

    getUserByMobile: async (_, args) => {
      const { mobile } = args;

      try {
        const result = await User.findOne({
          mobile,
        });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      const { email, name, mobile } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await User.create({
          email,
          name,
          mobile,
          createdAt: current,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteUser: async (_, args) => {
      const { id } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await User.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              isDelete: true,
              deletedAt: current,
            },
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    sendUserMessage: async (_, args) => {
      const { user, type, text } = args;

      try {
        user.map(async (id) => {
          const result = await User.findOne({
            _id: id,
          });

          if (type === "이메일") {
            let mailOpt = {
              from: "insta@insta.com",
              to: result.email,
              subject: `[인스타부동산] 💌  회원님에게 새로운 소식이 도착했습니다.`,
              html: text,
            };

            smtpTransport.sendMail(mailOpt, function (err, info) {
              if (err) {
                console.error("Send Mail error : ", err);
                //smtpTransport.close();
              } else {
                console.log("Message sent : ", info);
                //smtpTransport.close();
              }
            });
          } else if (type === "카카오톡") {
            // 팝빌회원 사업자번호, '-' 제외 10자리
            const corpNum = process.env["POPBILL_CORPNUM"];

            // 알림톡 템플릿코드
            // 승인된 알림톡 템플릿 코드는 ListATStemplate API, GetATSTemplateMgtURL API, 혹은 팝빌사이트에서 확인이 가능합니다.
            const templateCode = "020120000085";

            // 발신번호 (팝빌에 등록된 발신번호만 이용가능)
            const snd = "02-332-1978";

            // 알림톡 내용 (최대 1000자)
            let content = "[인스타부동산]\n";
            content += "안녕하세요^^\n";
            content += "회원가입 혜택으로 A급 매물정보를 안내해드립니다.\n";
            content += text.replace(/<br \/>/g, "\n");

            // 대체문자 내용 (최대 2000byte)
            const altContent = content;

            // 대체문자 유형 [공백-미전송, C-알림톡내용, A-대체문자내용]
            const altSendType = "A";

            // 예약일시 (작성일시 : yyyyMMddHHmmss)
            const sndDT = "";

            // 수신번호
            const receiver = result.mobile.replace(/-/g, "");

            // 수신자 이름
            const receiverName = result.name;

            // 팝빌회원 아이디
            const UserID = process.env["POPBILL_USERID"];

            // 전송요청번호
            // 파트너가 전송 건에 대해 관리번호를 구성하여 관리하는 경우 사용.
            // 1~36자리로 구성. 영문, 숫자, 하이픈(-), 언더바(_)를 조합하여 팝빌 회원별로 중복되지 않도록 할당.
            const requestNum = "";

            // 알림톡 버튼정보를 템플릿 신청시 기재한 버튼정보와 동일하게 전송하는 경우 btns를 null 처리.
            const btns = null;

            // 알림톡 버튼 URL에 #{템플릿변수}를 기재한경우 템플릿변수 영역을 변경하여 버튼정보 구성
            // const btns = [
            //     {
            //         n: '템플릿 안내',               //버튼명
            //         t: 'WL',                      //버튼유형 [WL-웹링크, AL-앱링크, MD-메시지전달, BK-봇키워드]
            //         u1: 'https://www.popbill.com', //[앱링크-Android, 웹링크-Mobile]
            //         u2: 'http://www.popbill.com'  //[앱링크-IOS, 웹링크-PC URL]
            //     }
            // ];

            kakaoService.sendATS_one(
              corpNum,
              templateCode,
              snd,
              content,
              altContent,
              altSendType,
              sndDT,
              receiver,
              receiverName,
              UserID,
              requestNum,
              btns,
              (receiptNum) => {
                console.log("SEND KAKAO RESULT :: " + receiptNum);
              },
              (Error) => {
                console.log(
                  "SEND KAKAO ERROR :: [" + Error.code + "] " + Error.message
                );
              }
            );
          } else if (type === "SMS") {
            const corpNum = process.env["POPBILL_CORPNUM"];

            // 발신번호
            const sendNum = "023321978";

            // 발신자명하여 관리하는 경우 사용.
            // 1~36자리로 구성. 영문, 숫자, 하이픈(-
            const sendName = "인스타부동산";

            // 수신번호
            const receiveNum = result.mobile.replace(/-/g, "");

            // 수신자명
            const receiveName = result.name;

            // 메시지 내용, 90Byte 초과시 길이가 조정되어 전송
            const content = text.replace(/<br \/>/g, "\n");

            // 예약전송일시(yyyyMMddHHmmss), 미기재시 즉시전송
            const reserveDT = "";

            // 광고문자 전송여부
            const adsYN = false;

            // 전송요청번호
            // 파트너가 전송 건에 대해 관리번호를 구성), 언더바(_)를 조합하여 팝빌 회원별로 중복되지 않도록 할당.
            const requestNum = "";

            messageService.sendSMS(
              corpNum,
              sendNum,
              receiveNum,
              receiveName,
              content,
              reserveDT,
              adsYN,
              sendName,
              requestNum,
              (receiptNum) => {
                console.log("SEND SMS RESULT :: " + receiptNum);
              },
              (Error) => {
                console.log(
                  "SEND SMS ERROR :: [" + Error.code + "] " + Error.message
                );
              }
            );
          }
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
