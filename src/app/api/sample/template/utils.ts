import { TTemplate } from "@/types/model/template"

export const mockTemplates: TTemplate[] = Array.from(
  { length: 100 },
  (_, i) => ({
    id: `${i + 1}`,
    code: `CODE-${i + 1}`,
    name: `Template ${i + 1}`,
    isActive: i % 3 !== 0,
    translation: {
      name: {
        en: `Template ${i + 1}`,
        vi: `Mẫu ${i + 1}`
      }
    },
    audit: {
      isDeleted: false,
      createdBy: "admin",
      updatedBy: "admin",
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 10000000)
      ).toISOString(),
      updatedAt: new Date(
        Date.now() - Math.floor(Math.random() * 1000000)
      ).toISOString()
    }
  })
)
