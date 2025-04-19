import { PropsWithChildren } from "react";
import { Header } from "../components/basics";

export default function LandingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
