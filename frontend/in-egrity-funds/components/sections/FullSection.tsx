interface FullSectionProps {
  content: {
    paragraph1: string;
    paragraph2: string;
    header: string;
    headerHighlight: string;
  };
}

const FullSection: React.FC<FullSectionProps> = ({ content }) => {
  return (
    <div className="relative flex min-h-[250px] max-w-full flex-col items-center justify-center overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28">
      <div className="mx-auto flex h-auto w-[90%] max-w-[1800px] flex-col items-center justify-center gap-y-9">
        <div className="flex flex-col items-start justify-between gap-y-6 md:flex-row md:gap-y-0">
          <h2 className="mx-2 text-4xl font-black leading-7 sm:text-5xl lg:leading-tight xl:text-6xl">
            {content.header}
            <br />
            <span className="webkit-text-fill-color relative inline-block bg-span-img bg-cover bg-clip-text bg-center saturate-150">
              {content.headerHighlight}
            </span>
            <br />
          </h2>
          <p className="ml-2 text-sm font-normal text-gray-800 sm:my-0 sm:w-[80%] md:my-2 md:ml-6 md:w-[90%] lg:ml-8 lg:text-xl xl:ml-10 xl:text-2xl 2xl:ml-12">
            {content.paragraph1} <br />
            <br />
            {content.paragraph2} <br />
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullSection;
