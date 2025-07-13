import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Direct Rabta Portal",
  version: packageJson.version,
  copyright: `© ${currentYear}, Direct Rabta Admin.`,
  meta: {
    title: "Direct Rabta Management Portal ",
    description:
      "DirectRaabta is a fan engagement platform that connects fans with their favorite celebrities through voice messages and preset text replies. The admin portal enables full control over user management, celebrity profiles, subscription plans, payments, and message moderation—all in one place.",
       icons: {
    icon: "/favicon.ico", 
  },
  },
};
