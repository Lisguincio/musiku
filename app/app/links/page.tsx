import { getLinks } from "@/actions/links/LinksActions";
import LinksList from "@/components/Links/LinksList";
import NewLinkButton from "@/components/Links/NewLinkButton";
import columns from "@/components/Links/columns";
import { DataTable } from "@/components/Table/DataTable";

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
