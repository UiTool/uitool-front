import { NextPage } from "next";
import Link from "next/link";
import { Header } from "../../components/header";
import { SideBar } from "../../components/sideBar";
import { useForm } from "react-hook-form";
import styles from "../../styles.module.scss";
import create from "../styles.module.scss";
import Router from "next/router";
import { useQuery } from "react-query";
import { api } from "../../../../services/api";

type Answers = {
  answer: string;
  tags: string[];
}

type questionType = {
  id: string;
  question: string;
  answers: Answers[];
}

type EditQuestionFormSchema = {
  question: string;
  answer1: string;
  tags1: string;
  answer2: string;
  tags2: string;
  answer3: string;
  tags3: string;
  answer4: string;
  tags4: string;
};

const EditQuestion: NextPage = () => {
  const { id } = Router.query;

  const {
    data: question,
    isLoading,
    error,
  } = useQuery<questionType>(`question:${id}`, async () => {
    const response = await api.get(`questions/${id}`);
    const { data } = response
    return data;
    
  });


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditQuestionFormSchema>({});

  async function handleEditQuestion(data: EditQuestionFormSchema) {
    const answers = [];
    answers.push(
      {
        answer: data.answer1,
        tags: data.tags1.split(",").map((tag) => {
          return tag.trim();
        }),
      },
      {
        answer: data.answer2,
        tags: data.tags2.split(",").map((tag) => {
          return tag.trim();
        }),
      },
      {
        answer: data.answer3,
        tags: data.tags3.split(",").map((tag) => {
          return tag.trim();
        }),
      },
      {
        answer: data.answer4,
        tags: data.tags4.split(",").map((tag) => {
          return tag.trim();
        }),
      }
    );

    await api.put(`questions/${id}`, {
      question: data.question,
      answers: answers,
    });

    Router.push('/admin/questions')
  }

  return !isLoading ? (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.main}>
          <div className={create.header}>
            <h2>Edit Question</h2>
          </div>
          <div className={styles.divider}></div>
          <div className="form">
            <form
              className={create.form}
              onSubmit={handleSubmit(handleEditQuestion)}
            >
              <div className={create.question}>
                <label>Question</label>
                <input
                  type="text"
                  defaultValue={question?.question}
                  required
                  {...register("question")}
                />
              </div>
              <div className={create.answers}>
                <div className={create.answer}>
                  <label className={create.description}>Answer 1</label>
                  <input
                    type="text"
                    defaultValue={question?.answers[0].answer}
                    required
                    {...register("answer1")}
                  />
                </div>
                <div className={create.tags}>
                  <label>Tags</label>
                  <input
                    type="text"
                    defaultValue={question?.answers[0].tags.toString()}
                    required
                    {...register("tags1")}
                  />
                </div>
              </div>
              <div className={create.answers}>
                <div className={create.answer}>
                  <label className={create.description}>Answer 2</label>
                  <input
                    type="text"
                    defaultValue={question?.answers[1].answer}
                    required
                    {...register("answer2")}
                  />
                </div>
                <div className={create.tags}>
                  <label>Tags</label>
                  <input
                    type="text"
                    defaultValue={question?.answers[1].tags.toString()}
                    required
                    {...register("tags2")}
                  />
                </div>
              </div>
              <div className={create.answers}>
                <div className={create.answer}>
                  <label className={create.description}>Answer 3</label>
                  <input
                    type="text"
                    defaultValue={question?.answers[2].answer}
                    required
                    {...register("answer3")}
                  />
                </div>
                <div className={create.tags}>
                  <label>Tags</label>
                  <input
                    type="text"
                    defaultValue={question?.answers[2].tags.toString()}
                    required
                    {...register("tags3")}
                  />
                </div>
              </div>
              <div className={create.answers}>
                <div className={create.answer}>
                  <label className={create.description}>Answer 4</label>
                  <input
                    type="text"
                    defaultValue={question?.answers[3].answer}
                    required
                    {...register("answer4")}
                  />
                </div>
                <div className={create.tags}>
                  <label>Tags</label>
                  <input
                    type="text"
                    defaultValue={question?.answers[3].tags.toString()}
                    required
                    {...register("tags4")}
                  />
                </div>
              </div>
              <div className={create.buttonsForms}>
                <Link href="/admin/questions">
                  <a>
                    <button style={{ backgroundColor: "#545454" }}>
                      Cancel
                    </button>
                  </a>
                </Link>
                <button type="submit" disabled={isSubmitting}>
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <SideBar />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}className={styles.main}>
          <div className={styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
