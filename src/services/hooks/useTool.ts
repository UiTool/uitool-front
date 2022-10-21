import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

type toolsType = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  categories: string[];
};


type GetToolResponse = {
  tool: toolsType;
}

export async function getTool(id: string): Promise<GetToolResponse> {

  const { data } = await api.get(`tools/${id}`);

  const tool = data

  return { 
   tool,
  };
}

export function useTool(id: string) {
  return useQuery(['tool', id], () => getTool(id), {
    staleTime: 1000 * 60 * 1, // 1 minute
  })
}