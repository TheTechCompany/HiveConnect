import React from "react";
import { Box, Button, Text, TextInput } from "grommet";
import { Add } from "grommet-icons";
import { ListBox } from "@hexhive/ui";

export const Deals = () => (
  <ListBox
    header={
      <Box direction="row" gap="small">
        <TextInput placeholder="Deals" />{" "}
        <Button icon={<Add />} label="Add" onClick={() => {}} />
      </Box>
    }
  />
);
