import { ServicePageTemplate } from "@/components/service-page-template";
import { getService } from "../services-data";

export default function SystemsArchitecturePage() {
  return <ServicePageTemplate service={getService("systems-architecture")} />;
}
