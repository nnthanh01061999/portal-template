import { API_SAMPLE_ENDPOINT, baseHeader } from "@/constants"

export default {
  "mock/json-placeholder": {
    url: "https://jsonplaceholder.typicode.com/posts",
    options: {
      method: "GET",
      headers: baseHeader
    }
  },
  "template/index": {
    url: `${API_SAMPLE_ENDPOINT}/template/index`,
    options: {
      method: "GET",
      headers: baseHeader
    }
  },
  "template/search/get": {
    url: `${API_SAMPLE_ENDPOINT}/template/search`,
    options: {
      method: "GET",
      headers: baseHeader
    }
  },
  "template/search/post": {
    url: `${API_SAMPLE_ENDPOINT}/template/search`,
    options: {
      method: "POST",
      headers: baseHeader
    }
  },
  "template/filter": {
    url: `${API_SAMPLE_ENDPOINT}/template/filter`,
    options: {
      method: "GET",
      headers: baseHeader
    }
  },
  "template/create": {
    url: `${API_SAMPLE_ENDPOINT}/template`,
    options: {
      method: "POST",
      headers: baseHeader
    }
  },
  "template/update": {
    url: `${API_SAMPLE_ENDPOINT}/template/:id`,
    options: {
      method: "PATCH",
      headers: baseHeader
    }
  },
  "template/delete": {
    url: `${API_SAMPLE_ENDPOINT}/template/:id`,
    options: {
      method: "DELETE",
      headers: baseHeader
    }
  }
} satisfies Record<string, ApiConfig>
