import ColorPicker from "@/components/tools/ColorPicker";

export const metadata = {
  title: "Advanced Color Picker - Growtez",
  description: "Pick, tweak, and copy colors with our advanced color tool.",
};

export default function ColorPickerPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-5 flex items-center justify-center">
      <ColorPicker />
    </div>
  );
}
