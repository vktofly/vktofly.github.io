import AnalyticsPageClient from "./AnalyticsPageClient";

export const metadata = {
  title: "Analytics — Section Views",
  description: "Internal analytics dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsPage() {
  return <AnalyticsPageClient />;
}

