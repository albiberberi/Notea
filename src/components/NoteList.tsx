import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import type { Note, Tag } from "./App";

type NoteListProps = {
    availableTags: Tag[]
    notes: Note[]
    onDeleteNote: (id: string) => void
}

export function NoteList({ availableTags, notes, onDeleteNote }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 || selectedTags.every(tag => 
                    note.tags.some(noteTag => noteTag.id === tag.id)
                ))
            )
        })
    }, [title, selectedTags, notes])

    return (
        <>
            {/* Hero Section with Logo and Buttons */}
            <div className="text-center mb-5 py-4">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <img 
                        src="/src/assets/Notea_Logo.png" 
                        alt="Notea Logo"
                        style={{
                            maxWidth: '200px',
                            height: 'auto',
                            marginBottom: '2rem'
                        }}
                    />
                    <Stack gap={3} direction="horizontal" className="justify-content-center">
                        <Link to="/new">
                            <Button variant="primary" size="lg" 
                            style={{ 
                                backgroundColor: '#19976dff',
                                borderColor: '#083b2dff'
                                    }}> 
                                Create New Note
                            </Button>
                        </Link>
                        
                    </Stack>
                </div>
            </div>

            {/* Filter Section */}
            <div className="mb-4 p-4 bg-light rounded-3 shadow-sm">
                <h5 className="mb-3 text-center">Filter Your Notes</h5>
                <Form>
                    <Row className="g-3">
                        <Col md={6}>
                            <Form.Group controlId="title">
                                <Form.Label>Search by Title</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={title} 
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Enter note title..."
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="tags">
                                <Form.Label>Filter by Tags</Form.Label>
                                <ReactSelect
                                    value={selectedTags.map(tag => {
                                        return { label: tag.label, value: tag.id }
                                    })}
                                    options={availableTags.map(tag => {
                                        return { label: tag.label, value: tag.id }
                                    })}
                                    onChange={tags => {
                                        setSelectedTags(tags.map(tag => {
                                            return { label: tag.label, id: tag.value }
                                        }))
                                    }}
                                    isMulti
                                    placeholder="Select tags..."
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </div>

            {/* Notes Count */}
            {filteredNotes.length > 0 && (
                <div className="mb-3">
                    <p className="text-muted">
                        Showing {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
                    </p>
                </div>
            )}

            {/* Notes Grid */}
            {filteredNotes.length === 0 ? (
                <div className="text-center py-5">
                    <h3 className="text-muted">No notes found</h3>
                    <p className="text-muted">Create your first note to get started!</p>
                    <Link to="/new">
                        <Button variant="primary" className="mt-3"
                        style={{ 
                                backgroundColor: '#19976dff',
                                borderColor: '#083b2dff'
                                    }}>
                            Create Note
                        </Button>
                    </Link>
                </div>
            ) : (
                <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
                    {filteredNotes.map(note => (
                        <Col key={note.id}>
                            <NoteCard id={note.id} title={note.title} tags={note.tags} onDelete={onDeleteNote} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

function NoteCard({ id, title, tags, onDelete }: { id: string, title: string, tags: Tag[], onDelete: (id: string) => void }) {
    return (
        <Card className="h-100 shadow-sm hover-shadow transition" style={{ 
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        }}>
            <Card.Body className="d-flex flex-column">
                <div className="flex-grow-1">
                    <h5 className="card-title text-center mb-3 fw-bold">{title}</h5>
                    {tags.length > 0 && (
                        <Stack gap={2} direction="horizontal" className="justify-content-center flex-wrap mb-3">
                            {tags.map(tag => (
                                <Badge key={tag.id} bg="info" className="text-truncate">
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </div>
                <Stack gap={2} direction="horizontal" className="justify-content-center mt-auto">
                    <Link to={`/${id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="primary" size="sm" className="px-3" style={{ 
                                backgroundColor: '#19976dff',
                                borderColor: '#083b2dff'
                                    }}>
                             View
                        </Button>
                    </Link>
                    <Button 
                        variant="outline-danger" 
                        size="sm"
                        className="px-3"
                        onClick={(e) => {
                            e.preventDefault();
                            if (window.confirm('Are you sure you want to delete this note?')) {
                                onDelete(id);
                            }
                        }}
                    >
                        Delete
                    </Button>
                </Stack>
            </Card.Body>
        </Card>
    )
}