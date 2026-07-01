import { PageStub } from "../components/page-stub";

export const metadata = { title: "Contact - NovaOS" };

export default function ContactPage() {
  return (
    <PageStub
      eyebrow="Contact"
      title="Request access to NovaOS."
      intro="Tell us about your team and we will be in touch. The full contact experience, with a refined form, arrives next."
      hideRequestAccess
    />
  );
}
