import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ZonesSummary } from "../containers/ZonesSummary";
import { safeJsonParse } from "../utils";

export function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      f: context.query?.f ?? null,
    },
  };
}

interface IProps {
  f?: string;
}

const Summary = ({ f }: IProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!f) {
      router.push("/");
    } else if (f && !safeJsonParse(f)) {
      router.push({ pathname: "/", query: { malformed: true } });
    }
  }, []);

  return <ZonesSummary />;
};

export default Summary;
