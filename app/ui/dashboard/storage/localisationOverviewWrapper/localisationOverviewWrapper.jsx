import StorageContextProvider from "@/app/store/context";
import LocalisationOverview from "../localisationOverview/localisationOverview";

export default function LocalisationOverviewWrapper({ mergedKeyboardData }){
 return <StorageContextProvider>
    <LocalisationOverview mergedKeyboardData={mergedKeyboardData}  />
 </StorageContextProvider>
}