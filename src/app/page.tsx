"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [url, setUrl] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const urlParam = searchParams.get("url") || "";
    const idParam = searchParams.get("id") || "";
    setUrl(urlParam);
    setId(idParam);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (url) params.set("url", url);
    if (id) params.set("id", id);

    // Update the URL
    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-[auto_auto_min-content] gap-2 items-end"
    >
      <div>
        <label htmlFor="url" className="block font-medium">
          Please type in your URL:
        </label>
        <Input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL..."
          required
        />
      </div>
      <div>
        <label htmlFor="id" className="block font-medium">
          Please type in your ID:
        </label>
        <Input
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter ID..."
          required
        />
      </div>
      <div>
        <Button type="submit">Search Now!</Button>
      </div>
    </form>
  );
}
