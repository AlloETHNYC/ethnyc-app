import { Title, SimpleGrid, Button, Group } from "@mantine/core";
import Link from "next/link";
import { Plus } from "tabler-icons-react";
import BreadcrumbsSimple from "../../components/BreadcrumbsSimple";

import CompanyCard from "../../components/CompanyCard";

import { useEthers } from "@usedapp/core";
import { useState, useEffect } from "react";

import { getUsersCompanies } from "../../utils";


// const companies = [
//   {
//     image: "/images/companies/apple.png",
//     title: "Apple Co.",
//     description: "We make computers.",
//     country: "USA",
//     badges: [{ emoji: "🖥️", label: "Hardware" }],
//   },
  // {
  //   image: "/images/companies/tesla.png",
  //   title: "Tesla Motors",
  //   description: "We make cars.",
  //   country: "USA",
  //   badges: [{ emoji: "🚗", label: "Automotive" }],
  // },
// ];





const crumbs = [{ title: "Companies", href: "/companies" }];
const Companies = () => {

  const {account, library} = useEthers();

  const [companies, setCompanies] = useState([  {
    image: "/images/companies/tesla.png",
    name: "Tesla Motors",
    description: "We make cars.",
    country: "USA",
    badges: [{ emoji: "🚗", label: "Automotive" }],
  },]);

  useEffect(() => {

    async function runAsync(){
        if(account){
            const userCompanies = await getUsersCompanies(account)

            const mappedCompanies = userCompanies.data.data.companies.map((company: any) => {
              return(
                {
                  image: "/images/companies/apple.png",
                  name: company.name,
                  description: "We make computers.",
                  country: "USA",
                  badges: [{ emoji: "🖥️", label: "Hardware" }],
                  deployedAddr: company.deployedAddr
                }
              )
            })

            console.log(mappedCompanies)


            setCompanies(mappedCompanies)
        }
    }
    runAsync()
    
  }, [account])
  
  return(
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
        <CompanyCard key={props.name} {...props} />
      ))}
    </SimpleGrid>
  </>
)};

export default Companies;
