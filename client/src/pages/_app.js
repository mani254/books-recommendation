import "@/styles/globals.css";
// import "@/styles/fromComponents.css";

import BaseLayout from "@/components/baseLayout";

export default function MyApp({ Component, pageProps }) {
   const noNavbarRoutes = ["/login", "/register"];
   const isLayoutNeeded = !noNavbarRoutes.includes(pageProps.router?.pathname);

   return isLayoutNeeded ? (
      <BaseLayout>
         <Component {...pageProps} />
      </BaseLayout>
   ) : (
      <Component {...pageProps} />
   );
}
