import ParentComponent from "./basic-index";
import { useTheme, ThemeProvider } from "./context";

function Component() {
  const context = useTheme();
  console.log(context);

  return (
    <div>
      <h3>Theme: {context.theme}</h3>
      <button
        onClick={() => {
          if (context.theme === "dark") {
            context.setTheme("light");
            return;
          }
          context.setTheme("dark");
        }}
        className="btn btn-center"
      >
        toggle theme
      </button>
    </div>
  );
}

function ContextComponent() {
  return (
    <ThemeProvider>
      <Component />
    </ThemeProvider>
  );
  return <Component />;
}

export { ParentComponent, ContextComponent };
