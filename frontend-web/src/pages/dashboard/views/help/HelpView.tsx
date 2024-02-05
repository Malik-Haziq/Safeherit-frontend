import React from "react"
import styles from "../../Dashboard.module.css"
import addIcon from "@images/add.svg"
import crossIcon from "@images/cross.svg"
import downArrow from "@images/Arrow-Down-Circle.svg"

import { useState } from "react"
import { SelectField } from "@/components/selectField"
import { SelectOption } from "@/types"

export default function HelpView() {
  const [openSection, setOpenSection] = useState("faq")
  const [selectedCategory, setSelectedCategory] = useState<SelectOption>()

  function handleSection(section: string) {
    setOpenSection(section)
  }

  return (
    <div className={styles.AppView}>
      <main className="p-8 flex flex-col gap-8 mx-auto">
        <div className="w-[1085px]">
          <div className="flex gap-2 p-2 rounded-full mx-auto bg-white w-fit">
            <h1
              className={
                openSection === "faq"
                  ? "px-6 py-2 bg-[#0971AA] rounded-full text-white font-semibold cursor-pointer"
                  : "px-6 py-2 text-[#545454] rounded-full cursor-pointer"
              }
              onClick={() => handleSection("faq")}
            >
              Tutorial video & FAQ
            </h1>
            <h1
              className={
                openSection === "suggestions"
                  ? "px-6 py-2 bg-[#0971AA] rounded-full text-white font-semibold cursor-pointer"
                  : "px-6 py-2 text-[#545454] rounded-full cursor-pointer"
              }
              onClick={() => handleSection("suggestions")}
            >
              Suggestions
            </h1>
            <h1
              className={
                openSection === "support"
                  ? "px-6 py-2 bg-[#0971AA] rounded-full text-white font-semibold cursor-pointer"
                  : "px-6 py-2 text-[#545454] rounded-full cursor-pointer"
              }
              onClick={() => handleSection("support")}
            >
              Contact Support
            </h1>
          </div>
        </div>
        {openSection === "faq" && <FAQ />}
        {openSection === "support" && <Support />}
        {openSection === "suggestions" && (
          <Suggestions
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
      </main>
    </div>
  )
}

function FAQ() {
  return (
    <section className="flex flex-col gap-6 bg-white mx-8 py-10 px-8 rounded-2xl w-[1085px] shadow-sm">
      <QuestionBox question={"What data does SafeHerit have access to?"}>
        <div className="text-[#969696]">
          <p>
            At SafeHerit, your privacy is our top priority. Here&rsquo;s a
            breakdown of what we can see and what remains private:
          </p>
          <p className="mb-2">
            <span className="font-semibold text-[#747474]">
              Accessible Data:{" "}
            </span>
            For the platform to function, we need access to certain
            non-sensitive data. This includes your username, email, contact
            preferences, payment status, and setup configurations. This data
            helps us manage your account, assist with support inquiries, and
            ensure the Pulse Check process runs smoothly.
          </p>
          <p>
            <span className="font-semibold text-[#747474]">Private Data: </span>
            Your sensitive data, such as details about your assets, testament
            videos, encryption keys, and any other confidential information you
            provide, are encrypted with your Secret key (Public key). This means
            that it can only be decrypted by you and your beneficiaries using
            your respective Secret Keys (Private Keys). This means that while
            this data is stored on our servers, we can only see encrypted data
            and cannot view the actual content.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "How secure is SafeHerit? What if you get hacked and my data gets stolen?"
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            As mentioned earlier, your Private Data is stored encrypted and we
            don’t have the keys to decrypt it (only you and your beneficiaries
            do).{" "}
          </p>
          <p className="mb-2">
            This is by design as we are dealing with your most confidential
            information. We wanted to make sure that no matter what happens,
            only you and your beneficiaries can have access to your Private
            Data. No one else should have access to it, not even us at
            SafeHerit.
          </p>
          <p className="mb-2">
            Since we cannot leak what we don’t have, in the unlikely scenario of
            a data breach all the hackers would have access to is a useless pile
            of encrypted data, essentially making it indecipherable gibberish to
            them.
          </p>
          <p className="mb-2">
            But you might ask “What if they still manage to decrypt it?”.{" "}
          </p>
          <p>
            Well, we use top-tier, military-grade encryption —the same standard
            adopted by banks, governments, and other critical sectors. If
            someone somehow managed to hack it, the implications would be
            global: it would mean they could compromise virtually any
            institution, including banks and government bodies.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "What if my government or tax authorities ask you to hand over my data?"
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            Again, we cannot hand over what we don’t have. In the unlikely event
            that we are forced to hand over your data to a governmental entity,
            all we have is encrypted data that only you can decrypt.{" "}
          </p>
          <p className="mb-2">
            So they would also only have access to a pile of useless encrypted
            data. And there is literally nothing we could do to help them
            decrypt it, even if we wanted to.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={"What happens if I lose my Secret key (Private key)?"}
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            Your Private Key is the only way to decrypt your sensitive
            information on SafeHerit. We do not have access to nor store this
            key, so if you lose it there is unfortunately nothing we can do to
            help you retrieve it.{" "}
          </p>
          <p className="mb-2">
            So please make to store your Private Key securely and consider
            backing it up in multiple safe locations. With great privacy comes
            great responsibility!
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "Do I have to give my Secret key (Private key) to my beneficiaries?"
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            No, your Secret Key is the master key that gives access to
            everything you have on SafeHerit. Each beneficiary gets his or her
            own Secret Key, that only gives them access to the information you
            want them to see.
          </p>
          <p className="mb-2">
            Indeed, depending on how you set your assets you may not want all
            beneficiaries to know about all your assets. For example, you could
            setup SafeHerit in a way that each beneficiary only receives
            information about the assets you plan to have them inherit.{" "}
          </p>
          <p className="mb-2">
            This is why every time you create a beneficiary, the first thing
            that SafeHerit asks you is to either generate or provide a Secret
            Key for that specific beneficiary. This is the key that you should
            be giving to that specific beneficiary.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "How do beneficiaries receive their Secret Key (Private Key)?"
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            The private key is a crucial piece of information that allows
            beneficiaries to access the encrypted data stored on SafeHerit.{" "}
          </p>
          <p className="mb-2">
            SafeHerit does not store or transfer these private keys: it&rsquo;s
            the user&rsquo;s responsibility to ensure that each beneficiary gets
            their designated private key.{" "}
          </p>
          <p className="mb-2">
            Here are ways you might approach it based on two different
            scenarios:
          </p>
          <ol className="list-decimal list-inside">
            <li className="mb-4">
              <span className="font-semibold text-[#747474]">
                Informing Beneficiaries Now:
              </span>
              <p className="mb-2">
                If you are comfortable discussing SafeHerit and the information
                stored on it with your beneficiaries, you can directly hand over
                their Private Key to them. This can be done in various ways:
              </p>
              <ul className="list-disc list-inside">
                <li className="mb-2 ml-4">
                  <span className="font-semibold text-[#747474]">
                    Physical Handover:
                  </span>{" "}
                  Write down the recovery phrase for the secret key, seal it in
                  an envelope, hand it to them directly, and advise them to
                  store it in a secure location like a safe. Once they log into
                  SafeHerit they will be provided with guidance on how to
                  reconstruct a Private Key file (.pem) based on the recovery
                  phrase.
                </li>
                <li className="mb-2 ml-4">
                  <span className="font-semibold text-[#747474]">
                    Digital Transfer:
                  </span>{" "}
                  Use a secure communication method, such as encrypted messaging
                  apps, to send the Private Key file (.pem file). However, be
                  cautious and ensure that the chosen method is trustworthy.
                </li>
                <li className="mb-2 ml-4">
                  <span className="font-semibold text-[#747474]">
                    USB Security Key:
                  </span>{" "}
                  Transfer the Private Key file (.pem) to a secure USB key,
                  which they can keep. Make sure they know the importance of
                  keeping it safe.
                </li>
                <li className="mb-2 ml-4">
                  <span className="font-semibold text-[#747474]">
                    Secure Cloud Storage:
                  </span>{" "}
                  Store the Private Key file (.pem) in a secure, encrypted cloud
                  storage space and share access credentials with the
                  beneficiary, ensuring they change the password after
                  retrieving the key.
                </li>
              </ul>
            </li>
            <li>
              <span className="font-semibold text-[#747474]">
                Informing Beneficiaries Later:
              </span>
              <p className="mb-2">
                f you&rsquo;d rather your beneficiaries only learn about
                SafeHerit and the fact that they will be receiving this
                information through it after your passing, here are some
                examples of how you could proceed:
              </p>
              <ul className="list-disc list-inside">
                <li className="mb-2 ml-4">
                  <span className="font-semibold text-[#747474]">
                    Letter of Instruction:
                  </span>{" "}
                  Create a letter of instruction that&rsquo;s stored with your
                  will or estate planning documents. While not legally binding,
                  it acts as a guide for beneficiaries and can contain the
                  recovery phrase for the Private Key.
                </li>
                <li className="mb-2 ml-4">
                  <span className="font-semibold text-[#747474]">
                    Trusted Third Party:
                  </span>{" "}
                  You might also consider using a trusted third party like a
                  lawyer or a bank&rsquo;s safety deposit box service, where you
                  store the recovery phrase for the Private Key, and
                  instructions are given to release it to the beneficiary upon
                  certain conditions (like your passing). .
                </li>
                <li className="mb-2 ml-4">
                  <span className="font-semibold text-[#747474]">
                    Instructions to trusted friends or relatives:{" "}
                  </span>{" "}
                  You could ask someone within your relatives or close friends
                  to deliver it to its rightful beneficiary in case of your
                  passing. Note that just having the Secret Key will not enable
                  them to view the data as they will not be registered on
                  SafeHerit and therefore unable to log into the platform. Only
                  the beneficiaries will be contacted by SafeHerit and provided
                  with credentials to access the platform,
                </li>
              </ul>
            </li>
          </ol>
          <p>
            Regardless of the method chosen, please make sure that the Private
            Key remains confidential and secure at all times. Without it,
            beneficiaries won&rsquo;t be able to access the encrypted data, and
            we will not be able to help as we do not store it.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox question={"What type of encryption is used by SafeHerit?"}>
        <div className="text-[#969696]">
          <p className="mb-2">
            SafeHerit use the RSA 4096 encryption algorithm to encrypt your
            sensitive data such as assets, documents or testament videos. This
            algorithm stands among the most secure encryption methods in
            existence today. It is commonly used for high-stakes applications
            such as credit card transactions, digital signatures, secure
            authentication, military communications and critical governmental
            operations.{" "}
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={"Does SafeHerit replace the need for a legal will?"}
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            No, SafeHerit does not replace a legal will and may not have any
            legal standing in the inheritance process. It functions as a tool to
            help your heirs identify and manage your assets, making the
            inheritance process smoother. A legal will remains essential for
            legally determining how your assets should be distributed upon your
            passing.{" "}
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "Can SafeHerit provide legal advice or help in the legal transfer of assets?"
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            SafeHerit is primarily a tool for asset identification and
            management. While it can assist in speeding up the asset
            identification process during inheritance proceedings and make sure
            that no assets remain abandoned, it does not offer legal advice or
            assist in the legal transfer of assets. We recommend that you
            consult with a legal professional for such matters.{" "}
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "Can SafeHerit guarantee the transfer of my assets to my heirs?"
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            SafeHerit ensures that your assets are identifiable and that your
            beneficiaries are informed. However, the actual transfer of assets
            is subject to external factors, including legal procedures and
            individual platform policies. SafeHerit helps with the
            identification process but does not guarantee the transfer.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={"What happens if I don’t pay for my SafeHerit subscription?"}
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            If SafeHerit is unable to process your payment, you will receive an
            e-mail notification about the unsuccessful transaction. This is a
            reminder to check and possibly update your payment method.
          </p>
          <p className="mb-2">
            If there is no response from you following our reminders and no
            activity in your account, we will assume you might be facing a
            potential life-threatening situation and initiate the Pulse Check
            escalation protocol. We will start a series of reminders, and
            eventually reach out to validators and beneficiaries if there is no
            response, ensuring that the core mission of SafeHerit —to inform
            beneficiaries about assets in critical situations— is fulfilled.
          </p>
          <p className="mb-2">
            If we confirm that you are well during these checks but payments
            still haven’t been settled, we will assume that you no longer wish
            to use SafeHerit and deactivate your account. In such a case
            SafeHerit will retain your data for an additional 30 days. If you
            clear the outstanding payment within this window your account will
            be reactivated.{" "}
          </p>
          <p className="mb-2">
            However, after 30 days without any payment you account and all
            associated data will be permanently deleted from our servers to
            maintain privacy and security standards. Should you decide to use
            SafeHerit again after your data has been deleted, you will need to
            create a new account and start the setup process from scratch.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "Can I add more than one beneficiary to my SafeHerit account?"
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            Yes, SafeHerit allows you to designate multiple beneficiaries. This
            ensures that even if one beneficiary is unreachable, others can be
            informed about your assets.{" "}
          </p>
          <p className="mb-2">
            It also enables you to inform different beneficiaries about
            different assets for enhanced privacy. For example, if you have two
            beneficiaries (let’s call them Sara and Paul), you could allocate
            assets A and B to Sara and assets C and D to Paul. This would result
            in Sara receiving information only about assets A and B, and Paul
            only receiving information about assets C and D.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={"If I close my SafeHerit account, what happens to my data?"}
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            SafeHerit prioritizes user privacy. If you choose to close your
            account, all your data will be immediately and permanently deleted
            from our servers, ensuring your privacy is maintained.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={"What is a validator in the context of SafeHerit?"}
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            Validators are trusted individuals you select within SafeHerit whose
            role is to act as a safety net by confirming your well-being. If the
            system doesn&rsquo;t get a response from you during the Pulse Check
            process, your validators are contacted to confirm your status.
          </p>
          <p className="mb-2">Having validators serves a dual purpose:</p>
          <p className="mb-2">
            First, in scenarios where you might be alive but temporarily
            unreachable — maybe due to travel, lack of internet access, or other
            reasons — validators can confirm your well-being and prevent an
            unnecessary sharing of information to your beneficiaries.{" "}
          </p>
          <p className="mb-2">
            Second, in the unfortunate event that something has happened to you,
            validators help us quickly confirm the situation, ensuring a timely
            information sharing to your beneficiaries.
          </p>
          <p className="mb-2">
            Please note that validators do not get access to any information
            about your assets. All they will receive is any message you may have
            left for them, and a request to confirm your well-being.
          </p>
          <p className="mb-2">
            While registering validators is not mandatory, we strongly recommend
            having at least one and ideally more than one. Life can be
            unpredictable; one validator might be unavailable or unable to
            respond when needed. By having multiple validators, you enhance the
            chances of a timely and accurate check, ensuring the primary
            objective of SafeHerit — to timely notify your beneficiaries in case
            of unforeseen events — is met more effectively.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={"How is SafeHerit different from other online platforms?"}
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            What distinguishes SafeHerit is its uncompromising stance when it
            comes to your privacy and security.
          </p>
          <p className="mb-2">
            Most online platforms have total access to your data: while it is
            technically encrypted, they have the keys to decrypt it and can
            access its content at will. This is typical for services like Google
            Sheets and various online storage platforms, especially when their
            business model revolves around the use of your personal data.
          </p>
          <p className="mb-2">
            In contrast, at SafeHerit we believe in individual privacy and want
            you to be in control of your data. This is why your data is
            encrypted on your computer before being sent to our servers.
            Critically, it’s encrypted in a way that your Private key can
            decrypt, a key which only you have. This ensures that we (or anyone
            else) have no visibility on the content of your data even though it
            is stored with us.
          </p>
          <p className="mb-2">
            The trade-off for this privacy is that you have to be diligent in
            safeguarding your Private Keys. Since you are the only one holding
            them, if you lose them there will be no way to access that data
            again. So in that case you will have to re-input all your data again
            from scratch with a new Private Key.{" "}
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "How can I ensure my beneficiaries can access my assets if they're not tech-savvy?"
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            SafeHerit is designed with user-friendliness in mind. Additionally,
            when beneficiaries are notified, they receive clear instructions and
            guidance on accessing the provided information. We recommend
            discussing SafeHerit with your beneficiaries in advance to
            familiarize them with the process.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "Is there a limit to what I can register on my SafeHerit account?"
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            SafeHerit allows you to add as many assets as you need, ensuring
            comprehensive coverage of both your digital and physical legacies.
            There is however a total file storage limit of 1 GB (1 Gigabyte) per
            account, which is available for all the file attachments related to
            your assets as well as for testament videos. In our experience this
            is enough for the majority of use cases, but if you happen to need
            more space please contact support.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={"How do I know my data is actually encrypted like you say? "}
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            You don’t need to take our word on it: our encryption process is
            transparent. The website&rsquo;s code, which handles encryption, is
            openly accessible to anyone with technical know-how. If you&rsquo;re
            not tech-savvy but still want to verify it, we suggest having a
            knowledgeable friend inspect it on your behalf.{" "}
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "How much detail should I put about my assets? I’m hesitant about providing full details even if it's encrypted."
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            You are free to put as much or as little details about your assets
            as you wish. All that matters is that it enables your beneficiaries
            to know about them or at least know where to look for them. It could
            be as simple as{" "}
            <code>
              There&rsquo;s an envelope under my mattress, give it to uncle Ben
            </code>
            , all the way to detailed instructions including account
            credentials. You can choose how much detail you want to put in, just
            make sure it makes sense for whoever will be reading it: Many assets
            are lost because their owners left treasure hunt instructions that
            nobody could figure out.{" "}
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={"What if I forget my password or lose my e-mail address? "}
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            You can reset your password anytime: a link will be sent to your
            registered e-mail address to help you set up a new password. If for
            some reason you lose access to your registered e-mail address, you
            can recover your account using the same private key you use to
            encrypt your data (which is different from your password).{" "}
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "What if my e-mail gets hacked and the hacker accesses my account?"
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            Even if a hacker has your user name and password, he will not be
            able to see anything about your assets unless he also has your
            Private Key. Your Private Key is what is used to decrypt the data
            sent from our servers, and is separate from the password used to
            access the platform. So without your Private Key, while a hacker
            will be able to log into SafeHerit he will not be able to decrypt
            and view the data about your assets. It will be the equivalent of
            you logging into the platform without having your Private Key handy.{" "}
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "What if I go on a retreat in some remote island and lose access to my e-mail / phone number? Will my assets still be disclosed even if I'm alive?"
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            To avoid this scenario, we highly recommend that you appoint
            Validators who are most likely to know about your whereabouts. They
            will be able to confirm that you are still alive and prevent an
            unecessary disclosure of your assets to your designated
            beneficiaries.{" "}
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={
          "Where is the data stored? What if it gets accidentally deleted?"
        }
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            Your encrypted data is securely stored on the cloud, with separate
            backups to provide redundancy. In the unlikely event that the cloud
            data gets corrupted, we have procedures in place to swiftly redeploy
            the back up data.
          </p>
        </div>
      </QuestionBox>

      <QuestionBox
        question={"What if you go out of business? What happens to my data?"}
      >
        <div className="text-[#969696]">
          <p className="mb-2">
            We will send you back your data and wipe out our servers as per our
            terms and conditions.
          </p>
        </div>
      </QuestionBox>
    </section>
  )
}

function QuestionBox(_props: { question: string; children: any }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpen() {
    setIsOpen(!isOpen)
  }

  return (
    <article className="mx-auto flex justify-between gap-5 shadow-lg p-6 rounded-2xl">
      <div className="w-[910px]">
        <h1 className="text-[#545454] text-xl mb-2 font-semibold">
          {_props.question}
        </h1>
        {isOpen && _props.children}
      </div>
      <a href="#" className="w-10 h-10" onClick={handleOpen}>
        {isOpen ? (
          <img src={crossIcon} alt="icon for closing box" className="w-full" />
        ) : (
          <img src={addIcon} alt="icon for opening box" className="w-full" />
        )}
      </a>
    </article>
  )
}

function Suggestions(_props: {
  selectedCategory: any
  setSelectedCategory: any
}) {
  return (
    <main className="flex flex-col gap-6 bg-white mx-8 py-8 px-6 rounded-2xl w-[1085px] shadow-sm">
      <section className="bg-[#F4F4F4] rounded-2xl py-4 px-4">
        <h2 className="text-center text-[#00192B] text-lg font-medium mb-1">
          Suggest an idea
        </h2>
        <p className="text-[#1E1E1E] text-center opacity-60">
          We would love to hear your suggestions
        </p>
        <SelectField
          data={[
            { label: "category 1", value: "category 1" },
            { label: "category  2", value: "category 2" },
            { label: "category 3", value: "category 3" },
            { label: "category 4", value: "category 4" },
          ]}
          value={_props.selectedCategory}
          selectProps={{ placeholder: "Select category", isSearchable: false }}
          setSelectedValue={_props.setSelectedCategory}
          selectFieldStyles={
            "cy-beneficiary-owner rounded-3xl font-semibold px-2 text-[#6F767B] bg-[#F5FAFD] my-3 relative"
          }
          hasRightIcon={true}
          rightIcon={downArrow}
          rightIconStyles="absolute right-4 top-4 cursor-pointer"
        />
        <textarea
          placeholder="Write your suggestion"
          className="bg-[#F5FAFD] h-[350px] outline-none resize-none w-full rounded-2xl p-4 text-[#6F767B] mb-4"
        ></textarea>
        <div className="flex items-center justify-center">
          <button className="bg-[#0971AA] text-white font-semibold px-20 py-2 mx-auto rounded-xl inline-block">
            Submit
          </button>
        </div>
      </section>
    </main>
  )
}

function Support() {
  return (
    <main className="flex flex-col gap-6 bg-white mx-8 py-10 px-8 rounded-2xl w-[1085px] shadow-sm">
      <p className="text-[#838383] text-center">
        Need Assistance? Please fill out the form below with your support
        request or any questions you may have. Be as detailed as possible to
        help us assist you better. Our support team will get back to you as
        quickly as possible
      </p>
      <form className="mb-14">
        <textarea
          placeholder="Enter your message..."
          className="w-full h-[336px] p-4 resize-none focus:outline-none shadow-md scrollbar rounded-2xl"
        ></textarea>
        <button className="primary-btn mx-auto px-12 rounded-xl mt-10 bg-[#0971AA]">
          Submit
        </button>
      </form>
    </main>
  )
}
