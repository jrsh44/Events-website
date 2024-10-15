import ReactDOM from "react-dom/client";
import { Provider } from "./providers/Provider.tsx";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<Provider />);
