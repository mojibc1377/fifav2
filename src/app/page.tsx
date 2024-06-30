import { ToastProvider } from '@/components/ui/toast'; // Adjust the import according to your file structure

export default function Landing() {
  return (
    <div className="landing relative border-b-2 border-[#161e2b]">
      <div className="bg-gradient-to-b to-[#0f0c33] from-[#020c12] text-white p-6 md:p-10">
        <h1 className="text-3xl md:text-5xl font-thin mb-6 md:mb-10 sliding-div-x">Get in the Game</h1>
        <div className="flex flex-col md:flex-row justify-evenly items-center">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-thin mb-4">FIFA Masters Conference</h2>
            <p className="mb-2">23 Tem 2024 16:55 - 18:55</p>
            <p className="mb-4">Elite Convention Center, Tehran, Tehran Province, Iran</p>
            <button className="px-6 py-2 bg-[#5b6081] hover:bg-[#4c5275] text-white rounded-md">Register Now</button>
          </div>
          <img src="/images/tekkz.png" alt="Conference" className="w-full md:w-1/2 rounded-lg" />
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-[#0f0c33] to-[#161145] text-white p-6 md:p-10">
        <h2 className="text-3xl md:text-5xl font-thin mb-10 md:mb-16 sliding-div-x">Game Schedule</h2>
        <h3 className="text-xl md:text-2xl font-semibold mb-4">Tournament Format Overview</h3>
        <div className="space-y-4">
          <div className="border-t-2 border-[#161e2b] pt-6 md:pt-9">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-lg md:text-xl font-thin">South Stage</div>
              <div className="animate-pulse mt-2 md:mt-0">October 5, 2025, 14:00 GMT</div>
            </div>
            <p className="mt-2">Get ready for the action! Here is all you need to know about the upcoming tournament. Save the date and be a part of the excitement.</p>
          </div>
          <div className="border-t-2 border-[#161e2b] pt-6 md:pt-9">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-lg md:text-xl font-thin">Main Stage</div>
              <div className="animate-pulse mt-2 md:mt-0">October 5, 2025, 14:00 GMT</div>
            </div>
            <p className="mt-2">Join us at the main stage for intense matches and thrilling gameplay. Experience the adrenaline rush as the top players battle it out.</p>
          </div>
          <div className="border-t-2 border-[#161e2b] pt-6 md:pt-9">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-lg md:text-xl font-thin">North Stage</div>
              <div className="animate-pulse mt-2 md:mt-0">October 5, 2025, 14:00 GMT</div>
            </div>
            <p className="mt-2">Dont miss the action at the North Stage! Witness epic showdowns and see who will emerge victorious in this high-stakes tournament.</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#161145] to-[#0f0c33] text-white p-6 md:p-10">
        <h1 className="text-2xl md:text-4xl font-thin mb-6 md:mb-10 sliding-div-x">Watch Options</h1>
        <h2 className="text-lg md:text-2xl font-thin italic mb-6 md:mb-10">
          Choose how you want to experience the excitement of the tournament. Whether you prefer watching on the big screen, streaming from home, or joining fellow fans at a local venue, ChampsPlus has you covered.
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-10">
          <p className="text-base md:text-lg">Official Sponsors</p>
          <img src="/images/ea.png" alt="Sponsor 1" className="h-32 md:h-56" />
          <img src="/images/ea.png" alt="Sponsor 2" className="h-32 md:h-56" />
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#0f0c33] to-[#020c12] p-6 md:p-10">
        <header className="flex justify-between items-start mb-10">
          <div className="text-3xl md:text-4xl font-thin italic text-[#c5c6c7] animate-bounce">ChampsPlus+</div>
        </header>

        <main className="flex flex-col md:flex-row justify-end items-end md:justify-between md:items-start">
          <div className="text-right md:text-left mb-6 md:mb-0">
            <p className="text-[#c5c6c7]">123-456-7890</p>
            <p className="text-[#c5c6c7]">info@mysite.com</p>
            <p className="text-[#c5c6c7]">500 Terry Francine Street, 6th Floor, San Francisco, CA 94158</p>
          </div>
          <div className="text-right md:text-left">
            <h2 className="text-2xl md:text-4xl font-thin text-[#c5c6c7] mb-4">Stay informed, join our newsletter</h2>
            <input
              type="email"
              className="w-full md:w-64 p-2 mb-4 border border-purple-300 text-[#0f0c33] rounded-md"
              placeholder="mojibc1377@gmail.com"
            />
            <button className="w-full md:w-auto ml-0 md:ml-4 px-4 py-2 bg-[#5b6081] hover:bg-[#4c5275] text-white rounded-md">Subscribe</button>
            <p className="mt-2 text-[#c5c6c7]">Thank you for subscribing!</p>
          </div>
        </main>
      </div>
    </div>
  );
}
