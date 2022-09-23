import { ref } from "vue";
import { useGet } from "./useHttp";
import useAuth from "./useAuth";

const { organization } = useAuth();

const members = ref([]);

const COLLABORATORS = {
  creator: {},
  manager: {},
  member: {},
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
  };
};
