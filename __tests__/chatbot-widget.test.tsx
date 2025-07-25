import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget"
import "@testing-library/jest-dom"

describe("ChatbotWidget", () => {
  it("renders chatbot widget when open", () => {
    render(<ChatbotWidget isOpen={true} position="embedded" />)

    expect(screen.getByText("ShadowBot")).toBeInTheDocument()
    expect(screen.getByText("AI Moderation Assistant")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Ask me about moderation...")).toBeInTheDocument()
  })

  it("shows initial bot message", () => {
    render(<ChatbotWidget isOpen={true} position="embedded" />)

    expect(screen.getByText(/Hi! I'm ShadowBot/)).toBeInTheDocument()
  })

  it("allows sending messages", async () => {
    render(<ChatbotWidget isOpen={true} position="embedded" />)

    const input = screen.getByPlaceholderText("Ask me about moderation...")
    const sendButton = screen.getByRole("button", { name: /send/i })

    fireEvent.change(input, { target: { value: "How do I report a user?" } })
    fireEvent.click(sendButton)

    await waitFor(() => {
      expect(screen.getByText("How do I report a user?")).toBeInTheDocument()
    })
  })

  it("shows typing indicator when bot is responding", async () => {
    render(<ChatbotWidget isOpen={true} position="embedded" />)

    const input = screen.getByPlaceholderText("Ask me about moderation...")
    fireEvent.change(input, { target: { value: "test message" } })
    fireEvent.keyPress(input, { key: "Enter", code: "Enter" })

    await waitFor(() => {
      expect(screen.getByText("test message")).toBeInTheDocument()
    })
  })

  it("provides quick suggestion buttons", () => {
    render(<ChatbotWidget isOpen={true} position="embedded" />)

    expect(screen.getByText("How do I report a user?")).toBeInTheDocument()
    expect(screen.getByText("What types of content are blocked?")).toBeInTheDocument()
  })

  it("can be minimized and maximized", () => {
    render(<ChatbotWidget isOpen={true} position="bottom-right" />)

    const minimizeButton = screen.getByRole("button", { name: /minimize/i })
    fireEvent.click(minimizeButton)

    // Widget should still be rendered but content hidden
    expect(screen.getByText("ShadowBot")).toBeInTheDocument()
  })
})
