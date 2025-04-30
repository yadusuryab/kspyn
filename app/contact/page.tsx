import TitleHeader from "@/components/layout/title-header";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
        <Head>
        <title>Contact kspyn – Let's Build Your Website</title>
        <meta
          name="description"
          content="Get in touch with Kspyn, a web design and development agency in Kerala. Reach us for stunning websites, ecommerce stores, and digital solutions."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://kspyn.in"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Contact",
                  "item": "https://kspyn.in/contact"
                }
              ]
            })
          }}
        />
      </Head>
      <TitleHeader subtitle="Contact" />
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 max-w-[800px] mx-auto gap-0 md:pt-36 pt-20 pb-36">
        <div className=" border-b md:border">
          <div className="p-6">
            <h3 className="font-bold text-xl ">Email</h3>
            <p className="text-muted-foreground mt-2">
              For general inquiries, you can reach us at our mail. We respond
              within 24 hours.
            </p>
          </div>{" "}
          <div className="mt-2">
            <hr />
            <Link href={"mailto:kspynsolutions@gmail.com"}>
              <Button variant={"link"}>kspynsolutions@gmail.com</Button>
            </Link>
          </div>
        </div>
        <div className="border-b md:border-r md:border-t ">
          <div className="p-6">
            <h3 className="font-bold text-xl ">WhatsApp</h3>
            <p className="text-muted-foreground mt-2">
              Need help immediately? Message us on WhatsApp. Our team is
              available 24/7.
            </p>
          </div>{" "}
          <div className="mt-2">
            <hr />
            <Link href={"https://wa.me/+919495314108"}>
              <Button variant={"link"}>WhatsApp</Button>
            </Link>
          </div>{" "}
        </div>
        <div className=" border-b md:border-r md:border-l ">
          <div className="p-6">
            <h3 className="font-bold text-xl ">Social Media</h3>
            <p className="text-muted-foreground mt-2">
              Stay connected with us! Follow us on social platforms for the
              latest updates and promotions.
            </p>
          </div>{" "}
          <div className="mt-2">
            <hr />
            <Link href={"https://instagram.com/ks.pyn"}>
              <Button variant={"link"}>Instagram</Button>
            </Link>

            <hr />
            <Link href={"https://www.facebook.com/kspyn"}>
              <Button variant={"link"}>Facebook</Button>
            </Link>
            <hr />
            <Link href={"https://www.youtube.com/@kspyn"}>
              <Button variant={"link"}>Youtube</Button>
            </Link>
            <hr />
            <Link href={"https://www.behance.net/kspyn"}>
              <Button variant={"link"}>Behance</Button>
            </Link>
            <hr />
            <Link href={"https://dribbble.com/kspyn"}>
              <Button variant={"link"}>Dribbble</Button>
            </Link>
            <hr />
            <Link href={"https://printerest.com/kspynweb"}>
              <Button variant={"link"}>Printerest</Button>
            </Link>
            <hr />
            <Link href={"https://threads.net/ks.pyn"}>
              <Button variant={"link"}>Thread</Button>
            </Link>
            <hr />
            <Link href={" https://www.x.com/kspynweb"}>
              <Button variant={"link"}>X</Button>
            </Link>
          </div>
        </div>
        <div className="border-b md:border-r ">
          <div className="p-6">
            {" "}
            <h3 className="font-bold text-xl ">Related Enquiries Email</h3>
            <p className="text-muted-foreground mt-2">
              For specific inquiries regarding products or services, please
              reach out to us
            </p>
          </div>
          <div className="mt-2">
            <hr />
            <Link href={"mailto:kspynsolutions@gmail.com"}>
              <Button variant={"link"}>kspynsolutions@gmail.com</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
