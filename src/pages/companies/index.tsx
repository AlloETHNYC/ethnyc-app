import { Title, SimpleGrid, Button, Group } from "@mantine/core";
import Link from "next/link";
import { Plus } from "tabler-icons-react";
import BreadcrumbsSimple from "../../components/BreadcrumbsSimple";

import CompanyCard from "../../components/CompanyCard";

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

const crumbs = [{ title: "Companies", href: "/companies" }];
const Companies = () => (
  <>
    <BreadcrumbsSimple items={crumbs} />
    <Group mt="lg" position="apart">
      <Title order={1}>Companies</Title>
      <Link href="/companies/create" passHref>
        <Button
          component="a"
          rightIcon={<Plus size={18} />}
          sx={{ paddingRight: 12 }}
        >
          Create new
        </Button>
      </Link>
    </Group>

    <SimpleGrid cols={3} spacing="lg" mt="lg">
      {companies.map((props) => (
        <CompanyCard key={props.title} {...props} />
      ))}
    </SimpleGrid>
  </>
);

export default Companies;
