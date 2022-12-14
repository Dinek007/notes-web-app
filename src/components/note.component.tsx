import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { borderRadius } from "@mui/system";
import { useState } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { notesActions } from "../redux/notes/notes.slice";
import { NoteModel } from "../swagger/api";
import { Resizable } from "react-resizable"
import { Rnd } from "react-rnd";
export interface NoteComponentProps {
    note: NoteModel
}

export const NoteComponent: React.FC<NoteComponentProps> = ({
    note
}) => {
    const dispatch = useDispatch()

    const [noteWidth, setNoteWidth] = useState<number>(note.width)
    const [noteHeight, setNoteHeight] = useState<number>(note.height)
    const [noteColor, setNoteColor] = useState<string>(note.color)
    const [noteX, setNoteX] = useState<number>(note.x)
    const [noteY, setNoteY] = useState<number>(note.y)

    type DraggableEventHandler = (e: Event, data: DraggableData) => void | false;
    type DraggableData = {
        node: HTMLElement,
        // lastX + deltaX === x
        x: number, y: number,
        deltaX: number, deltaY: number,
        lastX: number, lastY: number
    };

    type ResizeCallbackData = {
        node: HTMLElement,
        size: { width: number, height: number },
    };

    const handleDrag = (x: number, y: number) => {
        setNoteX(x)
        setNoteY(y)
        dispatch(notesActions.updateNote({ id: note.id, noteElements: { x, y } }))
    }

    const handleResize = (widthSt: string, heightSt: string) => {
        const width = Number(widthSt.split('px')[0])
        const height = Number(heightSt.split('px')[0])

        dispatch(notesActions.updateNote({ id: note.id, noteElements: { width, height } }))
    }

    return (
        <Rnd
            size={{ width: noteWidth, height: noteHeight }}
            position={{ x: noteX, y: noteY }}
            onDragStop={(e, d) => { handleDrag(d.x, d.y) }}
            onResizeStop={(e, direction, ref, delta, position) => {
                handleResize(ref.style.width, ref.style.height)
            }}
        >


            <Box sx={{
                width: `${note.width}px`,
                height: `${note.height}px`,
                backgroundColor: `${note.color}`,
                borderRadius: '0px, 0px, 0px, 0px',
                color: '#000000'
            }}>
                <Box
                    className="handle"
                    sx={{
                        background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(217, 217, 217, 0.375) 50%, #D9D9D9 100%)',
                        backgroundBlendMode: 'multiply',
                        height: '20px',
                        textAlign: 'center'
                    }}>
                    <Typography variant='h6'>
                        {note.name}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        padding: '15px'
                    }}
                >
                    <Typography variant='h6'>
                        {note.content}
                    </Typography>
                </Box>
            </Box >
        </Rnd >
    );
}