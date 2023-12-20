import React from "react"
import { useState } from "react"
import headerImg from "@images/header-img.png"
import infoImg1 from "@images/infographic-1.png"
import infoImg2 from "@images/infographic-2.png"
import infoImg3 from "@images/infographic-3.png"
import screenShot1 from "@images/screenshot-1.png"
import screenShot2 from "@images/screenshot-2.png"
import screenShot3 from "@images/screenshot-3.png"
import user from "@images/user.svg"
import testUser from "@images/signup-pic.png"
import logo from "@images/safeherit_logo.svg"
import homeBg from "@images/home-bg.png"
import { useNavigate } from "react-router-dom"

export function Home() {
  const navigate = useNavigate()

  // eslint-disable-next-line react/jsx-key
  const slides = [<CarouselElement />, <CarouselElement />, <CarouselElement />]

  return (
    <main className="m-w-[1280px] mx-auto font-safe-font-default">
      <header
        style={{ backgroundImage: `url(${homeBg})` }}
        className="flex justify-between items-center 2xl:px-[140px] xl:px-[60px] lg:px-[40px] bg-cover h-[776px] mb-24"
      >
        <aside className="basis-3/5 flex flex-col gap-3">
          <h1 className="text-[58px] font-bold leading-tight">
            Your Legacy, Secured for the Digital Age with SafeHerit
          </h1>
          <p className="text-xl mb-5">
            From your hard-earned savings in the bank to your precious memories
            stored digitally, SafeHerit ensures your online treasures
            aren&rsquo;t lost in theether. Keep control of your digital life,
            even in the afterlife.
          </p>
          <a
            className="text-[#04477B] bg-white rounded-2xl px-8 py-5 w-fit font-bold"
            onClick={() => navigate("/register")}
          >
            Register the Generated Public Key
          </a>
        </aside>
        <aside className="">
          <img src={headerImg} alt="a couple looking at laptop" />
        </aside>
      </header>

      <section className="max-w-[941px] mx-auto mb-24 px-5">
        <h2 className="text-[32px] font-semibold mb-5 text-center">
          Did you know that up to an astonishing 50% of people&rsquo;s assets
          never reach their intended heirs or beneficiaries?
        </h2>
        <section className="flex justify-around items-center flex-wrap">
          <article className="flex flex-col justify-center items-center max-w-[270px]">
            <h3 className="text-[#04477B] text-[27px] font-semibold ">
              Over $70 billion
            </h3>
            <p className="text-xl font-light text-center">
              Unaccounted assets in the United States
            </p>
          </article>
          <article className="flex flex-col justify-center items-center max-w-[270px]">
            <h3 className="text-[#04477B] text-[27px] font-semibold ">
              As much as 50%
            </h3>
            <p className="text-xl font-light text-center">
              of Estate Assets are lost due to poor planning
            </p>
          </article>
          <article className="flex flex-col justify-center items-center max-w-[270px]">
            <h3 className="text-[#04477B] text-[27px] font-semibold ">
              $250,000
            </h3>
            <p className="text-xl font-light text-center">
              Average Estate loss due to poor planning
            </p>
          </article>
        </section>
      </section>

      <section className="flex justify-between max-w-[1180px] mx-auto px-5 mb-24">
        <aside className="flex flex-col gap-10 items-center justify-center">
          <img src={infoImg1} alt="infographic 1" />
          <img src={infoImg2} alt="infographic 2" />
          <img src={infoImg3} alt="infographic 3" />
        </aside>
        <aside className="flex flex-col items-center gap-6 basis-1/2 text-center">
          <h2 className="text-[32px] font-semibold">Why does this happen?</h2>
          <p className="text-[22px]">
            In the digital age, assets - from bank accounts to cryptocurrency
            addresses - can be created in a few clicks. But with this
            convenience comes the risk of assets getting lost or forgotten.
          </p>
          <p className="text-[22px]">
            Not to mention that updating your will to reflect these accounts and
            credentials can be expensive and time-consuming.
          </p>
          <p className="text-[22px]">
            You might think it&rsquo;s enough to share this information with
            your spouse or close family members. However, they may be involved
            in the same incident that leaves your assets unclaimed.
          </p>
          <p className="text-[22px]">
            And let&rsquo;s not forget that many people prefer to keep their
            financial information private until it&rsquo;s absolutely necessary
            to share it.
          </p>
          <p className="text-[22px]">
            Some attempt to navigate this complex landscape with intricate
            schemes involving vaults andcomplex instructions to relatives.
          </p>
          <p className="text-[22px]">
            But this can quickly turn into a logistical nightmare, especially
            when changes are needed.
          </p>
          <p className="text-[22px]">
            The reality is clear: the traditional ways of managing your digital
            legacy are no longer sufficient.
          </p>
        </aside>
      </section>

      <section className="bg-[#065A93] py-10 mb-24 px-5">
        <div className=" max-w-[1280px] mx-auto text-white flex flex-col gap-5 text-[22px]">
          <h2 className="text-[32px] font-semibold">Value Proposition</h2>
          <p>
            SafeHerit offers a powerful solution to these challenges. Our
            platform provides a secure, efficient, and private way to manage
            your digital assets and ensure they reach your intended
            beneficiaries.
          </p>
          <p>
            With SafeHerit, you can easily catalogue all your digital assets,
            from bank accounts to social media profiles, and designate who
            should receive them. Our system uses robust encryption for maximum
            security and absolute privacy. We ensure that your digital legacy is
            protected and will be passed on according to your wishes.
          </p>
          <p>
            No more worrying about lost assets or complicated schemes. With
            SafeHerit, managing your digital legacy becomes simple, secure, and
            stress-free.
          </p>
        </div>
      </section>

      <section className="max-w-[1480px] mx-auto mb-36 px-5">
        <section className="flex justify-between gap-10 mb-10">
          <aside className="basis-1/2">
            <img src={screenShot1} alt="screen shot of dashboard" />
          </aside>
          <aside className="basis-1/2">
            <div className="mb-10">
              <h2 className="text-[32px] font-semibold">Benefit Headline</h2>
              <p className="text-[22px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <a href="#">Learn more →</a>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={user}
                  alt="user image"
                  className="w-[44px] h-[44px] rounded-full object-contain "
                />
                <div>
                  <h3 className="font-semibold">Jane Cooper</h3>
                  <small className="text-[#848484] text-sm">
                    Jane@gmail.com
                  </small>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#04477B40] text-[100px] font-semibold font-serif">
                  “
                </span>
                <p>
                  Lorem ipsum dolor sit amet, onsectetur adipisicing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </aside>
        </section>
        <section className="flex justify-between items-center gap-10 mb-10">
          <aside className="basis-1/2">
            <img src={screenShot2} alt="screen shot of dashboard" />
          </aside>
          <aside className="basis-1/2">
            <div className="mb-10">
              <h2 className="text-[32px] font-semibold">Benefit Headline</h2>
              <p className="text-[22px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <a href="#">Learn more →</a>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={user}
                  alt="user image"
                  className="w-[44px] h-[44px] rounded-full object-contain"
                />
                <div>
                  <h3 className="font-semibold">Jane Cooper</h3>
                  <small className="text-[#848484] text-sm">
                    Jane@gmail.com
                  </small>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#04477B40] text-[100px] font-semibold font-serif">
                  “
                </span>
                <p>
                  Lorem ipsum dolor sit amet, onsectetur adipisicing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </aside>
        </section>
        <section className="flex justify-between gap-10">
          <aside className="basis-1/2">
            <img src={screenShot3} alt="screen shot of dashboard" />
          </aside>
          <aside className="basis-1/2">
            <div className="mb-10">
              <h2 className="text-[32px] font-semibold">Benefit Headline</h2>
              <p className="text-[22px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <a href="#">Learn more →</a>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={user}
                  alt="user image"
                  className="w-[44px] h-[44px] rounded-full object-contain"
                />
                <div>
                  <h3 className="font-semibold">Jane Cooper</h3>
                  <small className="text-[#848484] text-sm">
                    Jane@gmail.com
                  </small>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#04477B40] text-[100px] font-semibold font-serif">
                  “
                </span>
                <p>
                  Lorem ipsum dolor sit amet, onsectetur adipisicing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </section>

      <section className="mb-24 px-5 w-[calc(100vw-17vw)] m-auto">
        <Carousel slides={slides} />
      </section>

      <section className="mx-auto px-5 flex gap-3 items-center flex-col justify-center mb-24">
        <img src={logo} alt="" />
        <h2 className="text-[32px] font-semibold">Alternative Hero Headline</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter email"
            className="px-8 py-5 text-[#082A44] font-medium bg-[#F5FAFD] focus:outline-none rounded-3xl"
          />
          <button className="px-6 py-5 text-white font-semibold bg-[#0C8AC1] rounded-3xl">
            Start free trial
          </button>
        </div>
      </section>
    </main>
  )
}

