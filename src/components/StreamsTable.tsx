import React from "react";
import {
  createStyles,
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  ScrollArea,
  Paper,
  PaperProps,
} from "@mantine/core";
import { IStream } from "@superfluid-finance/sdk-core";
import Address from "./Address";
import { ethers } from "ethers";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

type TableReviewsProps = PaperProps<"div"> & {
  streams: IStream[];
};

const StreamsTable = ({ streams, ...props }: TableReviewsProps) => {
  const { classes, theme } = useStyles();

  const rows = streams.map(
    ({ id, sender, receiver, createdAtTimestamp, currentFlowRate }) => {
      return (
        <tr key={id}>
          <td>
            <Address address={sender} />
          </td>
          <td>
            <Address address={receiver} />
          </td>
          <td>{new Date(createdAtTimestamp * 1000).toISOString()}</td>
          <td>{ethers.utils.formatEther(currentFlowRate)}</td>
          {/* <td>{Intl.NumberFormat().format(totalReviews)}</td> */}
        </tr>
      );
    }
  );

  return (
    <Paper p="md" {...props}>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Created At</th>
              <th>Current Flow Rate</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
};

export default StreamsTable;
