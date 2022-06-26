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

import BreadcrumbsSimple from "../../components/BreadcrumbsSimple";
import ImageDropzone from "../../components/ImageDropzone";
import errors from "../../lib/errors";

const crumbs = [
  { title: "Companies", href: "/companies" },
  { title: "New", href: "/companies/create" },
];

const initialValues = {
  name: "",
  description: "",
  tokenAddress: "",
  logo: null,
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
    schema: yupResolver(validationSchema),
  });

  const {library} = useEthers();

  async function createCompany(companyName: string, tokenSymbol: string, tokenAddress: string, baseURI: string) {
    const companyContract = new Contract(factoryInfo.address, FACTORY_ABI, library?.getSigner());
    await companyContract.createCompany(
      companyName, 
      tokenSymbol, 
      tokenAddress, 
      baseURI, 
      superfluidHostInfo.address, 
      superfluidTokenFactoryInfo.address
    );
  }

  // NOTE: Does not belong here
  async function depositToken(amount: number){
    const companyContract = new Contract(factoryInfo.address, FACTORY_ABI, library?.getSigner());  
    await companyContract.deposit(BigNumber.from(amount).mul((BigNumber.from(10).pow(18))));
  };

  async function createAllocationStream(receiverAddr: string, amount: number){
    const companyContract = new Contract(factoryInfo.address, FACTORY_ABI, library?.getSigner());  
    const vestingPeriodInYears = await companyContract.vestingPeriod();
    const flowRate = calculateFlowRate(vestingPeriodInYears, amount);
    await companyContract.addReceiver(receiverAddr, flowRate);
  }

  const SECONDS_PER_YEAR = 60 * 60 * 24 * 365; 

  function calculateFlowRate(vestingPeriodInYears: number, amount: number){
    const vestingPeriodInSeconds = vestingPeriodInYears * SECONDS_PER_YEAR;
    const flowRate = amount / vestingPeriodInSeconds;
    return BigNumber.from(flowRate);
  }

  // async function deleteAllocationStream()

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
          <TextInput
            required
            name="tokenAddress"
            label="Token Address"
            placeholder="0x000....000"
            {...form.getInputProps("tokenAddress")}
          />
          <InputWrapper label="Logo">
            <ImageDropzone
              multiple={false}
              onDrop={(files) => {}}
              maxSize={3 * 1024 ** 2}
            />
          </InputWrapper>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </>
  );
};

export default CompanyCreate;
