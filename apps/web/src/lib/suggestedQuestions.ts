import type { HousingType, HousingAgencyId, BaseId, VillageId } from "@baseline/core";

type UserContext = {
  housingType: HousingType;
  housingAgency: HousingAgencyId | null;
  baseId: BaseId | null;
  villageId: VillageId | null;
};

export function getSuggestedQuestions(ctx: UserContext): string[] {
  if (ctx.housingType === "temporary" || !ctx.housingType) {
    return [
      "What should I do first after arriving in Okinawa?",
      "How do I find a housing agency?",
      "What documents do I need to bring to Okinawa?",
      "How do I get a SOFA driver's license?",
    ];
  }

  if (ctx.housingType === "on-base") {
    return [
      "How do I set up internet on base?",
      "Where can I get a Japanese SIM card?",
      "How do I get my SOFA driver's license?",
      "What's near my base?",
    ];
  }

  // Off-base
  const questions: string[] = [];

  if (ctx.housingAgency) {
    questions.push(`When is my trash pickup day?`);
    questions.push(`What trash bags do I need?`);
  } else {
    questions.push("What trash bags do I need?");
    questions.push("How do I sort my recycling?");
  }

  questions.push("How do I set up electricity and water?");
  questions.push("How do I get a Japanese phone plan?");

  return questions;
}