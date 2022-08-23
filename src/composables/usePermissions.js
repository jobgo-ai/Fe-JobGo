import { state } from "./useAuth";

export const hasEditPermission = (entity) => {
  return state.organization?.slug === entity.author.organization?.slug;
};
