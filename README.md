# Pixel Perfect Rebuild

have attached the complete Framer-exported page.tsx containing the full website inside a large dangerouslySetInnerHTML block.

Treat this Framer HTML as the SOURCE OF TRUTH for the design.

Analyze the entire Framer HTML and rebuild the website as a clean, maintainable React + TypeScript application.

DO NOT render or wrap the HTML using dangerouslySetInnerHTML.

DO NOT copy the Framer runtime or generated wrappers.

Instead, recreate the entire UI as native React components.

Requirements:

• Preserve the visual appearance as closely as possible.

• Match the layout pixel-for-pixel where practical.

• Keep all spacing, typography, colors, gradients, shadows, border radius, and responsive behavior.

• Recreate all SVGs, backgrounds, and animations using React, CSS, Framer Motion or GSAP.

• Keep all hover effects and transitions.

• Keep accessibility.

• Use semantic HTML.

• Produce clean, reusable TypeScript components.

• Remove all Framer-specific code.

Organize the project as:

app/

components/

styles/

public/

Create reusable components for:

Navbar

Hero

Logo Ticker

Features

Integrations

Testimonials

Pricing

FAQ

Footer

If images, fonts, SVGs, or assets are referenced in the Framer HTML, preserve them and reconnect them properly in the React project.

Do NOT redesign the page.

Do NOT simplify the UI.

Do NOT change the layout.

Do NOT change animations unless absolutely necessary.

If some Framer-specific functionality cannot be copied directly, recreate an equivalent implementation that looks visually identical.

The final result should be a production-ready Next.js + React + TypeScript project with no dangerouslySetInnerHTML and no dependency on Framer.

IMPORTANT:

Use the attached Framer HTML as the reference implementation for every section. Reconstruct the website section-by-section from the HTML instead of injecting it directly. The final website should look and behave like the original while being fully editable and maintainable.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cb664642-9baf-4cd6-8654-470b2ce22909).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
