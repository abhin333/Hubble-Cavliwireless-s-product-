
import { products } from "@/lib/products";


export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;


  
  const product = products.find((item) => item.id === Number(slug));
  
  const Icon =product?.icon
 


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
  
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div
                key={product?.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${product?.iconBg} `}
                >
                   <Icon size={22} className={product ?.iconColor} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {product?.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {product?.description}
                </p>
              </div>
          </div>
        </div>
      </section>
    );
  }

