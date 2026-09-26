import { products } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find((item) => item.id === Number(slug));

  const Icon = product?.icon;

  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-blue-600">
            Key Features
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Everything you need, built in
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            {product?.title} comes with the tools your team needs to get up
            and running quickly — and to keep running as you scale.
          </p>
        </div>

        {/* Full-width feature card */}
        <div className="mt-12 relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Decorative gradient backdrop */}
          <div
            className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full ${product?.iconBg} opacity-20 blur-3xl`}
          />
          <div
            className={`pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full ${product?.iconBg} opacity-10 blur-3xl`}
          />

          <div className="relative grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
            {/* Icon block */}
            <div className="flex lg:flex-col lg:items-start">
              <div
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl ${product?.iconBg} shadow-inner`}
              >
                {Icon && <Icon size={36} className={product?.iconColor} />}
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {product?.title}
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {product?.description}
              </p>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="#consult"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                >
                  Talk to Sales
                </a>
                <a
                  href="#products"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  View All Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}