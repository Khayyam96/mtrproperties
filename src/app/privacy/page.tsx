import { SubscribeSection } from "@/components/Lib/Subscribe/SubscribeSection";
import PrivacyContent from "./PrivacyContent";
import PrivacyStrip from "./privacypolicy";
import { fetchAPI } from "@/utils";
import { PrivacyPolicyResponse } from "@/models/PrivacyContent.model";



export const metadata = {
  title: "Privacy Policy — MTR Properties",
};

export default async function AboutPage() {
  const privacy = await fetchAPI<PrivacyPolicyResponse>("/client/privacy-policy?lang=en");

  return (
    <div className="privacy-page">
      <PrivacyStrip />
      <PrivacyContent data={privacy} />
      <SubscribeSection />
    </div>
  );
}
