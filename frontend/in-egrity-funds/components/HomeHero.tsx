import ClientImage from './ClientImage';

const HomeHero = () => {
  return (
    <div className='relative m-0 flex min-h-[100vh] flex-col items-center justify-center px-4 text-center 1300:min-h-screen'>
      <ClientImage
        src='hero-abstract'
        alt='hero image abstract'
        width={1920} // Specify the width of the original image
        height={1080} // Specify the height of the original image
        sizes='(max-width: 768px) 90vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 50vw'
        className='absolute left-0 top-0 h-full w-full object-cover'
      />

      <div className='absolute left-0 top-0 h-full w-full bg-black opacity-50'></div>

      {/* Content */}
      <div className='relative z-10 mt-[-20vh] flex flex-col items-center justify-center md:mt-[-10vh]'>
        <div className='overflow-hidden'>
          <div className='relative overflow-hidden'>
            <span className='block lg:animate-pocketReveal'>
              <h1 className='text-4xl font-black uppercase leading-tight tracking-tight text-white delay-100 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'>
                Budget Smarter
              </h1>
            </span>
          </div>
          <div className='relative mt-2 overflow-hidden'>
            <span className='block delay-150 lg:animate-pocketReveal'>
              <h1 className='text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'>
                Save More
              </h1>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
