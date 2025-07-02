# Storybook for CMI Admin Portal

This project uses [Storybook](https://storybook.js.org/) to develop and document UI components in isolation.

## Getting Started

To run Storybook locally:

```bash
# Using Node.js v20+
pnpm storybook
```

Storybook will be available at http://localhost:6006

## Creating Stories

Stories are located alongside their components with the `.stories.tsx` extension. For example:

- `src/components/formats/boolean-icon.tsx` - Component
- `src/components/formats/boolean-icon.stories.tsx` - Stories

### Basic Story Template

```tsx
import type { Meta, StoryObj } from "@storybook/react"

import YourComponent from "./your-component"

const meta = {
  title: "Category/YourComponent",
  component: YourComponent,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    // Define controls for your component props
    someProp: { control: "text" }
  }
} satisfies Meta<typeof YourComponent>

export default meta
type Story = StoryObj<typeof meta>

// Define different variations of your component
export const Default: Story = {
  args: {
    someProp: "Default value"
  }
}

export const AnotherVariant: Story = {
  args: {
    someProp: "Another value"
  }
}
```

## Building for Production

To build Storybook for production deployment:

```bash
pnpm build-storybook
```

This will generate a static site in the `storybook-static` directory that can be deployed to any static hosting service.
