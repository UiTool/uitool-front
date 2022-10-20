import { NextPage } from "next";
import Link from "next/link";
import Header from "../components/header";
import SideBar from "../components/sideBar";
import { useForm } from "react-hook-form";
import styles from "../styles.module.scss";
import create from "./styles.module.scss";
import { api } from "../../../services/api";
import Router from "next/router";


type CreateQuestionFormSchema = {
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

const CreateQuestions: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateQuestionFormSchema>({});

  async function handleCreateQuestion(data: CreateQuestionFormSchema) {
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

    await api.post("questions", {
      question: data.question,
      answers: answers,
    });

    Router.push('/admin/questions')
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.main}>
          <div className={create.header}>
            <h2>Create Tool</h2>
          </div>
          <div className={styles.divider}></div>
          <div className="form">
            <form
              className={create.form}
              onSubmit={handleSubmit(handleCreateQuestion)}
            >
              <div className={create.question}>
                <label>Question</label>
                <input type="text" required {...register("question")} />
              </div>
              <div className={create.answers}>
                <div className={create.answer}>
                  <label className={create.description}>Answer 1</label>
                  <input type="text" required {...register("answer1")} />
                </div>
                <div className={create.tags}>
                  <label>Tags</label>
                  <input type="text" required {...register("tags1")} />
                </div>
              </div>
              <div className={create.answers}>
                <div className={create.answer}>
                  <label className={create.description}>Answer 2</label>
                  <input type="text" required {...register("answer2")} />
                </div>
                <div className={create.tags}>
                  <label>Tags</label>
                  <input type="text" required {...register("tags2")} />
                </div>
              </div>
              <div className={create.answers}>
                <div className={create.answer}>
                  <label className={create.description}>Answer 3</label>
                  <input type="text" required {...register("answer3")} />
                </div>
                <div className={create.tags}>
                  <label>Tags</label>
                  <input type="text" required {...register("tags3")} />
                </div>
              </div>
              <div className={create.answers}>
                <div className={create.answer}>
                  <label className={create.description}>Answer 4</label>
                  <input type="text" required {...register("answer4")} />
                </div>
                <div className={create.tags}>
                  <label>Tags</label>
                  <input type="text" required {...register("tags4")} />
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestions;
