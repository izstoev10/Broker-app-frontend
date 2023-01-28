import Head from "next/head";
import { Box, Container } from "@mui/material";
import AddTenant from "../../components/tenants/add-tenant";
import { DashboardLayout } from "../../components/dashboard-layout";
import { da } from "date-fns/locale";

const Page = () => (
  <>
    <Head>
      <title>Add Tenant</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ mt: 3 }}>
          <AddTenant />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
