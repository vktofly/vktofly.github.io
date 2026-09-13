import Container from "../../components/Container";
import KnowledgeGraph from "../../components/KnowledgeGraph";

export const metadata = {
  title: "Knowledge Graph - Vikash Kumar",
  description: "Interactive 3D visualization of my projects, blog posts, and skills.",
};

export default function GraphPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <Container>
        <div className="max-w-2xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Topology of Thoughts</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            A 3D visualization mapping the intersections of my projects, writings, and skills. 
            Nodes represent concepts and works, connected by their underlying themes.
          </p>
        </div>
        
        <KnowledgeGraph />
      </Container>
    </div>
  );
}
