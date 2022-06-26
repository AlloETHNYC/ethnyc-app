import React from "react";
import CountUp from "react-countup";
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
  Image,
} from "@mantine/core";
import { IStream } from "@superfluid-finance/sdk-core";
import Address from "./Address";
import { BigNumber, ethers } from "ethers";
import { format } from "date-fns";
import { nameToLogoUrl } from "../lib/tokens";

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

const getComputed = (createdAtTimestamp: number, currentFlowRate: string) => {
  const date = new Date(createdAtTimestamp * 1000);
  const dailyFlowRate: any = BigInt(24 * 60 * 60) * BigInt(currentFlowRate);

  const now = Math.round(Date.now() / 1000);
  const elapsed = now - createdAtTimestamp;
  const start = BigInt(elapsed) * BigInt(currentFlowRate);
  const end = start + BigInt(3600) * BigInt(currentFlowRate);

  const computed = {
    createdAtDate: format(date, "dd MMM yyyy"),
    flowRate: ethers.utils.formatEther(currentFlowRate),
    dailyFlowRate: ethers.utils.formatEther(dailyFlowRate),
    countUp: {
      start,
      end,
      duration: 3600,
    },
  };

  return computed;
};

const StreamsTable = ({ streams, ...props }: TableReviewsProps) => {
  const { classes, theme } = useStyles();

  const rows = streams.map(
    ({
      id,
      sender,
      receiver,
      createdAtTimestamp,
      token: { symbol },
      currentFlowRate,
    }) => {
      const { createdAtDate, flowRate, dailyFlowRate, countUp } = getComputed(
        createdAtTimestamp,
        currentFlowRate
      );

      return (
        <tr key={id}>
          <td>
            <Address address={sender} />
          </td>
          <td>
            <Address address={receiver} />
          </td>
          <td>{createdAtDate}</td>
          <td>
            <Group noWrap>
              <img style={{ maxHeight: "16px" }} src={nameToLogoUrl[symbol]} />
              {symbol}
            </Group>
          </td>
          <td>
            <Text sx={{ fontFamily: "monospace" }}>{flowRate}</Text>
          </td>
          <td>
            <Text sx={{ fontFamily: "monospace" }}>{dailyFlowRate}</Text>
          </td>
          <td>
            <Text sx={{ fontFamily: "monospace", minWidth: 230 }}>
              {/* @ts-ignore */}
              <CountUp
                // start={-875.039}
                // end={160527.012}
                // duration={2.75}
                {...countUp}
                separator=" "
                decimals={4}
                decimal=","
                prefix=""
                suffix=""
                formattingFn={(value) =>
                  ethers.utils.formatEther(BigNumber.from(String(value)))
                }
              >
                {({ countUpRef, start }) => (
                  <div>
                    <span ref={countUpRef} />
                  </div>
                )}
              </CountUp>
            </Text>
          </td>
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
              <th>Currency</th>
              <th>Current Flow Rate</th>
              <th>Daily Flow Rate</th>
              <th>Received Total</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
};

export default StreamsTable;
