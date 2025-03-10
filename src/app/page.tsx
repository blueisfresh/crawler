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
    console.log("Inside useEffect");

    const urlParam = searchParams.get("url") || "";
    const idParam = searchParams.get("id") || "";

    setUrl(urlParam);
    setId(idParam);

    if (urlParam && idParam) {
      console.log(`Searching for URL: ${urlParam}, ID: ${idParam}`);
      fetchScrapedData(urlParam, idParam);
    } else {
      console.log("URL or ID missing, skipping API call.");
    }
  }, [searchParams]);

  const fetchScrapedData = async (url: string, id: string) => {
    try {
      const response = await fetch(`/api/scrape?url=${url}&id=${id}`);
      const text = await response.text(); // Get raw response
      console.log("Raw API response:", text);

      const data = JSON.parse(text); // Try parsing it as JSON

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      console.log("API Data Received:", data);
      setScrapedData(`Extracted Text: ${data.elementText}`);
    } catch (error) {
      console.error("Error fetching data:", error);
      setScrapedData("Error fetching data.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?url=${url}&id=${id}`);
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
