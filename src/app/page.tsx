import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <p>Please Type in your url:</p>
        <Input />
      </div>
      <div>
        <p>Please type in your id:</p>
        <Input />
      </div>
    </div>
  );
}
