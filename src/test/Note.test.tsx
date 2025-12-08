import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Note } from '../components/Note'

describe('Note', () => {
    it('renders note title', () => {
        const mockNotes = [
            {
                id: '1',
                title: 'Test Note',
                markdown: 'This is a test note.',
                tags: []
            }
        ];
        
        const mockDelete = vi.fn();
        
        render(
            <MemoryRouter initialEntries={['/1']}>
                <Routes>
                    <Route path="/:id" element={<Note notes={mockNotes} onDelete={mockDelete} />} />
                </Routes>
            </MemoryRouter>
        );
        
        expect(screen.getByText('Test Note')).toBeInTheDocument();
    });
});