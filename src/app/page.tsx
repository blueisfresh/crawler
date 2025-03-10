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
  const [scrapedData, setScrapedData] = useState<string | null>(null);

  useEffect(() => {
    const urlParam = searchParams.get("url") || "";
    const idParam = searchParams.get("id") || "";
    setUrl(urlParam);
    setId(idParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/scrape?url=${encodeURIComponent(url)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      setScrapedData(`Page Title: ${data.title}`);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setScrapedData("Error fetching data");
    }
  };

  return (
    <>
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

      {scrapedData && <p className="mt-4">{scrapedData}</p>}
    </>
  );
}
