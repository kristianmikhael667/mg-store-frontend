import OverviewContent from "../../components/organisms/OverviewContent";
import SideBar from "../../components/organisms/SideBar";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";
import jwtDecode from "jwt-decode";
import Head from "next/head";

export default function Member() {
  return (
    <>
      <Head>
        <title>Dashboard User</title>
        <meta
          name="description"
          content="Kami menyediakan jutaan cara untuk membantu
players menjadi pemenang sejati"
        />
        <meta
          property="og:title"
          content="Store GG - Get a New Experience in Gaming"
        />
        <meta
          property="og:description"
          content="Kami menyediakan jutaan cara untuk membantu
players menjadi pemenang sejati"
        />
        <meta
          property="og:image"
          content="https://esports.id/img/article/637920200914081250.png"
        />
        <meta
          property="og:url"
          content="https://esports.id/img/article/637920200914081250.png"
        />
      </Head>
      <section className="overview overflow-auto">
        <SideBar activeMenu="overview" />
        <OverviewContent />
      </section>
    </>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, "base64").toString("ascii");

  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const userFromPayload: UserTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;

  return {
    props: {
      user: userFromPayload,
    },
  };
}
