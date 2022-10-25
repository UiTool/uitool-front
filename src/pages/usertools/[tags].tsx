import { GetServerSideProps } from "next";
import { useState } from "react";
import { Header } from "../../components/header";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

import { IoMdAddCircle } from "react-icons/io";
import Link from "next/link";

type toolsType = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  categories: string[];
};

interface ModalProps {
  title: string;
  image: string;
  description: string;
  isOpen: boolean;
  onClose(): void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  image,
}) => {
  return (
    <div
      className={`${styles.modal_container} ${isOpen ? styles.modal_open : ""}`}
    >
      <p className={styles.modal_btnClose} onClick={() => onClose()}>
        Fechar
      </p>
      <div>
        <h1>{title}</h1>
        <img src={image} alt="tools" />
      </div>
      <h3>Description</h3>
      <p>{description}</p>
    </div>
  );
};

interface CardProps {
  title: string;
  imgSrc: string;
  onClick(): void;
}

const Card: React.FC<CardProps> = ({ title, imgSrc, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={imgSrc} />
      <p>{title}</p>
    </div>
  );
};

type PropsTool = {
  tools: toolsType[];
  toolsAvailable: boolean;
};

function UserTools({ tools, toolsAvailable }: PropsTool) {
  const [modalOpen, setModalOpen] = useState(false);
  const [toolIndex, setToolIndex] = useState(0);

  return toolsAvailable ? (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.title}></div>
          <div className={styles.content}>
            {tools?.map((tool, index) => {
              return (
                <div key={tool.id}>
                  <div>
                    <Card
                      title={tool.name}
                      imgSrc={tool.image}
                      onClick={() => {
                        setModalOpen(true);
                        setToolIndex(index);
                      }}
                    />
                  </div>
                  <Modal
                    title={tools[toolIndex]?.name}
                    image={tools[toolIndex]?.image}
                    description={tools[toolIndex]?.description}
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                  />
                </div>
              );
            })}
            <Link href="/dashboard">
              <div className={styles.moretools_card}>
                <a>
                  <IoMdAddCircle
                    style={{ fontSize: "3rem", color: "#8b4d17" }}
                  />
                </a>
                <p>Explore More Tools</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.title}>Tools Need false</div>
          <div className={styles.content}></div>
        </div>
      </div>
    </>
  );
}

export default UserTools;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tags = context.params?.tags;

  try {
    const response = await api.get(`tools/tags/${tags}`);

    const { data } = response;
    const tools = data.map((tool: toolsType) => {
      return {
        id: tool.id,
        name: tool.name,
        description: tool.description,
        image: tool.image,
        link: tool.image,
        tags: tool.tags,
        categories: tool.categories,
      };
    });

    return {
      props: {
        tools,
        toolsAvailable: true,
      },
    };
  } catch (error) {
    return {
      props: {
        tools: [],
        toolsAvailable: false,
      },
    };
  }
};
