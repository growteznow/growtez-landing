import UrlShortener from "@/components/tools/UrlShortener";

export const metadata = {
  title: "URL Shortener - Growtez",
  description: "Shorten and manage your links easily with a single click.",
};

export default function UrlShortenerPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-5 flex items-center justify-center">
      <UrlShortener />
    </div>
  );
}
