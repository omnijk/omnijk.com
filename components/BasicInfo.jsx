export default function BasisInfo() {
  return (
    <div className="w-full rounded-lg shadow-[0_0px_1.2px_rgb(140,140,140)] py-6 px-4">
      <h2 className="mb-6 ml-2 text-lg text-green-200 opacity-60">
        💡 About Me
      </h2>
      <ul className="flex flex-col gap-5 pl-6 text-sm list-disc">
        <li>
          👋 You can call me <span className="font-bold">omnijk</span>.{" "}
          {/* <span className="font-bold">omnijk</span> or{" "}
          <span className="font-bold">智昊</span>. */}
        </li>

        <li>
          🌎 Current Location:{" "}
          <a
            className="font-bold"
            href="https://en.wikipedia.org/wiki/Xi%27an"
            target="_blank"
          >
            Xi&#39;an, China
          </a>
          .
        </li>
        <li>
          ✈️ Lived in{" "}
          <a
            className="font-bold"
            href="https://en.wikipedia.org/wiki/Henan"
            target="_blank"
          >
            Henan
          </a>
          ,{" "}
          <a
            className="font-bold"
            href="https://en.wikipedia.org/wiki/Shanghai"
            target="_blank"
          >
            Shanghai
          </a>
          {" "}
          
           in the past.
        </li>
      </ul>
    </div>
  );
}
