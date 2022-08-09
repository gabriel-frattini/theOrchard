import Link from "next/link";

import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16"></div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            Copyright &copy; {new Date().getFullYear()} The Orchard. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
