import CalibreForm from "@/components/CalibreForm";
import axios from "axios";

const authAxios = axios.create({
  baseURL: "https://calibrecleaning-sandbox.launch27.com/v1",
  headers: {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
});

async function getServices() {
  const response = await authAxios.get("/booking/services");
  return response.data;
}

export default async function Home() {
  const services = await getServices();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CalibreForm services={services} />
    </main>
  );
}
