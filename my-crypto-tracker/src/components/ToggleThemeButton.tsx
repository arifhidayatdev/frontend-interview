import { ThemeConsumer } from "../context/ThemeContext";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { Button } from "antd";

function ToggleThemeButton() {
  return (
    <ThemeConsumer>
      {(context) => {
        if (!context) {
          return <div>Error: ThemeContext is not provided</div>;
        }

        const { theme, toggleTheme } = context;

        return (
          <Button type="link" className="toggle-locale" onClick={toggleTheme}>
            {theme === "light" ? (
              <MoonFilled style={{ fontSize: 20, color: "#333" }} />
            ) : (
              <SunFilled style={{ fontSize: 20, color: "#eee" }} />
            )}
          </Button>
        );
      }}
    </ThemeConsumer>
  );
}

export default ToggleThemeButton;
