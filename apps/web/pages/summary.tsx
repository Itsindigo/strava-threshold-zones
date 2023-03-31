import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CenteredLoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";
import { ZonesSummary } from "../containers/ZonesSummary";
import { zonesCalculationsSchema } from "../containers/ZonesSummary/utils";
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
  const [zoneCalculationParams, setZoneCalculationParams] = useState<{
    restingHeartRate: number;
    maxHeartRate: number;
  }>();

  useEffect(() => {
    if (!f) {
      router.push("/");
      return;
    }

    const data = safeJsonParse(f);

    if (f && !data) {
      router.push({ pathname: "/", query: { malformed: true } });
      return;
    }

    const parsed = zonesCalculationsSchema.safeParse(data);

    if (parsed.success) {
      setZoneCalculationParams({
        restingHeartRate: parsed.data.restingHeartRate,
        maxHeartRate: parsed.data.maxHeartRate,
      });
    } else {
      router.push({ pathname: "/", query: { malformed: true } });
    }
  }, []);

  if (zoneCalculationParams) {
    return (
      <ZonesSummary
        restingHeartRate={zoneCalculationParams.restingHeartRate}
        maxHeartRate={zoneCalculationParams.maxHeartRate}
      />
    );
  } else {
    return <CenteredLoadingSpinner extraClasses="mt-8" />;
  }
};

export default Summary;
