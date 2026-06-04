import { useState } from "react";

type Person = {
  name: string;
  email: string;
};

function EventComponent() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const text = formData.get("text") as string;
    const email = formData.get("email") as string;
    const person: Person = { name: text, email };
    console.log(person);
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="form">
        <input className="form-input mb-1" type="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />

        <input className="form-input mb-1" type="email" name="email" value={email} onChange={handleChange} />

        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </section>
  );
}

export default EventComponent;
