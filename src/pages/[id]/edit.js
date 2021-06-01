import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Form, Loader } from "semantic-ui-react";
import styles from "../../../styles/Home.module.css";

const Edit = ({ note }) => {
  const [form, setForm] = useState({
    title: note.title,
    description: note.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote();
      } else {
        setIsSubmitting(false);
      }
    }
    return () => {
      //
    };
  }, [errors]);

  const updateNote = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/notes/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = "Title is required";
    }

    if (!form.description) {
      err.description = "Description is required";
    }
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  return (
    <div className={styles.formContainer}>
      <h1>Create Note</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={form.title}
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" }
                  : null
              }
            />
            <Form.TextArea
              fluid
              label="Description"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={form.description}
              error={
                errors.description
                  ? { content: "Please enter a description", pointing: "below" }
                  : null
              }
            />
            <Button type="submit">Update</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

Edit.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();

  return { note: data };
};

export default Edit;
