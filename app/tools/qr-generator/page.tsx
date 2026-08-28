import QRCodeGenerator from "@/components/tools/QRCodeGenerator";

export const metadata = {
  title: "QR Code Generator - Growtez",
  description: "Generate high-quality QR codes for your URLs instantly.",
};

export default function QRCodeGeneratorPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-5 flex items-center justify-center">
      <QRCodeGenerator />
    </div>
  );
}
