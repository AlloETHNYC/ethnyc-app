import { Breadcrumbs, Anchor } from "@mantine/core";

interface BreadcrumbsSimpleProps {
  items: {
    title: string;
    href: string;
  }[];
}

const BreadcrumbsSimple = ({ items }: BreadcrumbsSimpleProps) => (
  <Breadcrumbs>
    {items.map(({ title, href }, index) => (
      <Anchor href={href} key={index}>
        {title}
      </Anchor>
    ))}
  </Breadcrumbs>
);

export default BreadcrumbsSimple;
