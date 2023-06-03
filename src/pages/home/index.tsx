import Tabs from "~/components/Tabs/Tabs";
import CreateTweet from "./CreateTweet";
import AllTweets from "./AllTweets";

export default function Home() {
  return (
    <div className="flex flex-col gap-[1rem]">
      <h2 className="ml-[1rem] text-lg font-bold">Home</h2>
      <Tabs tabs={["For you", "Following"]} default="For you">
        {(activeTab) => {
          switch (activeTab) {
            case "For you": {
              return (
                <div>
                  <CreateTweet />
                  <AllTweets from="For you" />
                </div>
              );
            }
            case "Following": {
              return <></>;
            }
            default:
              return null;
          }
        }}
      </Tabs>
    </div>
  );
}
