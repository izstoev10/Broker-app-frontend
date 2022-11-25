import React from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import GoogleMaps from "../../components/google-maps";

const Page = () => {
  return <GoogleMaps />;
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
