import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="py-16 sm:py-24 animate-pulse">
      <Container size="narrow">
        <div className="space-y-6 text-center">
          <div className="mx-auto h-7 w-32 rounded-full bg-hh-line/40" />
          <div className="mx-auto h-12 w-3/4 max-w-md rounded-2xl bg-hh-line/30" />
          <div className="mx-auto h-4 w-full max-w-lg rounded-xl bg-hh-line/20" />
          <div className="mx-auto h-4 w-2/3 max-w-sm rounded-xl bg-hh-line/20" />
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="h-48 rounded-[24px] border border-hh-line bg-white/60 p-6 space-y-3">
            <div className="h-6 w-1/3 rounded-lg bg-hh-line/30" />
            <div className="h-4 w-full rounded bg-hh-line/20" />
            <div className="h-4 w-2/3 rounded bg-hh-line/20" />
          </div>
          <div className="h-48 rounded-[24px] border border-hh-line bg-white/60 p-6 space-y-3">
            <div className="h-6 w-1/3 rounded-lg bg-hh-line/30" />
            <div className="h-4 w-full rounded bg-hh-line/20" />
            <div className="h-4 w-2/3 rounded bg-hh-line/20" />
          </div>
        </div>
      </Container>
    </div>
  );
}
