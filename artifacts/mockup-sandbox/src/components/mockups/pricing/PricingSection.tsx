import { useState } from "react";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Instagram & WhatsApp sellers testing the tool",
    monthlyPrice: 0,
    annualPrice: 0,
    usage: "15 orders / mo",
    cta: "Get started free",
    ctaVariant: "outline" as const,
    popular: false,
    features: [
      "Widget embed",
      "2 product templates",
      "Email delivery to seller",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    description: "Small Shopify stores, single-product sellers",
    monthlyPrice: 19,
    annualPrice: 15,
    usage: "200 orders / mo",
    cta: "Start 14-day trial",
    ctaVariant: "outline" as const,
    popular: false,
    features: [
      "All product templates",
      "Design history per order",
      "Shopify app",
      "Basic analytics",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Growing D2C stores, 50–500 orders/mo",
    monthlyPrice: 49,
    annualPrice: 39,
    usage: "750 orders / mo",
    cta: "Start 14-day trial",
    ctaVariant: "primary" as const,
    popular: true,
    features: [
      "Multi-product templates",
      "Webhook support",
      "Seller dashboard",
      "Priority support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    description: "Larger D2C brands & agencies",
    monthlyPrice: 99,
    annualPrice: 79,
    usage: "2,500 orders / mo",
    cta: "Start 14-day trial",
    ctaVariant: "outline" as const,
    popular: false,
    features: [
      "API access",
      "White-label widget",
      "Advanced analytics",
      "Vendor handoff",
    ],
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="8" fill="rgba(232,145,106,0.15)" />
      <path
        d="M5 8l2 2 4-4"
        stroke="#e8916a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#0d3d35", minHeight: "100vh" }}
    >
      {/* Subtle radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,145,106,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Section header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-6"
            style={{
              background: "rgba(232,145,106,0.10)",
              border: "1px solid rgba(232,145,106,0.20)",
              color: "#e8916a",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#e8916a" }}
            />
            Pricing
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "#e8916a" }}
          >
            Pay for what you sell,
            <br />
            not what you preview.
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.60)" }}
          >
            Simple plans based on confirmed customized orders per month.
            <br />
            No transaction fees. No surprises.
          </p>
        </div>

        {/* Monthly / Annual toggle */}
        <div className="flex justify-center mb-14">
          <div
            className="relative flex items-center rounded-full p-1"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <button
              onClick={() => setAnnual(false)}
              className="relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                color: !annual ? "#0d3d35" : "rgba(255,255,255,0.55)",
                background: !annual ? "#e8916a" : "transparent",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                color: annual ? "#0d3d35" : "rgba(255,255,255,0.55)",
                background: annual ? "#e8916a" : "transparent",
              }}
            >
              Annual
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: annual ? "rgba(13,61,53,0.25)" : "rgba(232,145,106,0.15)",
                  color: annual ? "#0d3d35" : "#e8916a",
                }}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className="relative flex flex-col rounded-2xl p-6 transition-all duration-300"
                style={
                  plan.popular
                    ? {
                        background: "rgba(255,255,255,0.06)",
                        border: "1.5px solid rgba(232,145,106,0.50)",
                        boxShadow:
                          "0 0 40px rgba(232,145,106,0.12), 0 8px 32px rgba(0,0,0,0.25)",
                      }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                      }
                }
              >
                {/* Glow effect for Growth card */}
                {plan.popular && (
                  <div
                    className="absolute -inset-px rounded-2xl pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(232,145,106,0.12) 0%, transparent 60%)",
                    }}
                  />
                )}

                {/* Most popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                      style={{
                        background:
                          "linear-gradient(90deg, #c7623e 0%, #e8916a 100%)",
                        color: "#fff",
                        boxShadow: "0 2px 12px rgba(199,98,62,0.40)",
                      }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  {/* Plan name */}
                  <div className="mb-1">
                    <span
                      className="text-sm font-semibold tracking-wide uppercase"
                      style={{
                        color: plan.popular
                          ? "#e8916a"
                          : "rgba(255,255,255,0.50)",
                      }}
                    >
                      {plan.name}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-1 mb-1">
                    <span
                      className="text-4xl font-bold"
                      style={{ color: "#ffffff" }}
                    >
                      ${price}
                    </span>
                    {price > 0 && (
                      <span
                        className="text-sm mb-1.5"
                        style={{ color: "rgba(255,255,255,0.40)" }}
                      >
                        /mo
                      </span>
                    )}
                  </div>

                  {/* Usage */}
                  <div
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full mb-4 self-start"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <circle
                        cx="6"
                        cy="6"
                        r="5"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <path
                        d="M6 3.5v3l1.5 1.5"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                    {plan.usage}
                  </div>

                  {/* Description */}
                  <p
                    className="text-xs leading-relaxed mb-5"
                    style={{ color: "rgba(255,255,255,0.40)" }}
                  >
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        <CheckIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <button
                    className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98] mt-auto"
                    style={
                      plan.popular
                        ? {
                            background:
                              "linear-gradient(135deg, #c7623e 0%, #e8916a 100%)",
                            color: "#fff",
                            boxShadow: "0 4px 16px rgba(199,98,62,0.35)",
                          }
                        : {
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "rgba(255,255,255,0.80)",
                          }
                    }
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overage section */}
        <div
          className="mt-10 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div>
            <p
              className="text-base font-semibold mb-1"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Need more orders?
            </p>
            <p
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Overage kicks in automatically — no plan changes, no
              interruptions. All paid plans.
            </p>
          </div>
          <div
            className="flex-shrink-0 rounded-xl px-5 py-3 text-center"
            style={{
              background: "rgba(232,145,106,0.10)",
              border: "1px solid rgba(232,145,106,0.20)",
            }}
          >
            <span
              className="text-sm font-bold"
              style={{ color: "#e8916a" }}
            >
              +$0.05
            </span>
            <span
              className="text-sm"
              style={{ color: "rgba(232,145,106,0.70)" }}
            >
              {" "}
              per order above limit
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
