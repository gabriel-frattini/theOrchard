import React from "react";
import Head from "next/head";

import { AuthLayout } from "@/components/AuthLayout";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

interface Props {}

const Admin: React.FC<Props> = () => {
  const router = useRouter();
  const [passphrase, setPassphrase] = React.useState("");
  const { mutate, isLoading, data } = trpc.useMutation(["admin.login"], {
    onSuccess: (data) => {
      router.push(data.redirect);
    },
  });

  const handleLogin = () => {
    mutate({ passphrase: passphrase });
  };

  return (
    <>
      <Head>
        <title>Sign In - TaxPal</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col items-start justify-start">
          <h2 className="mt-16 text-lg font-semibold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="mt-10">
          <div className="mt-6">
            <input
              onChange={(e) => setPassphrase(e.target.value)}
              id="passphrase"
              type="password"
              autoComplete="current-password"
              required
              placeholder="password"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
            <button
              onClick={handleLogin}
              type="submit"
              className="w-full mt-2 rounded-full border border-transparent bg-blue-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Admin;
