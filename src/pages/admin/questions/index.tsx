import { GetServerSideProps, NextPage } from "next";
import { HeaderAdmin } from "../../../components/admin/headerAdmin";
import { SideBarAdmin } from "../../../components/admin/sideBarAdmin";
import { useQuery } from "react-query";

import { MdAddBox, MdOutlineDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";

import styles from "../styles.module.scss";
import questions from "./styles.module.scss";
import Link from "next/link";
import { api } from "../../../services/api";
import { queryClient } from "../../../services/queryClient";
import { getSession, useSession } from "next-auth/react";

type Answer = {
  answer: string;
  tags: string[];
};

type questionType = {
  id: string;
  question: string;
  answers: Answer[];
};

const Questions: NextPage = () => {
  const { data: session } = useSession();
  const {
    data: questionsList,
    isLoading,
  } = useQuery<questionType[]>("questions", async () => {
    const response = await api.get("questions");
    const { data } = response;

    return data.map((question: questionType) => {
      return {
        id: question.id,
        question: question.question,
        answers: question.answers,
      };
    });
  }, {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  async function handleDeleteQuestion(id: string) {
    if (!confirm("Are you sure you want to exclude this question?"))
      return alert("Question Not Excluded");

    await api.delete(`questions/${id}`,  { headers: {  'Authorization': `Bearer ${session?.accessToken}`}} );

    alert("Deleted Question");

    queryClient.invalidateQueries('questions');
  }

  return !isLoading ?  (
    <div className={styles.container}>
      <HeaderAdmin />
      <div className={styles.content}>
        <SideBarAdmin />
        <div className={styles.main}>
          <div className={questions.questions}>
            <h2>Questions</h2>
            <Link href="/admin/questions/create">
              <a>
                <button style={{ width: "10rem" }}>
                  <MdAddBox />
                  <div className={questions.p}>New Question</div>
                </button>
              </a>
            </Link>
          </div>
          <table className={questions.table}>
            <thead>
              <tr>
                <th>Question</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {questionsList?.map((question) => {
                return (
                  <tr key={question.id}>
                    <td style={{ fontWeight: "bold" }}>{question.question}</td>
                    <td style={{ width: "8rem" }}>
                      <Link href={`/admin/questions/edit/${question.id}`} >
                        <a>
                          <button className={questions.button}>
                            <BsPencilSquare style={{ fontSize: "15px" }} />
                            <div className={questions.p}>Edit</div>
                          </button>
                        </a>
                      </Link>
                    </td>
                    <td style={{ width: "8rem" }}>
                      <button
                        style={{ backgroundColor: "#b30000" }}
                        className={questions.button}
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <MdOutlineDelete style={{ fontSize: "20px" }} />
                        <div className={questions.p}>Delete</div>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <HeaderAdmin />
      <div className={styles.content}>
        <SideBarAdmin />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}className={styles.main}>
          <div className={styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    </div>
  );
};

export default Questions;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if(!session?.isAdmin) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
    },
  };
};