import Head from "next/head";

interface HomeProps {
  name?: string;
}

export default function Home({ name = "Mundo" }: HomeProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-between items-center p-24 min-h-screen">
        <h2 className="text-5xl font-bold">Olá, {name}!</h2>
      </main>
    </>
  );
}
