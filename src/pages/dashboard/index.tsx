import type { NextPage } from "next";
import Image from "next/image";

import { Header } from "../../components/header";
import { useState } from "react";
import { api } from "../../services/api";

import styles from "../../styles/Dashboard.module.scss";
import Menu from "./_menu";
import { useQuery } from "react-query";
import { HelperUi } from "../../components/helperUi";

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

type toolsType = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  categories: string[];
};

const Dashboard: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toolIndex,  setToolIndex] = useState(0);

  const [tools, setTools] = useState<toolsType[]>();

  const { data: toolsResearch } = useQuery<toolsType[]>(
    "reserach",
    async () => {
      const response = await api.get("tools/category/research");
      const { data } = response;

      return data.map((tool: toolsType) => {
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
    }
  );

  const { data: toolsIdeation } = useQuery<toolsType[]>(
    "ideation",
    async () => {
      const response = await api.get("tools/category/ideation");
      const { data } = response;

      return data.map((tool: toolsType) => {
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
    }
  );

  const { data: toolsPrototyping } = useQuery<toolsType[]>(
    "prototyping",
    async () => {
      const response = await api.get("tools/category/prototyping");
      const { data } = response;

      return data.map((tool: toolsType) => {
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
    }
  );

  const { data: toolsEvaluation } = useQuery<toolsType[]>(
    "evaluation",
    async () => {
      const response = await api.get("tools/category/evaluation");
      const { data } = response;

      return data.map((tool: toolsType) => {
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
    }
  );
  const handleResearch = async () => {
    setTools(toolsResearch);
  };
  const handlePrototyping = async () => {
    setTools(toolsPrototyping);
  };
  const handleIdeation = async () => {
    setTools(toolsIdeation);
  };
  const handleEvaluation = async () => {
    setTools(toolsEvaluation);
  };

  return (
    <>
      <Header />
      <HelperUi/>
      <div className={styles.outerContainer}>
        <Menu
          handleEvaluation={handleEvaluation}
          handleIdeation={handleIdeation}
          handlePrototyping={handlePrototyping}
          handleResearch={handleResearch}
        />
        <div className={styles.container}>
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
                  title={tools[toolIndex].name}
                  image={tools[toolIndex].image}
                  description={tools[toolIndex].description}
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
