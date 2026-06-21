import ko from "./messages/ko.json";

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof ko;
  }
}
