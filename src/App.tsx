import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  console.log("errors: ", errors);

  console.log("watch: ", watch());
  // {firstName: '12342', lastName: '', age: ''}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label htmlFor="firstName">firstName</label>
        <input
          {...register("firstName", {
            required: `this is required`,
            minLength: {
              value: 4,
              message: "too short",
            },
          })}
        />
        <p style={{ color: "red" }}>{errors.firstName?.message}</p>
      </fieldset>

      <fieldset>
        <label htmlFor="lastName">lastName</label>
        <input
          {...register("lastName", {
            required: `this is required`,
            pattern: {
              value: /^[a-zA-Z-_]{3,10}$/,
              message: "at least 3 letters, max 10 letters",
            },
          })}
        />
        <p style={{ color: "red" }}>{errors.lastName?.message}</p>
      </fieldset>

      <fieldset>
        <label htmlFor="age">age</label>l
        <input type="number" {...register("age", { min: 18, max: 99 })} />
      </fieldset>

      <input type="submit" />
    </form>
  );
}
