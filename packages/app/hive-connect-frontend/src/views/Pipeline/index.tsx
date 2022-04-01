import React from "react";
import { Text } from "grommet";
import { HeaderBox, Kanban } from "@hexhive/ui";

export const Pipeline = () => (
  <HeaderBox header={<Text>Pipeline</Text>}>
    <Kanban
      columns={[
        {
          id: "1",
          rows: [
            {
              name: "two",
            },
          ],
          title: "Appointment Scheduled",
        },
        {
          id: "2",
          rows: [
            {
              name: "three",
            },
            {
              name: "fsdf",
            },
          ],
          title: "Closed/Won",
        },
        {
          id: "3",
          rows: [
            {
              name: "three",
            },
            {
              name: "placeholder",
            },
          ],
          title: "Status Column",
        },
      ]}
      onCreateColumn={() => {}}
      onDrag={function noRefCheck() {}}
      renderCard={function noRefCheck() {}}
    />
  </HeaderBox>
);
