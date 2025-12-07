import AdminPageClient from "./AdminPageClient";
import books from "../../data/books";
import influentialPeople from "../../data/influentialPeople";

export default function AdminPage() {
  return <AdminPageClient books={books} people={influentialPeople} />;
}
