import { ref } from "vue";
import { useGet } from "./useHttp";
import useAuth from "./useAuth";

const { organization } = useAuth();

const members = ref([]);

const COLLABORATORS = {
  creator: {
    label: "Creator",
    description: "Administrator of the opening",
    hierarchy: 1,
  },
  owner: {
    label: "Hiring manager",
    description:
      "Can view opening, create  and edit interviews, create, view, and edit candidates",
    hierarchy: 2,
  },
  member: {
    label: "Interview editor",
    description: "Can view opening, create interviews, and edit interviews",
    hierarchy: 3,
  },
};

export default () => {
  const fetchMembers = async (query = "") => {
    const getOrganization = useGet(
      `organizations/${organization.value.slug}/users${query}`
    );
    await getOrganization.get();
    members.value = getOrganization.data.value.users;
  };

  const fetchCompanyInfo=async(companyInfo)=>{
    try {

      const response = await fetch(`https://api.brandfetch.io/v2/brands/dowjones.com`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + '2pDrAAJLOmYKWfnkhbzsBnW4f0wBZyK307ruOFiNb4Y=',
        },
  
      });
      const data = await response.json(); // or response.text() for non-JSON responses
    // Work with the JSON data
    companyInfo.value=data
    console.log(data);
    } catch (error) {
      console.log("error", error)
    }
  }
  return {
    fetchMembers,
    fetchCompanyInfo,
    members,
    COLLABORATORS,
  };
};
