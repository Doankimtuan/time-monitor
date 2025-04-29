const test = async () => {
  async function fetchSocials(solanaAddress) {
    const input = encodeURIComponent(JSON.stringify({ solanaAddress }));
    const url = `https://time.fun/api/trpc/creators.getSocials?input=${input}`;

    const res = await fetch(url, { method: "GET" });
    console.log("HTTP", res.status, res.statusText);
    const body = await res.text();
    console.log("BODY:", body); // <— show us what the server actually returned

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const payload = JSON.parse(body);
    if (payload.error) {
      console.error("tRPC error:", payload.error);
      throw new Error(payload.error.message);
    }

    return payload.result.data;
  }

  // test:
  fetchSocials("9qSqvNXdXxVQfsBSMQookZdGFQWydbwJtZLdR5M7wG1o")
    .then((info) => console.log("SOCIALS:", info))
    .catch((err) => console.error("FAILED:", err));
};

test();
