import { useTheme, ThemeProvider } from "./basic-context";

function Component() {
  const context = useTheme();
  console.log(context);

  return (
    <div>
      <h3>Name: {context.name}</h3>
    </div>
  );
}

function ParentComponent() {
  return (
    <ThemeProvider>
      <Component />
    </ThemeProvider>
  );
}

export default ParentComponent;
