import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';
import {
  todosResponseSchema,
  todoResponseSchema,
  type Todo,
  type TodoFormData,
} from '../schemas/validation';

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async (): Promise<Todo[]> => {
      const response = await api.get('/todos');
      const parsed = todosResponseSchema.parse(response.data);
      return parsed.data;
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TodoFormData): Promise<Todo> => {
      const response = await api.post('/todos', data);
      const parsed = todoResponseSchema.parse(response.data);
      return parsed.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Todo> }): Promise<Todo> => {
      const response = await api.put(`/todos/${id}`, data);
      const parsed = todoResponseSchema.parse(response.data);
      return parsed.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};