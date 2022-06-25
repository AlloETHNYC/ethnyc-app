import { Title, SimpleGrid, Button } from "@mantine/core";
import { Plus } from "tabler-icons-react";

import CompanyCard from "./CompanyCard";

const companies = [
  {
    image: "/images/companies/apple.png",
    title: "Apple Co.",
    description: "We make computers.",
    country: "USA",
    badges: [{ emoji: "🖥️", label: "Hardware" }],
  },
  {
    image: "/images/companies/tesla.png",
    title: "Tesla Motors",
    description: "We make cars.",
    country: "USA",
    badges: [{ emoji: "🚗", label: "Automotive" }],
  },
];

const Companies = () => (
  <>
    <Title order={1}>Companies</Title>
    <Button rightIcon={<Plus size={18} />} sx={{ paddingRight: 12 }}>
      Create new
    </Button>

    <SimpleGrid cols={3} spacing="lg" mt="md">
      {companies.map((props) => (
        <CompanyCard key={props.title} {...props} />
      ))}
    </SimpleGrid>
  </>
);

export default Companies;
