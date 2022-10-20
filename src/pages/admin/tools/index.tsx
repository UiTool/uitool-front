import { NextPage } from "next";
import { Header } from "../components/header";
import { SideBar } from "../components/sideBar";

import { MdAddBox, MdOutlineDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";

import styles from "../styles.module.scss";
import tools from "./styles.module.scss";
import Link from "next/link";
import { api } from "../../../services/api";
import { useQuery } from "react-query";

type toolsType = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  categories: string[];
}

const Tools: NextPage = () => {
  const {
    data: toolsList,
    isLoading,
    error,
  } = useQuery<toolsType[]>("tools", async () => {
      const response = await api.get("tools");
      const { data } = response;

      return data.map((tool: toolsType) => {
        return {
          id: tool.id,
          name: tool.name,
          description: tool.description,
          image: tool.image,
          link: tool.image,
          tags: tool.tags,
          categories: tool.categories
        };
      });
    });

  
  async function handleDeleteTool(id: string, name: string) {
    if (!confirm(`Are you sure you want to exclude ${name} tool?`))
      return alert(`${name} Tool Not Excluded`);

    await api.delete(`tools/${id}`)

    alert(`Deleted ${name}`) 

    window.location.reload()
  }

  return !isLoading ? (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <SideBar />
        <div className={styles.main}>
          <div className={tools.tools}>
            <h2>Tools</h2>
            <Link href="/admin/tools/create">
              <a>
                <button>
                  <MdAddBox />
                  <div className={tools.p}>New Tools</div>
                </button>
              </a>
            </Link>
          </div>
          <table className={tools.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Categories</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {toolsList?.map((tool) => {
                return (
                  <tr key={tool.id}>
                    <td style={{ fontWeight: "bold" }}>{tool.name}</td>
                    <td>{tool.categories.map((category) => {return `${category} `})}</td>
                    <td style={{ width: "8rem" }}>
                      <Link href={`/admin/tools/edit/${tool.id}`}>
                        <a>
                          <button className={tools.button}>
                            <BsPencilSquare style={{ fontSize: "15px" }} />
                            <div className={tools.p}>Edit</div>
                          </button>
                        </a>
                      </Link>
                    </td>
                    <td style={{ width: "8rem" }}>
                      <button
                        style={{ backgroundColor: "#b30000" }}
                        className={tools.button}
                        onClick={() => handleDeleteTool(tool.id, tool.name)}
                      >
                        <MdOutlineDelete style={{ fontSize: "20px" }} />
                        <div className={tools.p}>Delete</div>
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

export default Tools;
