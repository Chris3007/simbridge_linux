const fs = require("fs");
const path = require("path");

const targetFile = path.resolve(__dirname, "node_modules/gl/angle/src/common/angleutils.h");
const includeLine = "#include <cstdint>\n";

try {
  let content = fs.readFileSync(targetFile, "utf8");
  if (!content.includes(includeLine)) {
    // Insert after `#include <vector>` or at a known location
    content = content.replace(/#include <vector>\n/, match => match + includeLine);
    fs.writeFileSync(targetFile, content, "utf8");
    console.log("Patched angleutils.h with #include <cstdint>");
  } else {
    console.log("Patch already applied to angleutils.h");
  }
} catch (err) {
  console.warn("Could not patch gl module automatically:", err.message);
}
