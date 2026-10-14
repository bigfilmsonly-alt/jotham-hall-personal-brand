import { ServicePageTemplate } from "@/components/service-page-template";
import { getService } from "../services-data";

export default function StrategicConsultingPage() {
  return <ServicePageTemplate service={getService("strategic-consulting")} />;
}
