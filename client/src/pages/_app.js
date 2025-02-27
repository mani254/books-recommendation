import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import BaseLayout from "@/components/baseLayout";

axios.defaults.withCredentials = true;

export default function MyApp({ Component, pageProps }) {
   const router = useRouter();
   const noNavbarRoutes = ["/login", "/register"];
   const isLayoutNeeded = !noNavbarRoutes.includes(router.pathname);
   const [isAuthChecked, setIsAuthChecked] = useState(false);

   useEffect(() => {
      const checkAuth = async () => {
         const authToken = localStorage.getItem("authToken");

         if (authToken) {
            try {
               const res = await axios.post("http://localhost:8080/api/users/initial", {}, {
                  headers: { Authorization: `Bearer ${authToken}` }
               });

               if (res.data.success) {
                  localStorage.setItem("authToken", res.data.authToken);
                  localStorage.setItem("isAdmin", res.data.isAdmin);
               } else {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("isAdmin");
                  router.push("/login");
               }
            } catch (error) {
               console.error("Initial login failed:", error);
               localStorage.removeItem("authToken");
               localStorage.removeItem("isAdmin");
               router.push("/login");
            }
         } else {
            router.push("/login");
         }

         setIsAuthChecked(true);
      };

      checkAuth();
   }, []);

   if (!isAuthChecked) return <div>Loading...</div>;

   return isLayoutNeeded ? (
      <BaseLayout>
         <Component {...pageProps} />
      </BaseLayout>
   ) : (
      <Component {...pageProps} />
   );
}
