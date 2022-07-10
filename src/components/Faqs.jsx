import Image from "next/image";

import { Container } from "@/components/Container";
import backgroundImage from "@/images/background-faqs.jpg";

const faqs = [
  [
    {
      question:
        " just a short drive from Barbaron Beach. Victoria and Seychelles International Airport are both within a 30-minute drive.",
    },
  ],
  [
    {
      question: "9.5 / 10 stars from 97 reviews on Booking.com",
    },
  ],
  [
    {
      question: "Amazing garden",
    },
  ],
];

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-12 sm:py-12"
    >
      <h2 id="faq-title" className="sr-only">
        Frequently asked questions
      </h2>
      <div className="absolute top-0 left-1/2 -translate-x-[30%] -translate-y-[25%]">
        <Image
          src={backgroundImage}
          alt=""
          width={1558}
          height={946}
          layout="fixed"
          unoptimized
        />
      </div>
      <Container className="relative flex flex-col justify-center items-center">
        <div className="mx-auto items-center max-w-7xl lg:mx-0">
          <p className="font-display text-xl tracking-tight text-slate-900 sm:text-2xl">
            The Orchard features a spacious terrace and garden with panoramic
            mountain views. Offers accommodations in a quiet area near Barbarons
            on Mahé Island, 6.2 mi from Port Launay Beach, 7.5 mi from Anse
            Royale Beach and 8.1 mi from Anse Soleil.
          </p>
        </div>
        {/* <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {faqs.map((column, columnIndex) => (
            <li
              key={columnIndex}
              className="flex flex-col justify-center items-center"
            >
              <ul className="space-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul> */}
      </Container>
    </section>
  );
}
