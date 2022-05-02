import React from "react";
import { withApollo } from "../../lib/apollo";
import A_Login from "../../src/Components/Routes/Layouts/A_Login";
import AdminLayout from "../../src/Components/Routes/Layouts/AdminLayout";
import { useRouter } from "next/router";
import { toast } from "react-nextjs-toast";

const AdminLogin = () => {
  return (
    <AdminLayout title={`로그인 | 인스타부동산 관리자`} isSide={false}>
      <A_Login />
    </AdminLayout>
  );
};

export default withApollo(AdminLogin);
