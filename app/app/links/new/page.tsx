import { getMusicProviders } from "@/actions/links/LinksActions";
import NewLinkForm from "../../../../components/NewLinkForm/NewLinkForm";

const Page = async () => {
  const providers = await getMusicProviders();
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-bold ">Aggiungi un nuovo brano</h1>
      </div>
      <NewLinkForm providers={providers} />
    </div>
  );
};

export default Page;
