import AdminPageClient from "./AdminPageClient";
import books from "../../data/books";
import influentialPeople from "../../data/influentialPeople";

export const metadata = {
  title: "Admin — Data Management",
  description: "Internal administrative dashboard for managing portfolio data.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminPageClient books={books} people={influentialPeople} />;
}
