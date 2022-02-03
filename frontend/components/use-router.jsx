import { useRouter } from "next/router";

export const useParams = () => {
  const router = useRouter();
  return router.query;
};

export const useHistory = () => {
  const router = useRouter();
  return router;
};
export const useLocation = () => {
  const router = useRouter();
  return router;
};
