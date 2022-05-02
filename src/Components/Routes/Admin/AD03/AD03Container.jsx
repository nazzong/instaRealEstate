import React, { useState, useEffect } from "react";
import AD03Presenter from "./AD03Presenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { toast } from "react-nextjs-toast";
import { GET_FOOTERINFO, MODIFY_FOOTERINFO } from "./AD03Queries.js";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [cheifName, setCheifName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [privacyOfficer, setPrivacyOfficer] = useState("");
  const [officeHours, setOfficeHours] = useState("");
  const [dataFlag, setDataFlag] = useState(true);

  /////////////// - USE REF- ////////////////

  ////////////// - VARIABLE- ////////////////

  ////////////// - USE QUERY- ///////////////
  const {
    data: footerInfoData,
    loading: footerInfoLoading,
    refetch: footerInfoRefetch,
  } = useQuery(GET_FOOTERINFO);

  if (!footerInfoLoading) {
    if (dataFlag) {
      setCheifName(footerInfoData.getFooterInfo.cheifName);
      setBusinessName(footerInfoData.getFooterInfo.businessName);
      setBusinessNumber(footerInfoData.getFooterInfo.businessNumber);
      setTel(footerInfoData.getFooterInfo.tel);
      setEmail(footerInfoData.getFooterInfo.email);
      setAddress(footerInfoData.getFooterInfo.address);
      setPrivacyOfficer(footerInfoData.getFooterInfo.privacyOfficer);
      setOfficeHours(footerInfoData.getFooterInfo.officeHours);
      setDataFlag(false);
    }
  }

  ///////////// - USE MUTATION- /////////////
  const [modifyFooterInfoMutation] = useMutation(MODIFY_FOOTERINFO);

  ///////////// - EVENT HANDLER- ////////////
  const infoUpdateHandler = async () => {
    const { data } = await modifyFooterInfoMutation({
      variables: {
        id: footerInfoData.getFooterInfo._id,
        cheifName,
        businessName,
        businessNumber,
        tel,
        email,
        address,
        privacyOfficer,
        officeHours,
      },
    });

    if (data.modifyFooterInfo) {
      toast.notify("FOOTER INFO UPDATE", {
        duration: 5,
        type: "info",
      });
      footerInfoRefetch();
    }
    setIsLoading(false);
  };
  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    footerInfoRefetch();
  }, []);

  useEffect(() => {
    setDataFlag(true);
  }, [currentTab]);

  return (
    <AD03Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isLoading={isLoading}
      //
      cheifName={cheifName}
      setCheifName={setCheifName}
      businessName={businessName}
      setBusinessName={setBusinessName}
      businessNumber={businessNumber}
      setBusinessNumber={setBusinessNumber}
      tel={tel}
      setTel={setTel}
      email={email}
      setEmail={setEmail}
      address={address}
      setAddress={setAddress}
      privacyOfficer={privacyOfficer}
      setPrivacyOfficer={setPrivacyOfficer}
      officeHours={officeHours}
      setOfficeHours={setOfficeHours}
      //
      infoUpdateHandler={infoUpdateHandler}
    />
  );
};
