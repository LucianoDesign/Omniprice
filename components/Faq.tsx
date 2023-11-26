'use client'

import { Accordion, AccordionItem } from "@nextui-org/react";

const Faq = () => {
    const itemClasses = {
        base: "py-0 w-full",
        title: "font-normal text-large",
        trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-small px-2 ",
      };

  return (
    <Accordion itemClasses={itemClasses}variant="light" >
      <AccordionItem key="1" aria-label="Accordion 1" title="What is the purpose of OmniPrice?" >
        This is a price tracker; you can get the best price for your favorite product effortlessly.
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="How do I start?">
        Copy a valid link from Mercado Pago and paste it into the search bar on the main page.
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="How do I track the product?">
        After submitting the product, go to My Products and click on it. Then click on the track button.
      </AccordionItem>
      <AccordionItem key="4" aria-label="Accordion 4" title="What happens after I track the product?">
        Now that the product is being tracked, you can relax. If the price drops, you will receive an alert on your email.
      </AccordionItem>
    </Accordion>
  )
}

export default Faq;