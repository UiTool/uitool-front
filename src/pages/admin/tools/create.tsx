import { NextPage } from "next";
import Link from "next/link";
import { HeaderAdmin } from "../../../components/admin/headerAdmin";
import { SideBarAdmin } from "../../../components/admin/sideBarAdmin";
import { useForm } from "react-hook-form";
import styles from "../styles.module.scss";
import create from "./styles.module.scss";
import { api } from "../../../services/api";
import  Router from "next/router";
import { queryClient } from "../../../services/queryClient";

type CreateToolsFormSchema = {
  name: string;
  research: boolean;
  prototyping: boolean;
  ideation: boolean;
  evaluation: boolean;
  tags: string;
  description: string;
  image: string;
  link: string;
};

const CreateTools: NextPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateToolsFormSchema>({});


  async function handleCreateTool(data: CreateToolsFormSchema) {
    const categories: string[] = [];
    const tags: string[] = data.tags.split(',');

    if(data.research){
      categories.push("research")
    }

    if(data.ideation){
      categories.push("ideation")
    }

    if(data.prototyping){
      categories.push("prototyping")
    }

    if(data.evaluation){
      categories.push("evaluation")
    }

    await api.post('tools', {
      name: data.name,
      description: data.description,
      image: data.image,
      link: data.link,
      categories: categories,
      tags: tags.map((tag) => { return tag.trim() })
    })

    queryClient.invalidateQueries('tools')
    Router.push('/admin/tools')
  };

  return (
    <div className={styles.container}>
      <HeaderAdmin />
      <div className={styles.content}>
        <SideBarAdmin />
        <div className={styles.main}>
          <div className={create.header}>
            <h2>Create Tool</h2>
          </div>
          <div className={styles.divider}></div>
          <div className="form">
            <form
              className={create.form}
              onSubmit={handleSubmit(handleCreateTool)}
            >
              <div className={create.name}>
                <label>Name</label>
                <input type="text" required {...register("name")} />
              </div>
              <div className={create.link}>
                <label>Link</label>
                <input type="text" required {...register("link")} />
              </div>
              <div className={create.categories}>
                <label>Categories:</label>
                <div className={create.checkboxes}>
                  <div className={create.option}>
                    <input type="checkbox" {...register("research")} />
                    <div className={create.title}>Research</div>
                  </div>
                  <div className={create.option}>
                    <input type="checkbox" {...register("ideation")} />
                    Ideation
                  </div>
                  <div className={create.option}>
                    <input type="checkbox" {...register("prototyping")} />
                    Prototyping
                  </div>
                  <div className={create.option}>
                    <input type="checkbox" {...register("evaluation")} />
                    Evaluation
                  </div>
                </div>
              </div>
              <div className={create.tags}>
                <label>Tags (Separadas por virgulas) </label>
                <input type="text" placeholder="design,interface,..."required {...register("tags")} />
              </div>
              <div className={create.description}>
                <label className={create.description}>Description</label>
                <input type="text" required {...register("description")} />
              </div>
              <div className={create.image}>
                <label>Image (Link) </label>
                <input className={create.image} type="text" required {...register("image")} />
              </div>
              <div className={create.buttonsForms}>
                <Link href="/admin/tools">
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

export default CreateTools;
