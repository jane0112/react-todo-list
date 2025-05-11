import {
    Checkbox,
    FormControlLabel,
    IconButton,
    ListItem,
} from '@mui/material';
import type { Todo } from '../index.types';
import { Controller, useForm } from 'react-hook-form';
import { useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

type TodoItemProps = {
    todo: Todo;
    onDelete: (todo: Todo) => void;
    onToggle: (todo: Todo) => void;
};

const TodoItem = ({ todo, onDelete, onToggle }: TodoItemProps) => {
    const { control, watch } = useForm({
        defaultValues: { isDone: todo.isDone },
    });
    const isDone = watch('isDone');
    const getClassName = useMemo(() => {
        return isDone ? 'line-through text-gray-300' : '';
    }, [isDone]);

    return (
        <ListItem
            key={todo.id}
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="delete"
                    color="error"
                    onClick={() => onDelete(todo)}
                >
                    <DeleteIcon />
                </IconButton>
            }
            className="flex justify-between"
        >
            <Controller
                control={control}
                name="isDone"
                render={({ field }) => (
                    <FormControlLabel
                        label={
                            <span className={getClassName}>{todo.content}</span>
                        }
                        control={
                            <Checkbox
                                {...field}
                                onChange={(_e, checked) => {
                                    field.onChange(checked);
                                    onToggle({ ...todo, isDone: checked });
                                }}
                            />
                        }
                    />
                )}
            />

            {/* <Button variant="text" color="error" onClick={() => onDelete(todo)}>
                Delete
            </Button> */}
        </ListItem>
    );
};

export default TodoItem;
