import storageFn from "./fsStorage";

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const areaCalculation = (x, no) => {
  const data = (parseInt(x) * 3.3058).toFixed(no >= 0 ? no : 2);

  return data && data != "NaN" ? data : 0;
};

export const areaCalculation2 = (x) => {
  const data = Math.round(x * 0.3025);

  return data && data != "NaN" ? data : 0;
};

export const resizeImage = (uploadPath, file, width, height) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();

      image.src = e.target.result;
      image.onload = async () => {
        let canvas = document.createElement("canvas");

        canvas.width = width;

        if (height) {
          canvas.height = height;
        } else {
          let ratio = image.width / width;

          canvas.height = image.height / ratio;
        }

        canvas
          .getContext("2d")
          .drawImage(image, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL(file.type || "image/png");

        const blob = dataURItoBlob(dataURL);
        const resultFile = new File([blob], file.name, {
          type: file.type || "image/png",
        });

        const path = await storageFn.uploadFile(
          uploadPath,
          decodeURI(resultFile.name),
          resultFile
        );

        const db_path = await storageFn.getSotragePath(path);

        resolve(db_path);
      };
    };
    reader.readAsDataURL(file);
  });
};

export const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);

  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};
