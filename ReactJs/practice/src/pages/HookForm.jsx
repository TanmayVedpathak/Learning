import { useForm } from "react-hook-form";

function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    // simulate API call
    await new Promise((res) => setTimeout(res, 1000));

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <div>
        <label>Name</label>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label>Email</label>
        <input
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^\S+@\S+$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      {/* Age */}
      <div>
        <label>Age</label>
        <input
          type="number"
          {...register("age", {
            valueAsNumber: true,
            min: {
              value: 18,
              message: "Must be 18+",
            },
          })}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: 6,
          })}
        />
      </div>

      {/* Terms */}
      <div>
        <input
          type="checkbox"
          {...register("terms", {
            required: "Accept terms",
          })}
        />
        <label>Accept Terms</label>
        {errors.terms && <p>{errors.terms.message}</p>}
      </div>

      <button disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</button>
    </form>
  );
}

export default HookForm;
