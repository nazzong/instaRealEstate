import React, { useEffect } from "react";
import { withApollo } from "../../lib/apollo";
import AD09 from "../../src/Components/Routes/Admin/AD09";
import AdminLayout from "../../src/Components/Routes/Layouts/AdminLayout";
import { useRouter } from "next/router";
import { toast } from "react-nextjs-toast";

const EventBoardManagement = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== `undefined`) {
      if (!sessionStorage.getItem("DLIUQUXMSUDLQJXS")) {
        toast.notify("접근 권한이 없습니다.", {
          duration: 5,
          type: "error",
        });

        router.push("/admin");
      }
    }
  }, []);

  return (
    <AdminLayout title={`이벤트 등록 | 인스타부동산 관리자`}>
      <AD09 />
    </AdminLayout>
  );
};

export default withApollo(EventBoardManagement);