function CarouselElement() {
  return (
    <div className="flex justify-between items-center gap-10 mb-20 w-[calc(100vw-20vw)]">
      <aside className="basis-1/2">
        <img
          src={testUser}
          alt="reviewer's image"
          className="w-[590px] rounded-3xl"
        />
      </aside>
      <aside className="basis-1/2">
        <p className="text-[22px] mb-4">
          <code>
            Testimonial Lorem ipsum dolor sit amet, consectetur adipisicing
            elit, sed do eiusmod tempor incididunt.
          </code>
        </p>
        <div className="flex items-center gap-3">
          <img
            src={user}
            alt="user image"
            className="w-[44px] h-[44px] rounded-full object-contain"
          />
          <div>
            <h3 className="font-semibold">Jane Cooper</h3>
            <small className="text-[#848484] text-sm">Jane@gmail.com</small>
          </div>
        </div>
      </aside>
    </div>
  )
}

function Carousel(_props: { slides: React.ReactNode[] }) {
  const [current, setCurrent] = useState(0)

  // const previousSlide = () => {
  //   if (current === 0) setCurrent(_props.slides.length - 1);
  //   else setCurrent(current - 1);
  // };

  // const nextSlide = () => {
  //   if (current === _props.slides.length - 1) setCurrent(0);
  //   else setCurrent(current + 1);
  // };

  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex transition ease-out duration-700 w-[calc(100vw-20vw)]`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {_props.slides.map((slide, i) => (
          <div key={i}>{slide}</div>
        ))}
      </div>
      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {_props.slides.map((_, i) => (
          <div
            onClick={() => {
              setCurrent(i)
            }}
            key={"circle" + i}
            className={`w-2 h-2 rounded-full cursor-pointer  ${
              i === current ? "bg-[#5CEAD2]" : "bg-[#D9D9D9]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}
