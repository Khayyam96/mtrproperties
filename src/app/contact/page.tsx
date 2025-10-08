import { fetchAPI } from "@/utils";
import ContactSection from "./ContactSection";
import "./index.scss";
import { ContactSettingsResponse } from "@/models/Contact.mode";

export const metadata = {
  title: "Contact Us — MTR Properties",
};

export default async function ContactPage() {
  const contactData = await fetchAPI<ContactSettingsResponse>("/client/settings");
  return <ContactSection contact={contactData} />;
}
