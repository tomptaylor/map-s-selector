import { createSignal, Suspense, Switch, Match, useTransition } from "solid-js";
import { render } from "solid-js/web";
import Tabpanel from "./Tabpanel";

import "../app.css";

const Tab = () => {
  const [tab, setTab] = createSignal(0);
  const [pending, start] = useTransition();
  const updateTab = (index) => () => start(() => setTab(index));

  return (
    <>
      <ul class="inline">
        <li classList={{ selected: tab() === 0 }} onClick={updateTab(0)}>
          Uno
        </li>
        <li classList={{ selected: tab() === 1 }} onClick={updateTab(1)}>
          Dos
        </li>
        <li classList={{ selected: tab() === 2 }} onClick={updateTab(2)}>
          Tres
        </li>
      </ul>
      <div class="tab" classList={{ pending: pending() }}>
        <Suspense fallback={<div class="loader">Loading...</div>}>
          <Switch>
            <Match when={tab() === 0}>
              <Tabpanel page="General" />
            </Match>
            <Match when={tab() === 1}>
              <Tabpanel page="Geography" />
            </Match>
            <Match when={tab() === 2}>
              <Tabpanel page="Narrative" />
            </Match>
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default Tab;
