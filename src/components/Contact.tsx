import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
import { trpc } from "@/utils/trpc";
import * as React from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { CallToAction } from "./CallToAction";

export function Contact() {
  const [loading, setLoading] = React.useState(false);
  const mutation = trpc.useMutation(["booking.create-booking"]);
  const [sentMessage, setSentMessage] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (
      sessionStorage.getItem("message") !== null &&
      window.location.hash === "#success"
    )
      setSentMessage(true);
  }, []);

  const useContactForm = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const name: HTMLInputElement = e.target.elements.name;
    const email: HTMLInputElement = e.target.elements.email;
    const startDate: HTMLInputElement = e.target.elements.startDate;
    const endDate: HTMLInputElement = e.target.elements.endDate;
    const message: HTMLInputElement = e.target.elements.message;

    const input = {
      name: name.value,
      email: email.value,
      startDate: startDate.value,
      endDate: endDate.value,
      room: "king room",
      message: message.value,
    };
    mutation.mutate(
      { ...input },
      {
        onSuccess(data) {
          sessionStorage.setItem("message", JSON.stringify(data?.id));
          const url = new URL(window.location.href);
          url.hash = "#success";
          router.push(url.href);
          router.reload();
          setLoading(false);
        },
      }
    );
  };

  return (
    <>
      <h2 className="font-display text-gray-600 text-lg mt-4">
        Interested in spending your next holiday in seychelles?
      </h2>
      <h1 className="font-display text-3xl mt-2 mb-4 font-display tracking-tight ">
        Get in touch.
      </h1>
      <form
        onSubmit={useContactForm}
        method="POST"
        action="#"
        className="grid lg:grid-cols-2 gap-6"
      >
        <div className="lg:col-start-1">
          <label htmlFor="name" className="sr-only">
            name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-rose-500 focus:border-rose-500 border-gray-300 rounded-md"
            placeholder="Name"
            required
          />
        </div>
        <div className="lg:col-start-2">
          <label htmlFor="email" className="sr-only">
            email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-rose-500 focus:border-rose-500 border-gray-300 rounded-md"
            placeholder="Email"
            required
          />
        </div>
        <div className="lg:col-start-1">
          <label htmlFor="date" className="sr-only">
            Start date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-rose-500 focus:border-rose-500 border-gray-300 rounded-md hover:cursor-pointer"
          />
        </div>
        <div className="lg:col-start-2 ">
          <label htmlFor="date" className="sr-only">
            Start date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-rose-500 focus:border-rose-500 border-gray-300 rounded-md hover:cursor-pointer"
          />
        </div>

        <div className="lg:col-span-2 ">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-rose-500 focus:border-rose-500 border border-gray-300 rounded-md"
            placeholder="Message"
            defaultValue={""}
            required
          />
        </div>
        <div className="lg:col-span-2 h-64  flex flex-row-reverse justify-between">
          <div className="flex items-start">
            <button
              disabled={mutation.isLoading}
              type="submit"
              className="inline-flex justify-center  py-2 px-6 border border-transparent shadow-sm text-base font-display rounded-md text-white bg-rose-500 hover:bg-rose-600"
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </div>
          {sentMessage && (
            <div className="flex-col ">
              <p className="text-lg leading-6 font-display text-gray-500"></p>
              <p className="text-lg leading-6 font-display text-gray-500">
                thanks for reaching out! We're thrilled to hear from you and
                will get back in touch with you soon! Have a great day!
              </p>
            </div>
          )}
          {mutation.isError && (
            <div className="flex-col">
              <p className="text-lg leading-6 font-display text-gray-500">
                Your message could not be sent
              </p>
              <p className="text-lg leading-6 font-display text-gray-500"> </p>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
