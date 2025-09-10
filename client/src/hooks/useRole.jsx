import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

export default function useRole() {
  const { user, loading } = useAuth();
  const axiosCommon = useAxiosCommon();

  const { data: role = "", isLoading } = useQuery({
    queryKey: ["user-role", user?.uid],
    enabled: !loading && !!user?.uid,
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/users/${user?.uid}`);
      return data.data.role;
    },
  });

  return { role, isLoading };
}
