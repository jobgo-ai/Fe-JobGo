import { state } from "./useAuth";

export const hasEditPermission = (entity) => {
  return state.user.organization === entity.author.organization;
};
