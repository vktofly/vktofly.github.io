import Container from "../../components/Container";
import AITwinChat from "../../components/AITwinChat";

export const metadata = {
  title: "Digital Twin Chat - Vikash Kumar",
  description: "Chat with an AI representation of Vikash Kumar running entirely in your browser via WebGPU and WebLLM.",
};

export default function ChatPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <Container>
        <div className="max-w-2xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Digital Twin</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            A fully client-side AI chat experience. This model runs entirely on your device&apos;s GPU,
            offering complete privacy and zero server latency while you explore my thoughts and work.
          </p>
        </div>
        
        <AITwinChat />
      </Container>
    </div>
  );
}
