import React from "react";
import { Box, Button, Text, TextInput } from "grommet";
import { Add } from "grommet-icons";
import { ListBox } from "@hexhive/ui";

export const People = () => (
  <ListBox
    header={
      <Box direction="row" gap="small">
        <TextInput placeholder="People" />{" "}
        <Button icon={<Add />} label="Add" onClick={() => {}} />
      </Box>
    }
  />
);
