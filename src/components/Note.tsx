import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Note as NoteType } from "./App";
import ReactMarkdown from "react-markdown";

type NoteProps = {
    notes: NoteType[]
    onDelete: (id: string) => void
}

export function Note({ notes, onDelete }: NoteProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const note = notes.find(n => n.id === id);

    if (!note) {
        return <h1>Note not found</h1>
    }

    function handleDelete() {
        if (note) {
            onDelete(note.id);
            navigate("/");
        }
    }

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="flex-wrap">
                            {note.tags.map(tag => (
                                <Badge key={tag.id} className="text-truncate">
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                 
                        <Button 
                            variant="outline-danger"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                        <Link to="/">
                            <Button variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    )
}