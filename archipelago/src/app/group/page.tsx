import { PageHero } from "@/components/PageHero";
import { GroupClient } from "@/components/GroupClient";
import { CtaBand } from "@/components/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Group",
  description:
    "Archipelago group marine companies — CRD Marine, Finix Marine, and Phoenix Marine.",
  path: "/group",
});

export default function GroupPage() {
  return (
    <>
      <PageHero label="Group" title="Companies in the network">
        <p>Specialist marine desks alongside Archipelago’s agency coverage.</p>
      </PageHero>
      <GroupClient />
      <CtaBand />
    </>
  );
}
