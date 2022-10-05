import Link from "next/link";
import AdminLayout from "@/admin/AdminLayout";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import PostPlacard from "@/admin/collection/manage/PostPlacard";
import { Post } from "@artiva/shared";
import CuratorContext from "@/context/CuratorContext";
import ProtocolSaveToast from "@/components/ProtocolSaveToast";
import usePublishPost from "@/hooks/post/usePublishPost";

const Manage = () => {
  return (
    <AdminLayout>
      <CuratorContext.Provider>
        <div className="w-full mt-4">
          <div className="flex justify-between items-baseline p-6 relative">
            <Header />
          </div>
          <Feed />
        </div>
      </CuratorContext.Provider>
    </AdminLayout>
  );
};

const Header = () => {
  const { collection } = CuratorContext.useContainer();
  const publish = usePublishPost(collection, false);

  return (
    <div className="pb-4 flex justify-between items-baseline relative w-full">
      <div className="flex items-baseline px-10">
        <Link href={"/artiva/collection"}>
          <a className="text-3xl font-bold">Collection</a>
        </Link>
        <ChevronRightIcon className="mx-2 text-gray-400 rounded-md w-6 h-6" />
        <h1 className="text-3xl font-bold">Manage</h1>
      </div>
      <div className="flex">
        <button
          onClick={publish.save}
          className="bg-black text-white h-8 w-24 rounded-md"
        >
          Save
        </button>
      </div>
      <div className="absolute top-14 right-0 z-10">
        <ProtocolSaveToast {...publish} />
      </div>
    </div>
  );
};

const Feed = () => {
  const { collection } = CuratorContext.useContainer();
  return (
    <div className="grid grid-cols-2 h-[84vh] overflow-auto">
      {collection?.map((x: Post, i: number) => {
        return <PostPlacard key={i} post={x} />;
      })}
    </div>
  );
};

export default Manage;
