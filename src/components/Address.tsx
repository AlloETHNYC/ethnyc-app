import { Group, Text } from "@mantine/core";
import { shortenAddress } from "@usedapp/core";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

interface AddressProps {
  address: string;
  diameter?: number;
}

const Address = ({ address, diameter = 20 }: AddressProps) => (
  <Group spacing={7}>
    <Jazzicon diameter={diameter} seed={jsNumberForAddress(address)} />
    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
      {shortenAddress(address)}
    </Text>
  </Group>
);

export default Address;
