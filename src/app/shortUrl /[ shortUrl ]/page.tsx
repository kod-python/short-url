import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const shortUrl = context.params?.shortUrl as string;

  const urlEntry = await prisma.url.findUnique({
    where: { shortUrl },
  });

  if (urlEntry) {
    return {
      redirect: {
        destination: urlEntry.longUrl,
        permanent: false,
      },
    };
  }

  return { notFound: true };
};

export default function ShortUrlPage() {
  return null;
}
