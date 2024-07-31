"use server";

import { DetailCharacter } from "@/views/detail-character";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = (params: PageProps) => {
  const { id } = params.params;

  return <DetailCharacter id={id} />;
};

export default Page;
