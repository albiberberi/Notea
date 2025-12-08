import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { NoteForm } from '../components/NoteForm'

describe('NoteForm', () => {
  it('renders title input', () => {
    const mockSubmit = vi.fn()
    const mockAddTag = vi.fn()
    render(
      <BrowserRouter>
        <NoteForm 
          onSubmit={mockSubmit} 
          onAddTag={mockAddTag} 
          availableTags={[]} 
        />
      </BrowserRouter>
    )
    
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
  })
})