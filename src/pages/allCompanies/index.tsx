import { Title, SimpleGrid, Button, Group } from "@mantine/core";
import Link from "next/link";
import { Plus } from "tabler-icons-react";
import BreadcrumbsSimple from "../../components/BreadcrumbsSimple";

import CompanyCard from "../../components/CompanyCard";

import { useEthers } from "@usedapp/core";
import { useState, useEffect } from "react";

import { getAllCompanies, getUsersCompanies } from "../../utils";
import AllCompanyCard from "../../components/AllCompanyCard";


const crumbs = [{ title: "Companies", href: "/companies" }];
const Companies = () => {

  const {account, library} = useEthers();

  const [companies, setCompanies] = useState([  {
    image: "/images/companies/createNew.jpg",
    name: "Missing Companies",
    description: "Create a company today!",
    country: "USA",
    badges: [{ emoji: "🚗", label: "Create!" }],
  },]);

  useEffect(() => {

    async function runAsync(){
        if(account){
            const userCompanies = await getAllCompanies()
            console.log(userCompanies)
            if(userCompanies.data.data){
              console.log("Mapping")
              const mappedCompanies = userCompanies.data.data.companies.map((company: any) => {
                return(
                  {
                    image: company.baseURI,
                    name: company.name,
                    description: company.description,
                    country: "USA",
                    badges: [{ emoji: "🖥️", label: "Crypto" }],
                    deployedAddr: company.deployedAddr
                  }
                )
              })
  
              console.log(mappedCompanies)
  
  
              setCompanies(mappedCompanies)
            }
            
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
      {companies ?
       companies.map((props) => (
        <AllCompanyCard key={props.name} {...props} />
      ))
      : <div></div>}
    </SimpleGrid>
  </>
)};

export default Companies;
