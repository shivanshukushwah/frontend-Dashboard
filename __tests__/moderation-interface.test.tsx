import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { ModerationInterface } from "@/components/moderation-interface"
import "@testing-library/jest-dom"

describe("ModerationInterface", () => {
  it("renders moderation interface with flagged content", () => {
    render(<ModerationInterface />)

    expect(screen.getByText("Content Moderation")).toBeInTheDocument()
    expect(screen.getByText("Flagged Content")).toBeInTheDocument()
    expect(screen.getByText("User Reports")).toBeInTheDocument()
    expect(screen.getByText("Moderation History")).toBeInTheDocument()
  })

  it("allows searching content", async () => {
    render(<ModerationInterface />)

    const searchInput = screen.getByPlaceholderText("Search content...")
    fireEvent.change(searchInput, { target: { value: "test search" } })

    expect(searchInput).toHaveValue("test search")
  })

  it("displays flagged content items", () => {
    render(<ModerationInterface />)

    expect(screen.getByText("cyberbullying")).toBeInTheDocument()
    expect(screen.getByText("harassment")).toBeInTheDocument()
    expect(screen.getByText("spam")).toBeInTheDocument()
  })

  it("allows approving and rejecting content", () => {
    render(<ModerationInterface />)

    const approveButtons = screen.getAllByText("Approve")
    const blockButtons = screen.getAllByText("Block")

    expect(approveButtons.length).toBeGreaterThan(0)
    expect(blockButtons.length).toBeGreaterThan(0)

    fireEvent.click(approveButtons[0])
    fireEvent.click(blockButtons[0])
  })

  it("switches between tabs correctly", async () => {
    render(<ModerationInterface />)

    const userReportsTab = screen.getByText("User Reports")
    fireEvent.click(userReportsTab)

    await waitFor(() => {
      expect(screen.getByText("User Report #1")).toBeInTheDocument()
    })
  })
})
