import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CheckoutClient } from "@/components/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Demo checkout flow — pick an engagement, add capacity, see the monthly figure.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        label="Checkout · demo"
        title="Build your scope"
        body="A working checkout UI with no payment processor behind it. Pick an engagement, add capacity, and see what the monthly figure looks like."
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing", href: "/pricing" }, { label: "Checkout", href: "/checkout" }]}
      />
      <section className="shell py-16 md:py-24">
        <CheckoutClient />
      </section>
    </>
  );
}
