import { getSiteSettings } from "@/data/settings";
import { updateSiteSettings } from "./actions";
import { TrustBadgesField } from "./TrustBadgesField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass, fieldWrapClass } from "@/components/admin/form-styles";

export const metadata = { title: "Admin: Settings" };

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-900">Site settings</h1>
      <p className="mt-1 text-stone-600">
        WhatsApp number, contact email, and the homepage trust badges. Reviews and rating are pulled live from
        Google, not managed here.
      </p>

      <form action={updateSiteSettings} className="mt-6 max-w-2xl space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className={fieldWrapClass}>
            <label className={labelClass}>WhatsApp number (digits only, country code, no +)</label>
            <input name="whatsappNumber" defaultValue={settings.whatsappNumber} required className={inputClass} />
          </div>
          <div className={fieldWrapClass}>
            <label className={labelClass}>Contact email</label>
            <input type="email" name="contactEmail" defaultValue={settings.contactEmail} required className={inputClass} />
          </div>
        </div>

        <div className={fieldWrapClass}>
          <label className={labelClass}>Trust badges (shown under the homepage hero)</label>
          <TrustBadgesField initial={settings.trustBadges} />
        </div>

        <SubmitButton>Save settings</SubmitButton>
      </form>
    </div>
  );
}
