import { ref } from "vue";
import { useGet } from "./useHttp";
import useAuth from "./useAuth";

const { organization } = useAuth();

const members = ref([]);

const COLLABORATORS = {
  creator: {
    description: "Administrator of the opening",
  },
  manager: {
    description:
      "Can view opening, create  and edit interviews, create, view, and edit candidates",
  },
  member: {
    description: "Can view opening, create interviews, and edit interviews",
  },
};

export default () => {
  const fetchMembers = async () => {
    const getOrganization = useGet(
      `organizations/${organization.value.slug}/users`
    );
    await getOrganization.get();
    members.value = getOrganization.data.value.users;
  };
  return {
    fetchMembers,
    members,
    COLLABORATORS,
  };
};
