import { Axios } from "../pages/_app";

const postLetter = (sender: string, subject: string, content: string, image?: File) => {
  const form = new FormData();
  form.append("sender", sender);
  form.append("subject", subject);
  form.append("content", content);
  image && form.append("image", image);

  return Axios.post("/letter/", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default postLetter;
