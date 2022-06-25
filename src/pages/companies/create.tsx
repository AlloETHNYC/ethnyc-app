import { Title, SimpleGrid, Button, TextInput, Stack } from "@mantine/core";
import * as yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { Plus } from "tabler-icons-react";
import BreadcrumbsSimple from "../../components/BreadcrumbsSimple";

const crumbs = [
  { title: "Companies", href: "/companies" },
  { title: "New", href: "/companies/create" },
];

const initialValues = {
  name: "",
  description: "",
  tokenAddress: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  tokenAddress: yup.string().required(),
});

const CompanyCreate = () => {
  const form = useForm({
    initialValues,
    schema: yupResolver(validationSchema),
  });

  return (
    <>
      <BreadcrumbsSimple items={crumbs} />
      <Title mt="lg" order={1}>
        Create new company
      </Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack mt="lg">
          <TextInput
            required
            name="name"
            label="Name"
            placeholder="ACME Corp"
            {...form.getInputProps("name")}
          />
          <TextInput
            required
            name="description"
            label="Description"
            placeholder="American company that manufacturers everything"
            {...form.getInputProps("description")}
          />
        </Stack>
      </form>
    </>
  );
};

export default CompanyCreate;
