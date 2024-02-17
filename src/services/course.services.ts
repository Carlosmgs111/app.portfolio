import axios from "axios";
import { URL_API as URL } from "./index";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Requests() {
  const [token] = useLocalStorage("token", "");
  const [apiKey] = useLocalStorage("apiKey", "");
  const Authorization = `Bearer ${token}`;
  const courses = async () => {
    const courses = (
      await axios.post(
        URL + "/courses/courses",
        { filters: {} },
        {
          headers: {
            "Content-Type": "application/json",
            "Api-Key": apiKey,
            Authorization,
          },
        }
      )
    ).data.courses;
    return courses;
  };

  const createCourse = async ({ name, instructor, uri }: any) => {
    const classifier = (
      await axios.post(
        URL + "/courses/add",
        {
          name,
          instructor,
          uri,
        },
        {
          headers: {
            "Api-Key": apiKey,
            Authorization,
          },
        }
      )
    ).data.classifier;
    return classifier;
  };

  return { courses, createCourse };
}
export default Requests;
