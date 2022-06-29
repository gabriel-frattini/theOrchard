import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
import { trpc } from "@/utils/trpc";

export function Contact() {
  const bookingMutation = trpc.useMutation(["booking.create-booking"]);

  const useContactForm = async (e: any) => {
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
    bookingMutation.mutate({ ...input });

  };

  return (
    <form onSubmit={useContactForm} className="grid lg:grid-cols-2 gap-6">
      <div className="lg:col-start-1">
        <label htmlFor="name" className="sr-only">
          name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md hover:cursor-pointer"
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
          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md hover:cursor-pointer"
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
          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
          placeholder="Message"
          defaultValue={""}
          required
        />
      </div>
      <div className="lg:col-span-2 h-64  flex flex-row-reverse justify-between">
        <div className="flex items-start">
          <button
            disabled={bookingMutation.isLoading}
            type="submit"
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Submit
          </button>
        </div>
            {bookingMutation.isLoading && (
              <div className="flex-col ">
                <p className="text-lg leading-6 font-medium text-gray-500">
                  thanks for reaching out! We’re thrilled to hear from you and will
                  get back in touch with you soon!
                </p>
                <p className="text-lg leading-6 font-medium text-gray-500">
                  {" "}
                  Have a great day!
                </p>
              </div>
            )}
            {bookingMutation.isError && (
              <div className="flex-col">
                <p className="text-lg leading-6 font-medium text-gray-500">
                  Your message could not be sent
                </p>
                <p className="text-lg leading-6 font-medium text-gray-500"> </p>
              </div>
            )}
      </div>
    </form>
  );
}
