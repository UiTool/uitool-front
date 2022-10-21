import { GetServerSideProps } from "next";
import Link from "next/link";
import { HeaderAdmin } from "../../../../components/admin/headerAdmin";
import { SideBarAdmin } from "../../../../components/admin/sideBarAdmin";
import { useForm } from "react-hook-form";
import styles from "../../styles.module.scss";
import create from "../styles.module.scss";
import Router from "next/router";
import { api } from "../../../../services/api";
import { useTool } from "../../../../services/hooks/useTool";
import { useMutation } from "react-query";
import { queryClient } from "../../../../services/queryClient";
import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

type toolsType = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  categories: string[];
};

type PropsTool = {
  id: string;
};

type EditToolsFormSchema = {
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

function EditTools({ id }: PropsTool) {
  const { data, isLoading } = useTool(id);
  const {data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditToolsFormSchema>({});

  async function handleEditTool(data: EditToolsFormSchema) {
    const categories: string[] = [];
    const tags: string[] = data.tags.split(",");

    if (data.research) {
      categories.push("research");
    }

    if (data.ideation) {
      categories.push("ideation");
    }

    if (data.prototyping) {
      categories.push("prototyping");
    }

    if (data.evaluation) {
      categories.push("evaluation");
    }

    await api.put(`tools/${id}`, {
      name: data.name,
      description: data.description,
      image: data.image,
      link: data.link,
      categories: categories,
      tags: tags.map((tag) => {
        return tag.trim();
      }),
    },  { headers: {  'Authorization': `Bearer ${session?.accessToken}`}} );

    queryClient.invalidateQueries(['tool', id]);
    queryClient.invalidateQueries('tools');

    Router.push("/admin/tools");
  }

  return !isLoading ? (
    <div className={styles.container}>
      <HeaderAdmin />
      <div className={styles.content}>
        <SideBarAdmin />
        <div className={styles.main}>
          <div className={create.header}>
            <h2>Edit Tool</h2>
          </div>
          <div className={styles.divider}></div>
          <div className="form">
            <form
              className={create.form}
              onSubmit={handleSubmit(handleEditTool)}
            >
              <div className={create.name}>
                <label>Name</label>
                <input
                  type="text"
                  defaultValue={data?.tool?.name}
                  {...register("name")}
                />
              </div>
              <div className={create.link}>
                <label>Name</label>
                <input
                  type="text"
                  defaultValue={data?.tool?.link}
                  {...register("link")}
                />
              </div>
              <div className={create.categories}>
                <label>Categories:</label>
                <div className={create.checkboxes}>
                  <div className={create.option}>
                    <input
                      type="checkbox"
                      defaultChecked={
                        data?.tool?.categories.includes("research")
                          ? true
                          : false
                      }
                      {...register("research")}
                    />
                    <div className={create.title}>Research</div>
                  </div>
                  <div className={create.option}>
                    <input
                      type="checkbox"
                      defaultChecked={
                        data?.tool?.categories.includes("ideation")
                          ? true
                          : false
                      }
                      {...register("ideation")}
                    />
                    Ideation
                  </div>
                  <div className={create.option}>
                    <input
                      type="checkbox"
                      defaultChecked={
                        data?.tool?.categories.includes("prototyping")
                          ? true
                          : false
                      }
                      {...register("prototyping")}
                    />
                    Prototyping
                  </div>
                  <div className={create.option}>
                    <input
                      type="checkbox"
                      defaultChecked={
                        data?.tool?.categories.includes("evaluation")
                          ? true
                          : false
                      }
                      {...register("evaluation")}
                    />
                    Evaluation
                  </div>
                </div>
              </div>
              <div className={create.tags}>
                <label>Tags</label>
                <input
                  type="text"
                  defaultValue={data?.tool?.tags.toString()}
                  {...register("tags")}
                />
              </div>
              <div className={create.description}>
                <label className={create.description}>Description</label>
                <input
                  type="text"
                  defaultValue={data?.tool?.description}
                  {...register("description")}
                />
              </div>
              <div className={create.image}>
                <label>Image</label>
                <input
                  type="text"
                  defaultValue={data?.tool?.image}
                  {...register("image")}
                />
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
      <HeaderAdmin />
      <div className={styles.content}>
        <SideBarAdmin />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={styles.main}
        >
          <div className={styles.lds_roller}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTools;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
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
      id,
    },
  };
};
