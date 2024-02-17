import axios from "axios";
import { URL_API as URL } from "./index";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Requests() {
  const [token] = useLocalStorage("token", "");
  const [apiKey] = useLocalStorage("apiKey", "");
  const Authorization = `Bearer ${token}`;

  const notes = async (_id: any) => {
    const notes = (
      await axios.post(
        URL + "/notes/notes",
        { filters: { _id } },
        {
          headers: {
            "Content-Type": "application/json",
            "Api-Key": apiKey,
            Authorization,
          },
        }
      )
    ).data.notes;
    return notes;
  };

  const deleteNote = async ({ _id }: any) => {
    const indexNoteDeleted = (
      await axios.post(
        URL + "/notes/remove/",
        { _id },
        {
          headers: {
            "Api-Key": apiKey,
            Authorization,
          },
        }
      )
    ).data._id;

    return indexNoteDeleted;
  };

  const editNote = async ({ _id, title, body, tags, resources }: any) => {
    const noteEdited = (
      await axios.post(
        URL + "/notes/edit/",
        {
          _id,
          title,
          body,
          tags,
          resources,
        },
        {
          headers: {
            "Api-Key": apiKey,
            Authorization,
          },
        }
      )
    ).data.note;
    return noteEdited;
  };

  const createNote = async ({ title, body, classifier, lection }: any) => {
    const noteCreated = (
      await axios.post(
        URL + "/notes/create",
        {
          title,
          body,
          classifier,
          lection,
        },
        {
          headers: {
            "Api-Key": apiKey,
            Authorization,
          },
        }
      )
    ).data.note;
    return noteCreated;
  };

  return {
    notes,
    deleteNote,
    editNote,
    createNote,
  };
}

export default Requests;
