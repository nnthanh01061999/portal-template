import { Preview } from "@storybook/nextjs-vite"

import "../src/app/globals.css"

import React from "react"
import { themes } from "storybook/theming"

import messages from "../messages/en.json"
import ClientProvider from "../src/components/providers/client-provider"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    layout: "centered",
    nextjs: {
      appDirectory: true
    },
    docs: {
      theme: themes.light
    }
  },
  decorators: [
    (Story) => {
      const userAgent = "test"
      return (
        <ClientProvider
          locale="en"
          messages={messages}
          userAgent={userAgent}
          devTools={false}>
          <div className="p-4 w-full">
            <Story />
          </div>
        </ClientProvider>
      )
    }
  ]
}

export default preview
