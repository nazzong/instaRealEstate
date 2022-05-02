import React, { useState, useEffect, useRef } from "react";
import AD12Presenter from "./AD12Presenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { toast } from "react-nextjs-toast";
import { GET_ESTATE, MODIFY_ESTATE } from "./AD12Queries.js";
import { resizeImage } from "../../../../commonUtils";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [location, setLocation] = useState("");
  const [tel, setTel] = useState("");
  const [fax, setFax] = useState("");
  const [description, setDescription] = useState("");
  const [managerRank, setManagerRank] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerTel, setManagerTel] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerThumbnail, setManagerThumbnail] = useState("");
  const [managerFile, setManagerFile] = useState(null);

  const [dataFlag, setDataFlag] = useState(true);

  /////////////// - USE REF- ////////////////
  const fileRef = useRef();

  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////
  const {
    data: estateData,
    loading: estateLoading,
    refetch: estateRefetch,
  } = useQuery(GET_ESTATE);

  if (!estateLoading) {
    if (dataFlag) {
      setName(estateData.getEstate.name);
      setAddress(estateData.getEstate.address);
      setDetailAddress(estateData.getEstate.detailAddress);
      setLocation(estateData.getEstate.location);
      setTel(estateData.getEstate.tel);
      setFax(estateData.getEstate.fax);
      setDescription(estateData.getEstate.description);
      setManagerRank(estateData.getEstate.managerRank);
      setManagerName(estateData.getEstate.managerName);
      setManagerTel(estateData.getEstate.managerTel);
      setManagerEmail(estateData.getEstate.managerEmail);
      setManagerThumbnail(estateData.getEstate.managerThumbnail);
      setDataFlag(false);
    }
  }

  ///////////// - USE MUTATION- /////////////
  const [modifyEstateMutation] = useMutation(MODIFY_ESTATE);

  ///////////// - EVENT HANDLER- ////////////
  const fileChangeHandler = async (e) => {
    setIsLoading(true);

    const file = e.target.files[0];

    if (!file) {
      setIsLoading(false);
      return;
    }

    const db_path = await resizeImage(
      "INSTA-ESTATE/uploads/estate",
      file,
      120,
      120
    );

    setManagerThumbnail(db_path);

    setIsLoading(false);
  };

  const infoUpdateHandler = async () => {
    if (!name || name.trim() === "") {
      toast.notify("상호명을 입력해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (!managerThumbnail || managerThumbnail.trim() === "") {
      toast.notify("담당자 사진을 등록해주세요.", {
        duration: 5,
        type: "error",
      });
      return;
    }

    if (isLoading) {
      toast.notify("사진을 업로드하고 있습니다. 잠시만 기다려주세요.", {
        duration: 5,
        type: "info",
      });
      return;
    }

    const { data } = await modifyEstateMutation({
      variables: {
        id: estateData.getEstate._id,
        name,
        address,
        detailAddress,
        location,
        tel,
        fax,
        description,
        managerRank,
        managerName,
        managerTel,
        managerEmail,
        managerThumbnail,
      },
    });

    if (data.modifyEstate) {
      toast.notify("INFO UPDATE", {
        duration: 5,
        type: "info",
      });
      estateRefetch();
    }
    setIsLoading(false);
  };
  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    estateRefetch();
  }, []);

  useEffect(() => {
    setDataFlag(true);
  }, [currentTab]);

  return (
    <AD12Presenter
      fileRef={fileRef}
      //
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      //
      name={name}
      setName={setName}
      address={address}
      setAddress={setAddress}
      detailAddress={detailAddress}
      setDetailAddress={setDetailAddress}
      location={location}
      setLocation={setLocation}
      tel={tel}
      setTel={setTel}
      fax={fax}
      setFax={setFax}
      description={description}
      setDescription={setDescription}
      managerRank={managerRank}
      setManagerRank={setManagerRank}
      managerName={managerName}
      setManagerName={setManagerName}
      managerTel={managerTel}
      setManagerTel={setManagerTel}
      managerEmail={managerEmail}
      setManagerEmail={setManagerEmail}
      managerThumbnail={managerThumbnail}
      setManagerThumbnail={setManagerThumbnail}
      //
      fileChangeHandler={fileChangeHandler}
      infoUpdateHandler={infoUpdateHandler}
    />
  );
};
