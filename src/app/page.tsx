import { AuthPanel } from "@/domains/Auth/components/AuthPanel";
import { ErrorBoundary } from "react-error-boundary";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute top-0 right-0 flex h-screen w-1/2 items-center justify-center bg-black/80">
        <ErrorBoundary fallback={<p> error was occur</p>}>
          <AuthPanel />
        </ErrorBoundary>
      </div>
    </div>
  );
}
