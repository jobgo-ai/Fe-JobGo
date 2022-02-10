import { state } from "./useAuth";

export const hasEditPermission = (entity) => {
  return state.user.organization?.slug === entity.author.organization?.slug;
};
