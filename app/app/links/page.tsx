import { getLinks } from "@/actions/links/LinksActions";
import LinksList from "@/components/Links/LinksList";
import NewLinkButton from "@/components/Links/NewLinkButton";

const Page = async () => {
  const links = await getLinks();

  return (
    <div className="flex flex-col ">
      <div>
        <NewLinkButton />
      </div>
      <div className="mt-4">
        <LinksList links={links} />
      </div>
    </div>
  );
};

export default Page;
