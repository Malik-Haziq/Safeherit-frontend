import arrowRight from "../../../assets/images/Arrow - Right.svg"
import registerPageVideo from "../../../assets/images/register_page_video.png"
import safepal from "../../../assets/images/Safepal.svg"

export function RegisterKey() {
  return (
    <main className="flex  min-h-[calc(100vh-80px)] ">
      <section className="basis-2/5 flex flex-col justify-center items-center px-24 ">
        <h1 className="text-safe-text-dark-blue text-2xl text-center font-bold mb-7">
          Register your Secret Key
        </h1>
        <p className="text-safe-text-dark-gray text-center mb-5">
          If you already have a Public/Private key pair, you can use it with
          SafeHerit by registering it. If you don’t haveone we can generate a
          Key Pair for you, or you can useone of the many generators on the web
          to generate them yourself. The choice is yours!
        </p>
        <button className="primary-btn uppercase py-5 px-[86px] mb-28">
          Register
        </button>

        <small className="before:content-none before:h-1 before:max-w-[146px] before:bg-safe-gray-shade after:content-none after:h-1 after:max-w-[146px] after:bg-safe-gray-shade mb-8 text-safe-text-dark-gray text-sm ">
          Don’t have a Public/Private key yet?
        </small>

        <a className="flex gap-3 justify-between items-center bg-white shadow-md py-2 px-4 rounded-lg cursor-pointer w-full">
          <div className="flex justify-center items-center gap-4">
            <img src={safepal} alt="safepal icon" />
            <span className="text-safe-text-black-tint font-medium">
              Generate Public/Private Key Pair
            </span>
          </div>
          <img src={arrowRight} alt="arrow right" className="ml-9" />
        </a>
      </section>
      <section className="basis-3/5 bg-linear-gradient flex justify-center items-center ">
        <div className="bg-white rounded-2xl  ">
          <h3 className="text-center  text-lg font-bold bg-safe-gray rounded-t-2xl py-3">
            Why are we asking you this?
          </h3>
          <div className="pt-12 p-7 ">
            <h2 className="text-safe-text-black-tint text-lg font-bold text-center">
              What are Public and Private Keys?
            </h2>
            <p className="text-center mb-12">
              Learn how private keys keep your data safe.
            </p>
            <img src={registerPageVideo} alt="resiter video screenshot" />
          </div>
        </div>
      </section>
    </main>
  )
}
