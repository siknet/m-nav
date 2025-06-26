# M-Nav: Notion-powered Navigation Site

A navigation site that displays content from a Notion database, built with Next.js 15.

## Features

- Fetches data from a Notion page and its databases
- Displays navigation items organized by type/category
- Responsive design with Tailwind CSS
- Dark mode support

## Setup

1. Clone the repository:

```bash
git clone https://github.com/busyhe/m-nav.git
cd m-nav
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a Notion integration:
   - Go to [Notion Developers](https://www.notion.so/my-integrations)
   - Create a new integration
   - Copy the "Internal Integration Token"

4. Share your Notion page with the integration:
   - Open your Notion page
   - Click "Share" in the top right
   - Add your integration using the email address shown in the integration settings

5. Create a `.env.local` file in the `apps/web` directory:

```
NOTION_PAGE_ID=your_notion_page_id
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `your_notion_page_id` with your Notion page ID (the part of the URL after `notion.so/` and before any `?` character).

Replace `G-XXXXXXXXXX` with your Google Analytics Measurement ID, or remove/leave empty to disable Google Analytics.

## Google Analytics Configuration

Google Analytics is conditionally enabled based on the `NEXT_PUBLIC_GA_ID` environment variable:

- **To enable**: Set `NEXT_PUBLIC_GA_ID` to your Google Analytics Measurement ID (e.g., `G-XXXXXXXXXX`)
- **To disable**: Remove the variable or leave it empty

The Google Analytics integration will only load when the environment variable is present and not empty, ensuring no tracking occurs in development or when analytics are not desired.

## Notion Database Structure

Your Notion page should contain one or more databases with the following properties:

- **Title/Name**: The name of the navigation item
- **Type/Category**: Used to group navigation items
- **Description/Desc**: A short description of the item (optional)
- **Link/URL**: The URL to navigate to when clicking the item

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Adding UI Components

To add shadcn/ui components to your app, run:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the UI components in the `packages/ui/src/components` directory.

## Using Components

To use the components in your app, import them from the `ui` package:

```tsx
import { Button } from "@m-nav/ui/components/button"
```
