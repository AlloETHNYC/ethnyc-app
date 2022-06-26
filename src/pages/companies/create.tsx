import { Title, TextInput, Stack, InputWrapper, Button } from "@mantine/core";
import * as yup from "yup";
import { ethers } from "ethers";
import { useForm, yupResolver } from "@mantine/form";
import { FACTORY_ABI } from "../../ABIs/factory";
import { useEthers } from "@usedapp/core";
import { Contract } from "ethers";
import { 
  superfluidHostInfo, 
  superfluidTokenFactoryInfo, 
  factoryInfo
} from "../../settings";
import { BigNumber } from "ethers";

import { utils } from "ethers";

import BreadcrumbsSimple from "../../components/BreadcrumbsSimple";
import ImageDropzone from "../../components/ImageDropzone";
import errors from "../../lib/errors";
import { useRouter } from "next/router";

const crumbs = [
  { title: "Companies", href: "/companies" },
  { title: "New", href: "/companies/create" },
];

const initialValues = {
  name: "",
  description: "",
  tokenAddress: "",
  logo: "",
  tokenSymbol: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required(errors.required("Name")),
  description: yup.string().required(errors.required("Description")),
  tokenAddress: yup
    .string()
    .test("is-address", errors.address("Token Address"), (value) =>
      ethers.utils.isAddress(value ?? "")
    )
    .required(),
  logo: yup.mixed().required(),
});

const CompanyCreate = () => {
  const form = useForm({
    initialValues,
    //schema: yupResolver(validationSchema),
  });

  const {library} = useEthers();

  const router = useRouter()

  async function createCompany(companyName: string, description: string, tokenSymbol: string, tokenAddress: string, baseURI: string) {

    const vestingPeriod = BigNumber.from(0)

    const metaData: [BigNumber, string, string] = [vestingPeriod, baseURI, description]

    console.log(vestingPeriod, baseURI, description)

    const companyContract = new Contract(factoryInfo.address, FACTORY_ABI, library?.getSigner());
    await companyContract.createCompany(
      companyName, 
      tokenSymbol, 
      tokenAddress, 
      utils.getAddress(superfluidHostInfo.address), 
      utils.getAddress(superfluidTokenFactoryInfo.address),
      metaData, 
    );

    router.push("/companies")  
  }

  async function depositToken(amount: number){
    const companyContract = new Contract(factoryInfo.address, FACTORY_ABI, library?.getSigner());  
    await companyContract.deposit(BigNumber.from(amount).mul((BigNumber.from(10).pow(18))));
  };


  // async function deleteAllocationStream()

  return (
    <>
      <BreadcrumbsSimple items={crumbs} />
      <Title mt="lg" order={1}>
        Create new company
      </Title>
      <form onSubmit={form.onSubmit(async (values) => {
        console.log(values)
        await createCompany(values.name, values.description, values.tokenSymbol, utils.getAddress(values.tokenAddress), values.logo)
      })}>
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
          <TextInput
            required
            name="tokenAddress"
            label="Token Address"
            placeholder="0x000....000"
            {...form.getInputProps("tokenAddress")}
          />
          <TextInput
            required
            name="tokenSymbol"
            label="Token Symbol"
            placeholder="APPL"
            {...form.getInputProps("tokenSymbol")}
          />
          {/*<InputWrapper label="Logo">
            <ImageDropzone
              multiple={false}
              onDrop={(files) => {}}
              maxSize={3 * 1024 ** 2}
            />
          </InputWrapper>*/}
          <TextInput
            required
            name="logo"
            label="Image Link"
            placeholder="www.example.com/logo"
            {...form.getInputProps("logo")}
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </>
  );
};

export default CompanyCreate;
