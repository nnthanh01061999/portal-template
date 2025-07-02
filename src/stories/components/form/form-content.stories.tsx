import type { Meta, StoryObj } from "@storybook/react"
import { Button, Form, message } from "antd"
import { useState } from "react"

import FormContent from "@/components/forms/form-content"
import { TFormItemConfig } from "@/types/form"

// Create a wrapper component to provide Form context
interface FormContentDemoProps {
  fields: TFormItemConfig[]
  gutter?: number
  showSubmitButton?: boolean
}

const FormContentDemo = ({
  fields,
  gutter = 16,
  showSubmitButton = false
}: FormContentDemoProps) => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleValuesChange = (changedValues: any, allValues: any) => {
    setFormValues(allValues)
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      const values = await form.validateFields()
      console.log("Form submitted with values:", values)
      message.success("Form submitted successfully!")
      // In a real app, you would send the data to your API here
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    } catch (error) {
      console.error("Form validation failed:", error)
      message.error("Please check the form for errors")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-4 space-y-6">
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        onFinish={handleSubmit}>
        <FormContent fields={fields} gutter={gutter} />

        {showSubmitButton && (
          <div className="mt-4 flex justify-end">
            <Button type="primary" htmlType="submit" loading={submitting}>
              Submit Form
            </Button>
          </div>
        )}
      </Form>

      <div className="p-4 border rounded bg-gray-50">
        <h3 className="text-sm font-medium mb-2">Form Values:</h3>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>
    </div>
  )
}

const meta = {
  title: "Forms/FormContent",
  component: FormContentDemo,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    fields: { control: "object" },
    gutter: { control: "number" },
    showSubmitButton: { control: "boolean" }
  },
  decorators: [
    (Story) => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof FormContentDemo>

export default meta
type Story = StoryObj<typeof meta>

// Basic form with different field types
export const BasicForm: Story = {
  args: {
    fields: [
      {
        name: "name",
        label: "Name",
        componentType: "INPUT",
        colSpan: 12,
        rules: [{ required: true, message: "Please enter your name" }]
      },
      {
        name: "email",
        label: "Email",
        componentType: "INPUT",
        colSpan: 12,
        rules: [
          {
            required: true,
            type: "email",
            message: "Please enter a valid email"
          }
        ]
      },
      {
        name: "age",
        label: "Age",
        componentType: "NUMBER",
        colSpan: 6
      },
      {
        name: "gender",
        label: "Gender",
        componentType: "SELECT",
        colSpan: 6,
        childrenProps: {
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" }
          ]
        }
      },
      {
        name: "birthdate",
        label: "Birth Date",
        componentType: "DATE",
        colSpan: 12
      },
      {
        name: "bio",
        label: "Biography",
        componentType: "TEXTAREA",
        colSpan: 24
      },
      {
        name: "subscribe",
        label: "Subscribe to newsletter",
        componentType: "CHECKBOX",
        colSpan: 24,
        valuePropName: "checked"
      }
    ] as TFormItemConfig[]
  }
}

// Form with different column spans
export const DifferentColumnSpans: Story = {
  args: {
    fields: [
      {
        name: "field1",
        label: "Full Width Field",
        componentType: "INPUT",
        colSpan: 24
      },
      {
        name: "field2",
        label: "Half Width Field",
        componentType: "INPUT",
        colSpan: 12
      },
      {
        name: "field3",
        label: "Half Width Field",
        componentType: "INPUT",
        colSpan: 12
      },
      {
        name: "field4",
        label: "One-Third Width Field",
        componentType: "INPUT",
        colSpan: 8
      },
      {
        name: "field5",
        label: "One-Third Width Field",
        componentType: "INPUT",
        colSpan: 8
      },
      {
        name: "field6",
        label: "One-Third Width Field",
        componentType: "INPUT",
        colSpan: 8
      },
      {
        name: "field7",
        label: "Quarter Width Field",
        componentType: "INPUT",
        colSpan: 6
      },
      {
        name: "field8",
        label: "Quarter Width Field",
        componentType: "INPUT",
        colSpan: 6
      },
      {
        name: "field9",
        label: "Quarter Width Field",
        componentType: "INPUT",
        colSpan: 6
      },
      {
        name: "field10",
        label: "Quarter Width Field",
        componentType: "INPUT",
        colSpan: 6
      }
    ] as TFormItemConfig[]
  }
}

