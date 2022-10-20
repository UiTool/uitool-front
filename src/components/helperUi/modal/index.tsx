import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper";
import { AiOutlineClose } from "react-icons/ai";

import styles from "./styles.module.scss";
import "swiper/css";
import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { useState } from "react";

type Answer = {
  answer: string;
  tags: string[];
};

type questionType = {
  id: string;
  question: string;
  answers: Answer[];
};

interface modalProps {
  open: boolean;
  onClose(): void;
}

interface Props {
  children: React.ReactNode;
  prevs?: Boolean;
}

const SwiperButtonNext: React.FC<Props> = ({ children, prevs = false }) => {
  const swiper = useSwiper();
  return prevs ? (
    <button
      style={{ background: "#D9D9D9", color: "black" }}
      onClick={() => swiper.slidePrev()}
    >
      {children}
    </button>
  ) : (
    <button onClick={() => swiper.slideNext()}>{children}</button>
  );
};

export const Modal: React.FC<modalProps> = ({ open, onClose }: modalProps) => {
  const [answersTags, setAnswersTags] = useState<string[]>([]);

  const handleRadioChecked = (event: any, index: number) => {
    if(answersTags[index]){
      answersTags[index] = event.target.value;
    }
    else {
      answersTags.push(event.target.value);
    }

    setAnswersTags([...answersTags])

  };

  console.log(answersTags)

  const {
    data: questions,
    isLoading,
    error,
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
  });

  return !open ? null : (
    <div className={styles.overlay}>
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: "swiper-forward", prevEl: "#swiper-back" }}
      >
        <SwiperSlide>
          <div className={styles.cards}>
            <p className={styles.closeButton} onClick={onClose}>
              <AiOutlineClose />
            </p>
            <h2>Welcome Helper Ui!</h2>
            <p className={styles.initialText}>
              You are lost? If so, Helper Ui can help you. Then you will have a
              series of questions, answer them sincerely and in the end you will
              have the solutions and tools that will best help you, in your
              current moment.
            </p>
            <SwiperButtonNext>Iniciar</SwiperButtonNext>
          </div>
        </SwiperSlide>
        {questions?.map((question, index) => {
          return (
            <SwiperSlide key={question.id}>
              <div className={styles.cards}>
                <p className={styles.closeButton} onClick={onClose}>
                  <AiOutlineClose />
                </p>
                <h4 className={styles.question}>{question.question}</h4>
                <div className={styles.answers} onChange={(e) => handleRadioChecked(e, index)}>
                  {question.answers.map((answer) => {
                    return (
                      <div key={answer.answer}>
                        <label>
                          <input
                            type="radio"
                            value={answer.tags}
                            name={`answer${index}`}
                          />
                          {answer.answer}
                        </label>
                      </div>
                    );
                  })}
                  <div className={styles.buttons}>
                    <SwiperButtonNext prevs={true}>Prevs</SwiperButtonNext>
                    <SwiperButtonNext>Next</SwiperButtonNext>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <SwiperSlide>
          <div className={styles.cards}>
            <p className={styles.closeButton} onClick={onClose}>
              <AiOutlineClose />
            </p>
            <h2>Congratulations!</h2>
            <p>Here are the tools that will help you best.</p>
            <button onClick={() => console.log("clicado")}>Tools</button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
