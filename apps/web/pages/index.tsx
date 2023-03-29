import Head from "next/head";
import Emoji from "../components/Emoji/Emoji";
import { ZonesWizard } from "../containers/ZonesWizard";

export default function Home() {
  return (
    <div className="h-screen">
      <Head>
        <title>HR Threshold Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen flex flex-col mx-auto pb-4 pt-8 px-4">
        <div className="flex flex-col my-8">
          <h1
            className="
            font-inter font-extrabold italic
            text-3xl text-center
            bg-clip-text bg-gradient-to-r text-transparent from-yellows-200 to-teal-400
          "
          >
            Heart Rate{" "}
            <p>
              Zone Calculator <Emoji name="bolt" />
            </p>
          </h1>
          <p className="text-sm text-gray-200 text-center">
            Train Smarter with Heart Rate Threshold Zones
          </p>
        </div>
        <ZonesWizard />
      </main>
    </div>
  );
}
