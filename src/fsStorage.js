import storageRef from "./firebase";
import { resizeImage } from "./commonUtils";

/** 파이어스토리지 URL을 기준으로 하여 downloadPath를 가져온다 */
//////////////////////////////////////////////////////////////////////////////////////
//    [📂]PARAMETERS : path                                                 //////////
//    [📂]PARAM DESC : What Want Get FileURL In Firebase Storage            //////////
//                                                                          //////////
//    [📂]HOW TO USE                                                        //////////
//    import storageFn from "../fsStorage";                                 //////////
//    await storageFn.getSotragePath("images/popup.jpg");                   //////////
//////////////////////////////////////////////////////////////////////////////////////
const getSotragePath = async (path) => {
  const temp = await storageRef.child(path);
  const tempPath = await temp.getDownloadURL();

  return tempPath;
};

/** 업로드위치, 파일명과 파일을 받아 실제 파일을 업로드 한다. */
//////////////////////////////////////////////////////////////////////////////////////
//    [📂]PARAMETERS : path, uploadFileName, uploadFile                     //////////
//    [📂]PARAM DESC : {                                                    //////////
//                          path            : Set Upload Directory          //////////
//                          uploadFileName  : Upload File Original Name     //////////
//                          uploadFile      : Upload File                   //////////
//                     }                                                    //////////
//                                                                          //////////
//    [📂]HOW TO USE                                                        //////////
//      const file = this.state.file;                                       //////////
//      const filename = this.state.filename;                               //////////
//                                                                          //////////
//      const uploadPath = await storageFn.uploadFile(                      //////////
//          "uploads/test",                                                 //////////
//          filename,                                                       //////////
//          file                                                            //////////
//       );                                                                 //////////
//      const filePath = await storageFn.getSotragePath(uploadPath);        //////////
//////////////////////////////////////////////////////////////////////////////////////
const uploadFile = async (path, uploadFileName, uploadFile) => {
  const d = new Date();

  let year = d.getFullYear() + "";
  let month = d.getMonth() + 1 + "";
  let date = d.getDate() + "";
  let hour = d.getHours() + "";
  let min = d.getMinutes() + "";
  let sec = d.getSeconds() + "";

  const resultTime = year + month + date + hour + min + sec;

  const filename = resultTime + uploadFileName;
  // const filename = uploadFileName;

  try {
    await storageRef.child(`${path}/${filename}`).put(uploadFile);
  } catch (e) {
    console.log(e);
  }

  return `${path}/${filename}`;
};

const downloadFile = async (path, filename) => {
  return new Promise(async (resolve, reject) => {
    let fileName = filename;

    if (!fileName) {
      fileName = path.split("?")[0];
      fileName = fileName.substring(
        fileName.lastIndexOf("%2F") + 3,
        fileName.length
      );
    }

    const blob = await fetch(path).then((r) => r.blob());

    const file = new File([blob], decodeURI(fileName));

    const db_path = await resizeImage(
      "INSTA-ESTATE/uploads/productDetail__v2",
      file,
      500
    );

    resolve(db_path);

    // const element = document.createElement("a");
    // element.href = URL.createObjectURL(file);
    // element.download = fileName;
    // element.click();
  });
};

/** 파일경로와 파일명을 받아 파일을 삭제한다. */
//////////////////////////////////////////////////////////////////////////////////////
//    [📂]PARAMETERS : path, filename                                       //////////
//    [📂]PARAM DESC : {                                                    //////////
//                          path            : Set Upload Directory          //////////
//                          filename        : Delete Filename               //////////
//                     }                                                    //////////
//                                                                          //////////
//    [📂]PARAMETERS : fullPath                                             //////////
//    [📂]PARAM DESC : {                                                    //////////
//                          fullPath       :  Directory And Fileanme        //////////
//                     }                                                    //////////
//    [📂]HOW TO USE                                                        //////////
//      const resultCode = await storageFn.deleteFile(                      //////////
//          "uploads/test",                                                 //////////
//          "문서2222.pdf"                                                   //////////
//      );                                                                  //////////
//////////////////////////////////////////////////////////////////////////////////////
const deleteFile = async (path, filename) => {
  const fullPath = `${path}/${filename}`;

  let resultCode = 0;

  try {
    await storageRef.child(fullPath).delete();
    resultCode = 1;
  } catch (e) {
    console.log(e);
  }

  return resultCode;
};

const storageFn = {
  getSotragePath,
  uploadFile,
  downloadFile,
  deleteFile,
};

export default storageFn;
