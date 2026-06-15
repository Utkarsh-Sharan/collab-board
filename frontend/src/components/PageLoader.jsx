import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <LoaderIcon className="size-10 animate-spin" />
      </main>
    </>
  );
}

export default PageLoader;
