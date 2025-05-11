import TodoItem from './components/TodoItem';
import { Controller, useForm } from 'react-hook-form';
import { Button, InputAdornment, List, TextField } from '@mui/material';
import type { formData, Todo } from './index.types';
import { useLocalStorage } from 'usehooks-ts';
import AddIcon from '@mui/icons-material/Add';

function App() {
    const { control, getValues, handleSubmit } = useForm<formData>({
        defaultValues: {
            todo: '',
        },
    });
    const [todos, setValue] = useLocalStorage<Todo[]>('todos', []);
    const handleAddTodo = () => {
        setValue((prev) => {
            return [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    content: getValues('todo'),
                    isDone: false,
                },
            ];
        });
    };
    const handleDeleteTodo = (todo: Todo) => {
        setValue((prev) => prev.filter((item) => item.id !== todo.id));
    };
    const handleToggleTodo = (todo: Todo) => {
        setValue((prev) =>
            prev.map((item) =>
                item.id === todo.id ? { ...item, isDone: todo.isDone } : item
            )
        );
    };

    return (
        <div className="w-full">
            <h2 className="text-[32px] text-center font-bold">Todo List</h2>
            <div className="max-w-[400px] mx-auto">
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                    }}
                >
                    {todos.map((item) => (
                        <TodoItem
                            key={item.id}
                            todo={item}
                            onDelete={handleDeleteTodo}
                            onToggle={handleToggleTodo}
                        />
                    ))}
                </List>
                <div className="flex justify-center items-center gap-2">
                    <Controller
                        control={control}
                        name="todo"
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                            <TextField
                                fullWidth
                                {...field}
                                error={!!fieldState.error}
                                size="small"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button
                                                    variant="text"
                                                    onClick={handleSubmit(
                                                        handleAddTodo
                                                    )}
                                                >
                                                    <AddIcon />
                                                    Add
                                                </Button>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
