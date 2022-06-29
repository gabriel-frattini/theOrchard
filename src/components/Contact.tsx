import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
import { trpc } from "@/utils/trpc";

export function Contact() {
  const bookingMutation = trpc.useMutation(["create-booking"]);

  const useContactForm = async (e: any) => {
    e.preventDefault();

    const name: HTMLInputElement = e.target.elements.name;
    const email: HTMLInputElement = e.target.elements.email;
    const startDate: HTMLInputElement = e.target.elements.startDate;
    const endDate: HTMLInputElement = e.target.elements.endDate;
    const room: HTMLInputElement = e.target.elements.room;
    const message: HTMLInputElement = e.target.elements.message;

    const input = {
      name: name.value,
      email: email.value,
      startDate: startDate.value,
      endDate: endDate.value,
      room: room.value,
      message: message.value,
    };
    bookingMutation.mutate({ ...input });

    if (bookingMutation.error) console.error(bookingMutation.error);
  };

  return (
    <div className="relative bg-gray-50 mx-auto lg:grid lg:grid-cols-5">
      <div className="py-16 px-4 sm:px-6 lg:col-start 2 lg:col-end-3 lg:px-8 lg:py-24 xl:pr-12">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Get in touch
          </h2>
          <p className="mt-3 text-lg leading-6 text-gray-500">
            Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat
            massa dictumst amet. Sapien tortor lacus arcu.
          </p>
          <dl className="mt-8 text-base text-gray-500">
            <div>
              <dt className="sr-only">Postal address</dt>
              <dd>
                <p>742 Evergreen Terrace</p>
                <p>Springfield, OR 12345</p>
              </dd>
            </div>
            <div className="mt-6">
              <dt className="sr-only">Phone number</dt>
              <dd className="flex">
                <PhoneIcon
                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <span className="ml-3">+1 (555) 123-4567</span>
              </dd>
            </div>
            <div className="mt-3">
              <dt className="sr-only">Email</dt>
              <dd className="flex">
                <MailIcon
                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <span className="ml-3">support@example.com</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="bg-white py-16 px-4 sm:px-6 lg:col-start-3 lg:col-end-5  lg:py-24 lg:px-8 xl:pl-12">
        <div className="max-w-lg mx-auto lg:max-w-none">
          <form onSubmit={useContactForm} className="grid grid-cols-1 gap-y-6">
            <div className="w-96">
              <label htmlFor="name" className="sr-only">
                name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                placeholder="Full name"
              />
            </div>
            <div className="w-96">
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
              />
            </div>
            <div className="w-96">
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
            <div className="w-96 ">
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
            <div className="w-96">
              <label htmlFor="room" className="sr-only">
                Room
              </label>
              <select
                name="room"
                id="room"
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md hover:cursor-pointer"
              >
                <option value="deluxe room">Deluxe Room</option>
                <option value="king room">King Room</option>
                <option value="queen room">Queen Room</option>
                <option value="twin room">Twin Room</option>
              </select>
            </div>
            <div className="max-w-3xl">
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
              />
            </div>
            <div className="flex gap-6 ">
              <button
                disabled={bookingMutation.isLoading}
                type="submit"
                className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
              {!bookingMutation.isLoading && bookingMutation.data && (
                <div className="flex-col">
                  <p className="text-lg leading-6 font-medium text-gray-500">
                    thanks for reaching out! We’re thrilled to hear from you and
                    will get back in touch with you soon!
                  </p>
                  <p className="text-lg leading-6 font-medium text-gray-500">
                    {" "}
                    Have a great day!
                  </p>
                </div>
              )}
              {!bookingMutation.isLoading && bookingMutation.isError && (
                <div className="flex-col">
                  <p className="text-lg leading-6 font-medium text-gray-500">
                    Your message could not be sent
                  </p>
                  <p className="text-lg leading-6 font-medium text-gray-500">
                    {" "}
                    Have a great day!
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
