import http from "http";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// For making this SPA we would always serve index.html for any html request

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });

  const pathName = req.url;
  let htmlPath;
  let contentType = ""; // "script", "css" and "html"
  if (pathName.includes(".js")) {
    const scriptName = pathName?.split("/")?.[2];
    htmlPath = path.join(__dirname, "../dist", scriptName);
    contentType = "script";
  } else if (pathName.includes(".css")) {
    htmlPath = path.join(__dirname, "../public", pathName.split("/")[1]);
    contentType = "style";
  } else if (pathName.includes("ico")) {
    htmlPath = "";
    console.log("icon");
    htmlPath = path.join(__dirname, "../public", "index.html");
  } else if (pathName.includes("templates")) {
    const templateName = pathName?.split("/")?.[2];
    htmlPath = path.join(__dirname, "../templates", templateName);
  } else {
    htmlPath = path.join(__dirname, "../public", "index.html");
    contentType = "html";
  }

  fs.readFile(htmlPath, "utf8", (err, content) => {
    if (err || !htmlPath) {
      // show error page
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error loading the file");
    } else {
      res.writeHead(200, {
        "Content-Type":
          contentType === "script"
            ? "application/javascript"
            : contentType === "style"
            ? "text/css"
            : "text/html",
      });
      res.end(content);
    }
  });
});

router.listen(3000, () => {
  console.log("Server running on port 3000");
});