// Form with offset columns
export const WithOffsetColumns: Story = {
  args: {
    fields: [
      {
        name: "field1",
        label: "Centered Field (12 cols with offset 6)",
        componentType: "INPUT",
        colSpan: 12,
        offset: 6
      },
      {
        name: "field2",
        label: "Left Field (8 cols)",
        componentType: "INPUT",
        colSpan: 8
      },
      {
        name: "field3",
        label: "Right Field (8 cols with offset 8)",
        componentType: "INPUT",
        colSpan: 8,
        offset: 8
      },
      {
        name: "field4",
        label: "Left Field with Offset (6 cols with offset 2)",
        componentType: "INPUT",
        colSpan: 6,
        offset: 2
      },
      {
        name: "field5",
        label: "Right Field with Offset (6 cols with offset 8)",
        componentType: "INPUT",
        colSpan: 6,
        offset: 8
      }
    ] as TFormItemConfig[]
  }
}

// Form with different gutter
export const WithDifferentGutter: Story = {
  args: {
    gutter: 32,
    fields: [
      {
        name: "field1",
        label: "Field 1",
        componentType: "INPUT",
        colSpan: 12
      },
      {
        name: "field2",
        label: "Field 2",
        componentType: "INPUT",
        colSpan: 12
      },
      {
        name: "field3",
        label: "Field 3",
        componentType: "INPUT",
        colSpan: 12
      },
      {
        name: "field4",
        label: "Field 4",
        componentType: "INPUT",
        colSpan: 12
      }
    ] as TFormItemConfig[]
  }
}

// Form with custom class names
export const WithCustomClassNames: Story = {
  args: {
    fields: [
      {
        name: "field1",
        label: "Field with Custom Class",
        componentType: "INPUT",
        colSpan: 12,
        className: "bg-blue-50 rounded",
        colClassName: "border-l-4 border-blue-500 pl-2"
      },
      {
        name: "field2",
        label: "Another Field with Custom Class",
        componentType: "INPUT",
        colSpan: 12,
        className: "bg-green-50 rounded",
        colClassName: "border-l-4 border-green-500 pl-2"
      },
      {
        name: "field3",
        label: "Field with Different Custom Class",
        componentType: "TEXTAREA",
        colSpan: 24,
        className: "bg-yellow-50 rounded",
        colClassName: "border-l-4 border-yellow-500 pl-2"
      }
    ] as TFormItemConfig[]
  }
}

