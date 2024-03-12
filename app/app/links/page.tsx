import { getLinks } from "@/actions/links/getLinks";
import NewLinkButton from "@/components/Links/NewLinkButton";

const Page = async () => {
  const links = await getLinks();

  return (
    <div>
      <NewLinkButton />
      <h1>Links</h1>
      <p>Links page content</p>
      {links.map((link) => (
        <div key={link.id}>{link.title}</div>
      ))}
    </div>
  );
};

export default Page;
