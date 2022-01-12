import { prisma } from "../providers/prisma";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const link = await prisma.link.findFirst({
    where: {
      code: id,
    },
  });
  if (link) {
    return {
      redirect: {
        destination: link.link,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default function Page() {
  return <div>This is page</div>;
}
