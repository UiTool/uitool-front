import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

type Answers = {
  answer: string;
  tags: string[];
}

type questionType = {
  id: string;
  question: string;
  answers: Answers[];
}

type GetQuestionResponse = {
  question: questionType;
}

export async function getQuestion(id: string): Promise<GetQuestionResponse> {

  const { data } = await api.get(`questions/${id}`);

  const question = data

  return { 
   question,
  };
}

export function useQuestion(id: string) {
  return useQuery(['question', id], () => getQuestion(id), {
    staleTime: 1000 * 60 * 1, // 1 minute
  })
}