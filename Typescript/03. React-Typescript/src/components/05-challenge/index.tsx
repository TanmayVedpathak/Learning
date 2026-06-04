type BasicProfileCardProps = {
  type: "basic";
  name: string;
};

type AdvancedProfileCardProps = {
  type: "advanced";
  name: string;
  email: string;
};

type ProfileCardProps = BasicProfileCardProps | AdvancedProfileCardProps;

function ChallengeComponent(props: ProfileCardProps) {
  const { type, name } = props;

  if (type === "basic") {
    return (
      <article className="alert alert-success">
        <h3>user : {name}</h3>
      </article>
    );
  }

  return (
    <article className="alert alert-danger">
      <h3>user : {name}</h3>
      <h3> email : {props.email}</h3>
    </article>
  );
}

export default ChallengeComponent;
