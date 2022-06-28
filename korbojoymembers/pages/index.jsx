import { checkCookies, setCookies } from "cookies-next";
import { useRouter } from "next/router";

function Index(props) {
  const router = useRouter();
  const token1 = router.query.token;
  setCookies("token", token1);
  const checkToken = checkCookies("token");

  const API_USER = process.env.API_USER;
  const API_MAIN = process.env.API_USER;
  if (checkToken == true) {
    window.location.href = API_USER + "/home";
  } else {
    window.location.href = API_MAIN;
  }
  return <div>index</div>;
}

export default Index;