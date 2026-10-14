import { ServicePageTemplate } from "@/components/service-page-template";
import { getService } from "../services-data";

export default function AIAutomationPage() {
  return <ServicePageTemplate service={getService("ai-automation")} />;
}
