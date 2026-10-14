import { ServicePageTemplate } from "@/components/service-page-template";
import { getService } from "../services-data";

export default function RevenueSystemsPage() {
  return <ServicePageTemplate service={getService("revenue-systems")} />;
}
