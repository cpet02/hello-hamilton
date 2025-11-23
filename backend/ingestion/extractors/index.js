// ingestion/extractors/index.js
// Registry of all extractors available to the system.
// Later you'll add real extractors here.

import * as exampleExtractor from "./exampleExtractor.js";

export const extractors = {
  example: exampleExtractor
};
