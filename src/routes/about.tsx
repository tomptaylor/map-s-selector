import { Title } from "@solidjs/meta";
import MapComponent from "~/components/MapComponent";
import Tab from "~/components/Tab";
import "../app.css";

export default function Home() {
  return (
    <main>
      <Title>map-s-selector About</Title>
      <h1>About</h1>
      <Tab />
    </main>
  );
}
