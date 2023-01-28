import Head from "next/head";
import { Box, Container } from "@mui/material";
import Tenants from "../../components/tenants/tenants-list";
import { DashboardLayout } from "../../components/dashboard-layout";
import { da } from "date-fns/locale";

const Page = () => (
  <>
    <Head>
      <title>Tenants</title>
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
          <Tenants />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
