import { state, userRole } from "./useAuth";

const ROLES = {
  founder: {
    hierarchy: 1,
    label: "Founder",
  },
  owner: {
    hierarchy: 2,
    label: "Owner",
  },
  administrator: {
    hierarchy: 3,
    label: "Admin",
  },
  member: {
    hierarchy: 4,
    label: "Member",
  },
};

export const hasEditPermission = (entity) => {
  return state.organization?.slug === entity.author.organization?.slug;
};

export const hasOrganizationMemberDeletePermission = (entity) => {
  if (entity.role === "founder") {
    return false;
  }

  if (entity.role === state.user.organization.role) {
    return false;
  }

  if (
    ROLES[state.user.organization.role].hierarchy <=
    ROLES[entity.role].hierarchy
  ) {
    return true;
  }
};

export const hasInviteOrganizationMemberPermission = () => {
  return ROLES[state.user.organization.role].hierarchy <= 3;
};

export default () => {
  return {
    hasInviteOrganizationMemberPermission,
    hasOrganizationMemberDeletePermission,
    ROLES,
  };
};
