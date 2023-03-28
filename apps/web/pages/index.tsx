import Head from "next/head";
import Button from "../components/Button/Button";
import Emoji from "../components/Emoji/Emoji";
import ArrowRight from "../components/Icons/ArrowRight";

export default function Home() {
  return (
    <div className="h-screen">
      <Head>
        <title>HR Threshold Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen flex flex-col justify-between">
        <div className="mx-auto max-w-1xl pb-4 pt-8 px-4">
          <h1
            className="
            font-inter font-extrabold italic
            text-3xl text-center
            bg-clip-text bg-gradient-to-r text-transparent from-yellows-200 to-teal-400"
          >
            Heart Rate{" "}
            <p>
              Zone Calculator <Emoji name="bolt" />
            </p>
          </h1>
          <p className="text-sm text-gray-200 text-center">
            Train Smarter with Heart Rate Threshold Zones
          </p>
          <div className="my-8">
            <p className="font-sans text-white-600 mb-4">
              Heart rate threshold zones are specific ranges of heart rate that
              correspond to different levels of exertion. These zones are used
              in fitness training to help athletes and fitness enthusiasts
              optimize their workouts and achieve their fitness goals. By
              monitoring your heart rate and training within these zones, you
              can ensure that you are working out at the right intensity to
              improve your fitness, without pushing yourself too hard and
              risking injury or burnout. Each threshold zone has its own
              benefits and uses, and can be customized to your individual
              fitness level and goals.
            </p>
          </div>
        </div>
        <div className="flex items-end justify-center mb-16">
          <Button
            variant="primary"
            className="py-2 px-2 font-semibold shadow-md inline-flex"
          >
            Calculate Your Zones {"   "}
            <span className="px-2 font-bold">
              <ArrowRight />
            </span>
          </Button>
        </div>
      </main>
    </div>
  );
}
