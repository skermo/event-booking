export default function AboutUs() {
  return (
    <div>
      <div className="flex w-full items-center p-16">
        <div className="w-1/3 font-semibold text-xl">
          <p>Events bring people together.</p>
          <p>We bring events to you.</p>
        </div>
        <div className="w-2/3">
          <h1 className="text-5xl font-semibold mb-8">About Us</h1>
          <div className="flex flex-col gap-2">
            <p>
              At Bookit, we believe that the best memories are made at events —
              whether it’s the thrill of a live concert, the excitement of a
              sports match, or the inspiration from a conference or workshop.
              Our mission is to make discovering, booking, and enjoying events
              as simple and enjoyable as possible.
            </p>
            <p>
              We created Bookit with one goal in mind: to connect people with
              experiences that truly matter. With just a few clicks, you can
              browse upcoming events, explore details, and secure your tickets —
              all in one place. No more endless searching, no more complicated
              booking processes.
            </p>
            <p>
              What makes us different is our focus on user experience and
              accessibility. We’re not just a booking tool; we’re a platform
              that brings people together. Whether you’re a music lover, a
              culture enthusiast, or someone looking to try something new,
              Bookit is your trusted companion for finding what’s happening
              around you.
            </p>
            <p>
              At the heart of our platform is a simple idea: events bring people
              closer together. They create stories, build friendships, and spark
              inspiration. And we’re here to make sure you never miss the chance
              to be part of those moments.
            </p>
            <p>
              Join us, explore what’s out there, and let’s make your next event
              unforgettable.
            </p>
          </div>
        </div>
      </div>

      <img src="/images/city.jpeg" alt="City" className="w-full" />
    </div>
  );
}