// Complex registration form example
export const RegistrationForm: Story = {
  args: {
    fields: [
      {
        name: "firstName",
        label: "First Name",
        componentType: "INPUT",
        colSpan: 12,
        rules: [{ required: true, message: "Please enter your first name" }]
      },
      {
        name: "lastName",
        label: "Last Name",
        componentType: "INPUT",
        colSpan: 12,
        rules: [{ required: true, message: "Please enter your last name" }]
      },
      {
        name: "email",
        label: "Email Address",
        componentType: "INPUT",
        colSpan: 12,
        rules: [
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" }
        ]
      },
      {
        name: "phone",
        label: "Phone Number",
        componentType: "INPUT",
        colSpan: 12,
        rules: [{ required: true, message: "Please enter your phone number" }]
      },
      {
        name: "birthdate",
        label: "Date of Birth",
        componentType: "DATE",
        colSpan: 12,
        rules: [{ required: true, message: "Please select your date of birth" }]
      },
      {
        name: "gender",
        label: "Gender",
        componentType: "RADIO",
        colSpan: 12,
        childrenProps: {
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" }
          ]
        }
      },

      {
        name: "street",
        label: "Street Address",
        componentType: "INPUT",
        colSpan: 24
      },
      {
        name: "city",
        label: "City",
        componentType: "INPUT",
        colSpan: 8
      },
      {
        name: "state",
        label: "State/Province",
        componentType: "SELECT",
        colSpan: 8,
        childrenProps: {
          options: [
            { value: "ca", label: "California" },
            { value: "ny", label: "New York" },
            { value: "tx", label: "Texas" },
            { value: "fl", label: "Florida" },
            { value: "il", label: "Illinois" }
          ]
        }
      },
      {
        name: "zipCode",
        label: "Zip/Postal Code",
        componentType: "INPUT",
        colSpan: 8
      },
      {
        name: "country",
        label: "Country",
        componentType: "SELECT",
        colSpan: 12,
        childrenProps: {
          options: [
            { value: "us", label: "United States" },
            { value: "ca", label: "Canada" },
            { value: "uk", label: "United Kingdom" },
            { value: "au", label: "Australia" }
          ]
        }
      },

      {
        name: "username",
        label: "Username",
        componentType: "INPUT",
        colSpan: 12,
        rules: [{ required: true, message: "Please enter a username" }]
      },
      {
        name: "password",
        label: "Password",
        componentType: "INPUT",
        colSpan: 12,
        childrenProps: {
          type: "password"
        },
        rules: [{ required: true, message: "Please enter a password" }]
      },
      {
        name: "interests",
        label: "Interests",
        componentType: "SELECT",
        colSpan: 24,
        childrenProps: {
          mode: "multiple",
          options: [
            { value: "sports", label: "Sports" },
            { value: "music", label: "Music" },
            { value: "movies", label: "Movies" },
            { value: "books", label: "Books" },
            { value: "technology", label: "Technology" },
            { value: "travel", label: "Travel" },
            { value: "food", label: "Food & Cooking" }
          ]
        }
      },
      {
        name: "bio",
        label: "Short Bio",
        componentType: "TEXTAREA",
        colSpan: 24
      },

      {
        name: "newsletter",
        label: "Subscribe to newsletter",
        componentType: "CHECKBOX",
        colSpan: 24,
        valuePropName: "checked"
      },
      {
        name: "termsAgreed",
        label: "I agree to the terms and conditions",
        componentType: "CHECKBOX",
        colSpan: 24,
        valuePropName: "checked",
        rules: [
          {
            validator: (_: any, value: boolean) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("You must agree to the terms and conditions")
                  )
          }
        ]
      }
    ] as TFormItemConfig[]
  }
}

// Form with submission handling
export const FormWithSubmission: Story = {
  args: {
    showSubmitButton: true,
    fields: [
      {
        name: "username",
        label: "Username",
        componentType: "INPUT",
        colSpan: 12,
        rules: [{ required: true, message: "Please enter your username" }]
      },
      {
        name: "email",
        label: "Email",
        componentType: "INPUT",
        colSpan: 12,
        rules: [
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" }
        ]
      },
      {
        name: "password",
        label: "Password",
        componentType: "INPUT",
        colSpan: 12,
        childrenProps: {
          type: "password"
        },
        rules: [
          { required: true, message: "Please enter your password" },
          { min: 8, message: "Password must be at least 8 characters" }
        ]
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        componentType: "INPUT",
        colSpan: 12,
        childrenProps: {
          type: "password"
        },
        dependencies: ["password"],
        rules: [
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error("The two passwords do not match"))
            }
          })
        ]
      },
      {
        name: "agreeToTerms",
        label: "I agree to the terms and conditions",
        componentType: "CHECKBOX",
        colSpan: 24,
        valuePropName: "checked",
        rules: [
          {
            validator: (_: any, value: boolean) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("You must agree to the terms and conditions")
                  )
          }
        ]
      }
    ] as TFormItemConfig[]
  }
}
