import { buildSearchIndex } from "@baseline/core";
import type { HousingType, HousingAgencyId, BaseId, VillageId } from "@baseline/core";

const searchIndex = buildSearchIndex();

type UserContext = {
  housingType: HousingType;
  housingAgency: HousingAgencyId | null;
  baseId: BaseId | null;
  villageId: VillageId | null;
};

export function buildAnswerContext(query: string, userCtx: UserContext): string {
  // Find relevant search results
  const q = query.toLowerCase();
  const matches = searchIndex
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    )
    .slice(0, 8);

  const contentContext = matches.length > 0
    ? `Relevant BaseLine content:\n${matches.map((m) => `- ${m.title} (${m.category}): ${m.summary}`).join("\n")}`
    : "No specific BaseLine content found for this query.";

  const userProfile = [
    `Housing type: ${userCtx.housingType ?? "unknown"}`,
    userCtx.housingAgency ? `Housing agency: ${userCtx.housingAgency}` : null,
    userCtx.baseId ? `Base: ${userCtx.baseId}` : null,
    userCtx.villageId ? `Village: ${userCtx.villageId}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `${contentContext}\n\nUser profile:\n${userProfile}`;
}